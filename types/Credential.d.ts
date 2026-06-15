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

export interface SkillEndorsed {
	name: string;
	id?: string;
	frameworkMatch?: Array<{
		socCode?: string[];
		similarityScore?: number;
		name?: string;
		framework?: string;
	}>;
}

export interface RecommendationFormDataI {
	fullName: string;
	howKnow: string;
	recommendationText: string;
	qualifications?: string;
	explainAnswer?: string;
	portfolio?: PortfolioItem[];
	recipientName?: string;
	skillsEndorsed?: SkillEndorsed[];
	/** @deprecated v2 recommendations do not use expirationDate */
	expirationDate?: string;
	/**
	 * Optional DID/URI for the recommendation subject (holder).
	 * If omitted, generators may default to the issuer DID.
	 */
	subjectId?: string;
	/** Root-level evidence (passed through signVC data when signing). */
	evidence?: EvidenceItem[];
}

export interface RecommendationCredential {
	'@context': any[];
	id: string;
	type: string[];
	issuer: {
		id: string;
		type: string[];
	};
	/** VC Data Model v2 issuance timestamp. */
	validFrom?: string;
	credentialSubject: {
		/** DID/URI (VC `id`) this recommendation is for (e.g., a Skill VC id). */
		id: string;
		name: string;
		recipientName?: string;
		howKnow: string;
		recommendationText: string;
		qualifications?: string;
		explainAnswer?: string;
		portfolio?: PortfolioItem[];
		skillsEndorsed?: SkillEndorsed[];
	};
	evidence?: EvidenceItem[];
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
 * hr-context does not define evidence; this matches standard VC evidence shape.
 */
export interface EvidenceItem {
  id: string;
  type?: string;
  name: string;
  description?: string;
}

/**
 * Framework alignment for a skill (e.g. O*NET SOC code matches).
 * `socCode` holds multiple matches per skill (pipeline keeps the top matches).
 */
export interface FrameworkMatchItem {
  id?: string;
  framework?: string;
  socCode?: string[];
  name?: string;
  similarityScore?: number;
}

/**
 * User-entered skill within a SkillClaimCredential.
 */
export interface SkillItem {
  name: string;
  description?: string;
  durationPerformed?: string;
  image?: {
    id: string;
    type: string;
  };
  /** 'user' when the skill was manually entered via the UI. */
  source?: string;
}

/**
 * Skill inferred by an extraction pipeline (e.g. an LLM), kept separate from
 * user-entered skills. Emitted as `credentialSubject.inferredSkill`.
 */
export interface InferredSkillItem {
  name: string;
  /** Extraction source, e.g. 'ollama'. */
  source: string;
  /** LLM model used for inference, e.g. 'qwen2.5:7b'. */
  model?: string;
  frameworkMatch?: FrameworkMatchItem[];
}

/**
 * Form data for the SkillClaimCredential (HR Context data model).
 */
export interface SkillClaimFormDataI {
  personName: string;
  /** DID/URI for the credential subject. Falls back to issuer DID if omitted. */
  personId?: string;
  skills: SkillItem[];
  inferredSkills?: InferredSkillItem[];
  evidence?: EvidenceItem[];
}
