declare module '@digitalcredentials/vc' {
	export const defaultDocumentLoader: (url: string) => Promise<{ contextUrl: string | null; documentUrl: string; document: unknown }>;
	export const dateRegex: RegExp;
	export class CredentialIssuancePurpose {
		constructor(options?: { controller?: string });
	}
	export function issue(options: {
		credential: object;
		suite: object;
		purpose?: object;
		documentLoader?: (url: string) => Promise<{ contextUrl: string | null; documentUrl: string; document: unknown }>;
		now?: string | Date;
	}): Promise<object>;
	export function verifyCredential(options: {
		credential: object;
		suite: object | object[];
		purpose?: object;
		documentLoader?: (url: string) => Promise<{ contextUrl: string | null; documentUrl: string; document: unknown }>;
		checkStatus?: (status: object) => Promise<unknown>;
		now?: string | Date;
	}): Promise<{ verified: boolean; results?: unknown[]; error?: unknown }>;
	export function createPresentation(options: {
		verifiableCredential?: object | object[];
		id?: string;
		holder?: string;
	}): object;
	export function signPresentation(options: {
		presentation: object;
		suite: object;
		challenge: string;
		documentLoader?: (url: string) => Promise<{ contextUrl: string | null; documentUrl: string; document: unknown }>;
	}): Promise<object>;
}
