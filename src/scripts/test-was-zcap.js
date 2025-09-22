/* eslint-disable no-console */
import { createStorage } from '../../dist/models/StorageContext.js';

// Constants provided by user (paste/adjust as needed)
const INPUT = {
	zcap: {
		"@context": [
			"https://w3id.org/zcap/v1",
			"https://w3id.org/security/suites/ed25519-2020/v1"
		],
		"id": "urn:uuid:86f3c502-422d-4636-a65f-23637c79f068",
		"controller": "did:key:z6Mkga99VUDLTebdUUD8vPF2Yz46kyMXssxcvWf7cGG4CU31",
		"parentCapability": "urn:zcap:root:https%3A%2F%2Fmodification-just-attempting-bedford.trycloudflare.com%2Fspace%2Fc63e7415-5d35-44d5-b7f2-23e1f1baecc3",
		"invocationTarget": "https://modification-just-attempting-bedford.trycloudflare.com/space/c63e7415-5d35-44d5-b7f2-23e1f1baecc3",
		"expires": "2025-10-02T15:41:35.853Z",
		"allowedAction": [
			"GET",
			"POST",
			"PUT",
			"DELETE"
		],
		"proof": {
			"type": "Ed25519Signature2020",
			"created": "2025-09-22T15:41:49Z",
			"verificationMethod": "did:key:z6MkjgYoLEpXgSUJaTnyynomQQm3PdS7LXUpFApjvsBsBb8v#z6MkjgYoLEpXgSUJaTnyynomQQm3PdS7LXUpFApjvsBsBb8v",
			"proofPurpose": "capabilityDelegation",
			"capabilityChain": [
				"urn:zcap:root:https%3A%2F%2Fmodification-just-attempting-bedford.trycloudflare.com%2Fspace%2Fc63e7415-5d35-44d5-b7f2-23e1f1baecc3"
			],
			"proofValue": "z32BcJzWbqNygdjUmUJeStiqcMwiRmC2Xm7ApPcp9B5BV37jCBYu3V4gChEZXD4NQGbX4KG89kt3bER8KdHqZemYE"
		}
	},
	appInstanceDid: "{\"controller\":\"did:key:z6Mkga99VUDLTebdUUD8vPF2Yz46kyMXssxcvWf7cGG4CU31\",\"id\":\"did:key:z6Mkga99VUDLTebdUUD8vPF2Yz46kyMXssxcvWf7cGG4CU31#z6Mkga99VUDLTebdUUD8vPF2Yz46kyMXssxcvWf7cGG4CU31\",\"publicKeyMultibase\":\"z6Mkga99VUDLTebdUUD8vPF2Yz46kyMXssxcvWf7cGG4CU31\",\"privateKeyMultibase\":\"zrv5X7LBejiETsJHaJX4L56bsr8DGc63Ggu1e7zXGW4vyUfC5gtmv3cxD4JJ1Qj1brf7DWqxDjnnGgPj8h1FjhXiQyM\"}",
	timestamp: 1758555710247
};

async function main() {
	try {
		const appInstance = JSON.parse(INPUT.appInstanceDid);
		const capability = INPUT.zcap;


		// Create WAS Zcap storage via factory (uses ZcapClient exactly like author app)
		const was = createStorage('wasZcap', { appInstance, capability });

		// --- BLOB PUT TEST (most important) ---
		const blobKey = `blob-${Date.now()}.txt`;
		const blob = new Blob([`Hello WAS @ ${new Date().toISOString()}`], { type: 'text/plain' });

		console.log('Putting BLOB...');
		await was.upload({ key: blobKey, file: blob });


		console.log('✅ PUT operations completed');
	} catch (err) {
		console.error('❌ Test failed:', err);
		process.exitCode = 1;
	}
}

main();


