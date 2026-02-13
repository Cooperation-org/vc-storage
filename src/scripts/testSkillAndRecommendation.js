import { CredentialEngine, GoogleDriveStorage, getVCWithRecommendations, saveToGoogleDrive } from '../../dist/index.js';

/**
 * End-to-end test script:
 * - create DID + keypair
 * - sign + save a "Skill VC" (regular VC) with credentialSubject.id set
 * - sign + save a Recommendation VC that includes:
 *   - credentialSubject.id
 *   - credentialSubject.id = <skill vc id>
 * - save recommendation with `vcId=<skill VC file id>` to update/create RELATIONS
 *
 * Requires:
 *   GOOGLE_ACCESS_TOKEN=<oauth token with Drive access>
 */

const accessToken = process.env.GOOGLE_ACCESS_TOKEN;
if (!accessToken) {
	throw new Error('Missing GOOGLE_ACCESS_TOKEN env var.');
}

async function main() {
	const storage = new GoogleDriveStorage(accessToken);
	const engine = new CredentialEngine(storage);

	// 1) Create DID + keypair
	const { didDocument, keyPair } = await engine.createDID();
	console.log('DID:', didDocument.id);

	// 2) Create "Skill VC" (regular VC)
	const skillFormData = {
		expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
		fullName: 'Omar',
		duration: 'P1Y',
		criteriaNarrative: 'Demonstrated skill through project work.',
		achievementDescription: 'Skill credential used for recommendation test.',
		achievementName: 'Skill VC Test',
		portfolio: [{ name: 'Portfolio', url: 'https://example.com/portfolio' }],
		evidenceLink: 'https://example.com/evidence',
		evidenceDescription: 'Evidence for skill.',
		credentialType: 'SkillCredential',
		// New optional field (so VC has credentialSubject.id)
		subjectId: didDocument.id,
	};

	const signedSkillVc = await engine.signVC({
		data: skillFormData,
		type: 'VC',
		keyPair,
		issuerId: didDocument.id,
	});

	const savedSkill = await saveToGoogleDrive({
		storage,
		data: signedSkillVc,
		type: 'VC',
	});

	console.log('Saved Skill VC file:', savedSkill.id);
	console.log('Skill VC id (credential id):', signedSkillVc.id);

	// 3) Create Recommendation VC about the skill VC id
	const recommendationFormData = {
		expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
		fullName: 'Omar',
		howKnow: 'Worked together on multiple projects.',
		recommendationText: 'Omar has consistently demonstrated strong skills and great ownership.',
		portfolio: [{ name: 'Project', url: 'https://example.com/project' }],
		qualifications: 'Relevant experience in the domain.',
		explainAnswer: 'Strong execution, clear communication, reliable delivery.',
		// New optional field (so recommendation has credentialSubject.id)
		subjectId: didDocument.id,
	};

	const signedRecommendationVc = await engine.signVC({
		data: recommendationFormData,
		type: 'RECOMMENDATION',
		keyPair,
		issuerId: didDocument.id,
		// Back-compat: pass the Skill VC *Drive file id* and let the engine resolve the VC DID/URI
		vcFileId: savedSkill.id,
	});

	// Save recommendation AND link it to the skill VC's RELATIONS via the existing saveToGoogleDrive helper
	const savedRecommendation = await saveToGoogleDrive({
		storage,
		data: signedRecommendationVc,
		type: 'RECOMMENDATION',
		// This is the Google Drive file id of the parent VC JSON file
		vcId: savedSkill.id,
	});

	console.log('Saved Recommendation file:', savedRecommendation.id);

	// 4) Verify linkage through RELATIONS
	const linked = await getVCWithRecommendations({ vcId: savedSkill.id, storage });
	console.log('RELATIONS recommendationIds:', linked.recommendationIds);

	// 5) Verify skill VC id value in the saved recommendation payload
	const recFile = await storage.retrieve(savedRecommendation.id);
	const recVc = JSON.parse(recFile.data.body);
	console.log('Recommendation credentialSubject.id:', recVc.credentialSubject?.id);
	console.log('Expected credentialSubject.id (skill vc id):', signedSkillVc.id);
	if (recVc?.credentialSubject?.id !== signedSkillVc.id) {
		throw new Error(
			`Mismatch: expected recommendation.credentialSubject.id to be "${signedSkillVc.id}" but got "${recVc?.credentialSubject?.id}"`
		);
	}
}

main().catch((e) => {
	console.error(e);
	process.exitCode = 1;
});

