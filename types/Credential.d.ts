interface PublicKey {
	id: string;
	type: string;
	controller: string;
	publicKeyMultibase: string;
}

interface PortfolioItem {
	name: string;
	url: string;
}

import type { IAchievement, IOpenBadgeSubject } from '@digitalcredentials/ssi';

 export type Achievement = IAchievement;
export type OpenBadgeSubject = IOpenBadgeSubject;

export interface KeyPair {
	id: string;
	controller: string;
	fingerprint: () => string;
	revoked: boolean;
	publicKeyMultibase: string;
	type: string;
	privateKeyMultibase: string;
}

export interface DidDocument {
	'@context': string[];
	id: string;
	publicKey: PublicKey[];
	authentication: string[];
	assertionMethod: string[];
	capabilityDelegation: string[];
	capabilityInvocation: string[];
	keyAgreement: PublicKey[];
}

export interface FormDataI {
	expirationDate: string;
	fullName: string;
	duration: string;
	criteriaNarrative: string;
	achievementDescription: string;
	achievementName: string;
	portfolio: { name: string; url: string }[];
	evidenceLink: string;
	evidenceDescription: string;
	credentialType: string;
	/**
	 * Optional DID/URI for the credential subject (holder).
	 * If omitted, generators may default to the issuer DID.
	 */
	subjectId?: string;
}

export interface Credential {
	'@context': any[];
	id: string;
	type: string[];
	issuer: {
		id: string;
		type: string[];
	};
	issuanceDate: string;
	expirationDate: string;
	credentialSubject: {
		/** DID/URI for the subject (holder). */
		id?: string;
		evidenceLink: string;
		evidenceDescription: string;
		portfolio: PortfolioItem[];
		credentialType: string;
		type: string[];
		duration: string;
		name: string;
		achievement: Achievement[];
		fullName?: string;
	};
}

export interface RecommendationFormDataI {
	recommendationText: string;
	qualifications: string;
	expirationDate: string;
	fullName: string;
	howKnow: string;
	explainAnswer: string;
	portfolio: { name: string; url: string }[];
	/**
	 * Optional DID/URI for the recommendation subject (holder).
	 * If omitted, generators may default to the issuer DID.
	 */
	subjectId?: string;
}

export interface RecommendationCredential {
	'@context': any[];
	id: string;
	type: string[];
	issuer: {
		id: string;
		type: string[];
	};
	issuanceDate: string;
	expirationDate: string;
	credentialSubject: {
		/** DID/URI (VC `id`) this recommendation is for (e.g., a Skill VC id). */
		id: string;
		name: string;
		howKnow: string;
		recommendationText: string;
		qualifications: string;
		explainAnswer: string;
		portfolio: PortfolioItem[];
	};
}

export interface Proof {
	type: string;
	created: string;
	verificationMethod: string;
	proofPurpose: string;
	proofValue: string;
}

/**
 * Employment form data
 */
export interface EmploymentFormDataI {
  fullName: string;
  persons: string;
  credentialName: string;
  credentialDuration: string;
  credentialDescription: string;
  portfolio: PortfolioItem[];
  evidenceLink: string;
  evidenceDescription: string;
  company: string;
  role: string;
}

/**
 * Volunteering form data
 */
export interface VolunteeringFormDataI {
  fullName: string;
  persons: string;
  volunteerWork: string;
  volunteerOrg: string;
  volunteerDescription?: string;
  skillsGained?: string;
  duration?: string;
  volunteerDates?: string;
  portfolio: PortfolioItem[];
  evidenceLink: string;
  evidenceDescription: string;
}

/**
 * Performance Review form data
 */
export interface PerformanceReviewFormDataI {
  fullName: string;
  persons: string;
  employeeName: string;
  employeeJobTitle: string;
  company: string;
  role: string;
  reviewStartDate: string;
  reviewEndDate: string;
  reviewDuration?: string;
  jobKnowledgeRating?: string;
  teamworkRating?: string;
  initiativeRating?: string;
  communicationRating?: string;
  overallRating?: string;
  reviewComments?: string;
  goalsNext?: string;
  portfolio: PortfolioItem[];
  evidenceLink: string;
  evidenceDescription: string;
}

/**
 * Evidence item for SkillClaimCredential (replaces portfolio/evidenceLink/evidenceDescription).
 */
export interface EvidenceItem {
  id: string;
  type?: string;
  name: string;
  description?: string;
}

/**
 * Skill entry within a SkillClaimCredential.
 */
export interface SkillItem {
  name: string;
  description?: string;
  durationPerformed?: string;
  narrative?: string;
  image?: {
    id: string;
    type: string;
  };
}

/**
 * Form data for the SkillClaimCredential (HR Context data model).
 */
export interface SkillClaimFormDataI {
  personName: string;
  /** DID/URI for the credential subject. Falls back to issuer DID if omitted. */
  personId?: string;
  skills: SkillItem[];
  evidence?: EvidenceItem[];
}

/**
 * SkillClaimCredential shape (HR Context / VC Data Model v2).
 */
export interface SkillClaimCredential {
  '@context': any[];
  id: string;
  type: ['VerifiableCredential', 'SkillClaimCredential', ...string[]];
  issuer: string;
  credentialSubject: {
    type: ['SkillClaim', ...string[]];
    person: {
      id: string;
      name: string;
    };
    skill: {
      id: string;
      name: string;
      description?: string;
      durationPerformed?: string;
      narrative?: string;
      image?: {
        id: string;
        type: string;
      };
    }[];
  };
  evidence?: EvidenceItem[];
}
