export const inlineResumeContext = {
	'@context': {
		'@vocab': 'https://schema.hropenstandards.org/4.4/',

		// Basic details
		name: 'https://schema.org/name',
		formattedName: 'https://schema.org/formattedName',
		primaryLanguage: 'https://schema.org/primaryLanguage',

		// Narrative
		professionalSummary: 'https://schema.org/professionalSummary',
		text: 'https://schema.org/text',

		// Contact Information
		contact: 'https://schema.org/ContactPoint',
		email: 'https://schema.org/email',
		phone: 'https://schema.org/telephone',
		location: 'https://schema.org/address',
		street: 'https://schema.org/streetAddress',
		city: 'https://schema.org/addressLocality',
		state: 'https://schema.org/addressRegion',
		country: 'https://schema.org/addressCountry',
		postalCode: 'https://schema.org/postalCode',
		socialLinks: {
			'@id': 'https://schema.org/URL',
			'@container': '@set',
		},
		linkedin: 'https://schema.org/sameAs',
		github: 'https://schema.org/sameAs',
		portfolio: 'https://schema.org/url',
		twitter: 'https://schema.org/sameAs',

		// Experience & Employment History
		experience: {
			'@id': 'https://schema.org/WorkExperience',
			'@container': '@list',
		},
		employmentHistory: {
			'@id': 'https://schema.org/employmentHistory',
			'@container': '@list',
		},
		company: 'https://schema.org/worksFor',
		position: 'https://schema.org/jobTitle',
		description: 'https://schema.org/description',
		startDate: 'https://schema.org/startDate',
		endDate: 'https://schema.org/endDate',
		stillEmployed: 'https://schema.org/Boolean',
		duration: 'https://schema.org/temporalCoverage',

		// Skills
		skills: {
			'@id': 'https://schema.org/skills',
			'@container': '@list',
		},

		// Education
		educationAndLearning: {
			'@id': 'https://schema.org/EducationalOccupationalProgram',
			'@container': '@list',
		},
		degree: 'https://schema.org/educationalCredentialAwarded',
		fieldOfStudy: 'https://schema.org/studyField',
		institution: 'https://schema.org/educationalInstitution',
		year: 'https://schema.org/year',

		// Awards
		awards: {
			'@id': 'https://schema.org/Achievement',
			'@container': '@list',
		},
		title: 'https://schema.org/name',
		issuer: 'https://schema.org/issuer',
		date: 'https://schema.org/dateReceived',

		// Publications
		publications: {
			'@id': 'https://schema.org/CreativeWork',
			'@container': '@list',
		},
		publisher: 'https://schema.org/publisher',
		url: 'https://schema.org/url',

		// Certifications
		certifications: {
			'@id': 'https://schema.org/EducationalOccupationalCredential',
			'@container': '@list',
		},

		// Professional Affiliations
		professionalAffiliations: {
			'@id': 'https://schema.org/OrganizationRole',
			'@container': '@list',
		},
		organization: 'https://schema.org/memberOf',
		role: 'https://schema.org/jobTitle',
		activeAffiliation: 'https://schema.org/Boolean',

		// Volunteer Work
		volunteerWork: {
			'@id': 'https://schema.org/VolunteerRole',
			'@container': '@list',
		},
		currentlyVolunteering: 'https://schema.org/Boolean',

		// Hobbies and Interests
		hobbiesAndInterests: {
			'@id': 'https://schema.org/knowsAbout',
			'@container': '@set',
		},

		// Languages
		languages: {
			'@id': 'https://schema.org/knowsLanguage',
			'@container': '@list',
		},
		language: 'https://schema.org/inLanguage',
		proficiency: 'https://schema.org/proficiencyLevel',

		// Testimonials
		testimonials: {
			'@id': 'https://schema.org/Review',
			'@container': '@list',
		},
		author: 'https://schema.org/author',

		// Projects
		projects: {
			'@id': 'https://schema.org/Project',
			'@container': '@list',
		},

		// Issuance Information
		issuanceDate: 'https://schema.org/issuanceDate',
		credentialSubject: 'https://schema.org/credentialSubject',
		person: 'https://schema.org/Person',
		Resume: 'https://schema.hropenstandards.org/4.4#Resume',
	},
};

// 1. Employment Credential Context
export const employmentCredentialContext = {
  '@context': {
    '@vocab': 'https://schema.hropenstandards.org/4.4/',
    fullName:               'https://schema.org/name',
    persons:                'https://schema.org/name',
    credentialName:         'https://schema.org/jobTitle',
    credentialDuration:     'https://schema.org/duration',
    credentialDescription:  'https://schema.org/description',
    portfolio: {
      '@id':        'https://schema.org/hasPart',
      '@container': '@list'
    },
    name:                   'https://schema.org/name',
    url:                    'https://schema.org/url',
    evidenceLink:           'https://schema.org/url',
    evidenceDescription:    'https://schema.org/description',
    company:                'https://schema.org/worksFor',
    role:                   'https://schema.org/jobTitle'
  }
};

// 2. Volunteering Credential Context
export const volunteeringCredentialContext = {
  '@context': {
    '@vocab': 'https://schema.hropenstandards.org/4.4/',
    fullName:             'https://schema.org/name',
    persons:              'https://schema.org/name',
    volunteerWork:        'https://schema.org/roleName',
    volunteerOrg:         'https://schema.org/organization',
    volunteerDescription: 'https://schema.org/description',
    skillsGained: {
      '@id':        'https://schema.org/skills',
      '@container': '@list'
    },
    duration:            'https://schema.org/duration',
    volunteerDates:      'https://schema.org/temporalCoverage',
    portfolio: {
      '@id':        'https://schema.org/hasPart',
      '@container': '@list'
    },
    name:                   'https://schema.org/name',
    url:                    'https://schema.org/url',
    evidenceLink:           'https://schema.org/url',
    evidenceDescription:    'https://schema.org/description'
  }
};

// 3. Performance Review Credential Context
export const performanceReviewCredentialContext = {
  '@context': {
    '@vocab': 'https://schema.hropenstandards.org/4.4/',
    fullName:            'https://schema.org/name',
    persons:             'https://schema.org/name',
    employeeName:        'https://schema.org/name',
    employeeJobTitle:    'https://schema.org/jobTitle',
    company:             'https://schema.org/worksFor',
    role:                'https://schema.org/jobTitle',
    reviewStartDate:     'https://schema.org/startDate',
    reviewEndDate:       'https://schema.org/endDate',
    reviewDuration:      'https://schema.org/duration',
    jobKnowledgeRating:  'https://schema.org/assessmentScore',
    teamworkRating:      'https://schema.org/assessmentScore',
    initiativeRating:    'https://schema.org/assessmentScore',
    communicationRating: 'https://schema.org/assessmentScore',
    overallRating:       'https://schema.org/aggregateRating',
    reviewComments:      'https://schema.org/comment',
    goalsNext:           'https://schema.hropenstandards.org/4.4/goalsNext',
    portfolio: {
      '@id':        'https://schema.org/hasPart',
      '@container': '@list'
    },
    name:                   'https://schema.org/name',
    url:                    'https://schema.org/url',
    evidenceLink:           'https://schema.org/url',
    evidenceDescription:    'https://schema.org/description'
  }
};
