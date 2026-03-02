import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
import { suiteContext as ed25519Context } from '@digitalcredentials/ed25519-signature-2020';
import { driver as didKeyDriver } from '@digitalcredentials/did-method-key';
import { defaultDocumentLoader } from '@digitalcredentials/vc';
import { contexts as obContexts } from '@digitalcredentials/open-badges-context';
import { contexts as credV1Contexts } from 'credentials-context';
import { contexts as credV2Contexts } from '@digitalcredentials/credentials-v2-context';
import hrContext from 'hr-context';

// Initialize the DID method key driver
const didKeyDriverInstance = didKeyDriver();

didKeyDriverInstance.use({
	multibaseMultikeyHeader: 'z6Mk',
	fromMultibase: Ed25519VerificationKey2020.from,
});

// Build context map from installed packages
const contextMap = new Map([
	...credV1Contexts,
	...credV2Contexts,
	...obContexts,
	...ed25519Context.contexts,
	[hrContext.CONTEXT_URL_V1, hrContext.CONTEXT_V1],
	['https://w3id.org/hr/v1', hrContext.CONTEXT_V1],
]);

// Custom document loader
export const customDocumentLoader = async (url: string) => {
	const context = contextMap.get(url);
	if (context) {
		return {
			contextUrl: null,
			documentUrl: url,
			document: context,
		};
	}

	// Handle did:key resolution
	if (url.startsWith('did:key:')) {
		const didDocument = await didKeyDriverInstance.get({ did: url });
		return {
			contextUrl: null,
			documentUrl: url,
			document: didDocument,
		};
	}

	// Fallback to the default document loader
	return defaultDocumentLoader(url);
};
