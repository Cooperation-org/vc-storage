/**
 * Test script for SkillClaimCredential signing.
 * Input uses FormDataI shape from live site (generateCredentialData output).
 */
import { CredentialEngine } from '../../dist/models/CredentialEngine.js';

const storage = {
	saveFile: async (data) => ({ id: '123' }),
	retrieve: async (id) => ({ id: '123' }),
};

const engine = new CredentialEngine(storage);

/** FormDataI from live site (generateCredentialData output) */
const formData = {
	expirationDate: '2027-03-02T22:52:05.507Z',
	fullName: 'NOT OMAR',
	duration: '4 years',
	criteriaNarrative:
		'Skill description Skill description Skill description Skill description Skill description ',
	achievementDescription:
		'how you earned this skill TEST how you earned this skill TEST how you earned this skill TEST how you earned this skill TEST ',
	achievementName: 'Leadership',
	portfolio: [
		{ url: 'https://www.linkedin.com/in/dev-omar-salah', name: 'Evidence1 ' },
		{
			name: 'Days of Our Lives.webp',
			url: 'https://drive.google.com/uc?export=view&id=18PX9sxkC6Di37LxhKYCmBXrMo48O94ds',
		},
	],
	evidenceLink: 'https://drive.google.com/uc?export=view&id=18PX9sxkC6Di37LxhKYCmBXrMo48O94ds',
	evidenceDescription: '',
	credentialType: '',
};

/**
 * Maps FormDataI to SkillClaimFormDataI for signSkillClaimVC.
 * @param {FormDataI} fd - Form data from live site
 * @returns {import('../../types').SkillClaimFormDataI}
 */
function formDataToSkillClaim(fd) {
	const skills = [
		{
			name: fd.achievementName,
			description: fd.criteriaNarrative,
			durationPerformed: fd.duration,
			narrative: fd.achievementDescription,
			image: fd.evidenceLink ? { id: fd.evidenceLink, type: 'Image' } : undefined,
		},
	];

	const evidence = [
		...(fd.portfolio?.filter((p) => p.name && p.url).map((p) => ({ id: p.url, name: p.name, description: fd.evidenceDescription || undefined })) ?? []),
		...(fd.evidenceLink ? [{ id: fd.evidenceLink, name: fd.evidenceDescription || 'Evidence', description: fd.evidenceDescription || undefined }] : []),
	];

	return {
		personName: fd.fullName,
		skills,
		evidence: evidence.length ? evidence : undefined,
	};
}

async function main() {
	const { didDocument, keyPair } = await engine.createDID();
	console.log('DID:', didDocument.id);

	const skillClaimData = formDataToSkillClaim(formData);
	skillClaimData.personId = didDocument.id;

	const signedVC = await engine.signSkillClaimVC(skillClaimData, keyPair, didDocument.id);

	console.log('\n========== Signed SkillClaimCredential ==========\n');
	console.log(JSON.stringify(signedVC, null, 2));
}

main().catch((e) => {
	console.error('Test failed:', e);
	process.exitCode = 1;
});
