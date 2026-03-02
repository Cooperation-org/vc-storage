import { CredentialEngine } from '../../dist/models/CredentialEngine.js';

// mock storage
const storage = {
	saveFile: async (data) => {
		return { id: '123' };
	},
	retrieve: async (id) => {
		return { id: '123' };
	},
};

const engine = new CredentialEngine(storage);

const employmentData = {
	fullName: 'John Doe',
	persons: 'John Doe',
	credentialName: 'Software Engineer',
	credentialDuration: '2 years',
	credentialDescription: 'Worked as a software engineer at Example Corp.',
	portfolio: [{ name: 'Project X', url: 'https://projectx.com' }],
	evidenceLink: 'https://evidence.com',
	evidenceDescription: 'Employment contract',
	company: 'Example Corp',
	role: 'Software Engineer',
	// Ignoring storageOption and googleId?
};

const volunteeringData = {
	fullName: 'Jane Doe',
	persons: 'Jane Doe',
	volunteerWork: 'Community Helper',
	volunteerOrg: 'Helping Hands',
	volunteerDescription: 'Assisted in community events.',
	skillsGained: 'Teamwork, Leadership',
	duration: '6 months',
	volunteerDates: '2023-01-01 to 2023-07-01',
	portfolio: [{ name: 'Event Photos', url: 'https://photos.com' }],
	evidenceLink: 'https://evidence.com',
	evidenceDescription: 'Volunteer certificate',
};

const performanceReviewData = {
	fullName: 'Alex Smith',
	persons: 'Alex Smith',
	employeeName: 'Alex Smith',
	employeeJobTitle: 'Developer',
	company: 'Tech Co',
	role: 'Reviewer',
	reviewStartDate: '2023-01-01',
	reviewEndDate: '2023-12-31',
	reviewDuration: '1 year',
	jobKnowledgeRating: '5',
	teamworkRating: '4',
	initiativeRating: '5',
	communicationRating: '4',
	overallRating: '5',
	reviewComments: 'Excellent performance.',
	goalsNext: 'Improve code quality, Mentor juniors',
	portfolio: [{ name: 'Performance Report', url: 'https://report.com' }],
	evidenceLink: 'https://evidence.com',
	evidenceDescription: 'Performance review document',
};

const skillClaimData = {
	personName: 'Alice Smith',
	skills: [
		{
			name: 'UX Design',
			description: 'Designs user-centered digital interfaces and experiences.',
			durationPerformed: '4 years',
			narrative:
				'I led the end-to-end UX redesign of a healthcare mobile app. ' +
				'I conducted user research interviews, synthesized findings into journey maps, ' +
				'created low- and high-fidelity wireframes in Figma, built interactive prototypes, ' +
				'and ran usability testing sessions.',
		},
		{
			name: 'Leadership',
			description: 'Managed cross-functional teams and drove project delivery.',
			durationPerformed: '2 years',
			narrative:
				'Led a team of 8 engineers and designers through a 6-month product launch cycle. ' +
				'Facilitated sprint planning, resolved blockers, and reported progress to stakeholders.',
		},
	],
	evidence: [
		{ id: 'https://files.example/design.webp', name: 'Sample UX Design Diagram', description: 'A high-fidelity mockup of the healthcare app redesign.' },
		{ id: 'https://files.example/leadership-cert.pdf', name: 'Leadership Workshop Certificate' },
	],
};

async function main() {
	try {
		// 1. Create DID and key pair
		const { didDocument, keyPair } = await engine.createDID();
		console.log('DID Document:', didDocument);
		console.log('Key Pair:', keyPair);

		// 2. Sign and save Employment VC
		const employmentVC = await engine.signEmploymentCredential({ ...employmentData }, keyPair, didDocument.id);
		console.log('\nEmployment VC saved:', employmentVC);
		const retrievedEmployment = await storage.retrieve(employmentVC.id);
		console.log('Retrieved Employment VC:', JSON.stringify(retrievedEmployment, null, 2));

		// 3. Sign and save Volunteering VC
		const volunteeringVC = await engine.signVolunteeringCredential({ ...volunteeringData }, keyPair, didDocument.id);

		console.log('\nVolunteering VC saved:', volunteeringVC);
		const retrievedVolunteering = await storage.retrieve(volunteeringVC.id);
		console.log('Retrieved Volunteering VC:', JSON.stringify(retrievedVolunteering, null, 2));

		// 4. Sign and save Performance Review VC
		const performanceReviewVC = await engine.signPerformanceReviewCredential({ ...performanceReviewData }, keyPair, didDocument.id);

		console.log('\nPerformance Review VC saved:', performanceReviewVC);
		const retrievedPerformanceReview = await storage.retrieve(performanceReviewVC.id);
		console.log('Retrieved Performance Review VC:', JSON.stringify(retrievedPerformanceReview, null, 2));

		// 5. Sign and save SkillClaim VC (HR Context data model)
		const skillClaimWithPersonId = { ...skillClaimData, personId: didDocument.id };
		const skillClaimVC = await engine.signSkillClaimVC(skillClaimWithPersonId, keyPair, didDocument.id);

		console.log('\nSkillClaim VC saved:', skillClaimVC);
		console.log('SkillClaim VC (full):', JSON.stringify(skillClaimVC, null, 2));

		// Verify SkillClaim VC
		const skillClaimVerified = await engine.verifyCredential(skillClaimVC);
		console.log('SkillClaim VC verified:', skillClaimVerified);

		if (!skillClaimVerified) {
			throw new Error('SkillClaim VC verification failed!');
		}

		console.log('\nAll VCs tested and saved successfully!');
	} catch (error) {
		console.error('Test failed:', error);
	}
}

main();
