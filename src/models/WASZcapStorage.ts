// @ts-nocheck
import { ZcapClient } from '@digitalcredentials/ezcap';
import { Ed25519VerificationKey2020 } from '@digitalcredentials/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';

export interface WasZcapStorageConfig {
	appInstance: {
		publicKeyMultibase: string;
		privateKeyMultibase: string;
		controller: string;
		id: string;
	};
	capability: {
		"@context": string[];
		allowedAction: string[];
		controller: string;
		expires: string;
		id: string;
		invocationTarget: string;
		parentCapability: string;
		proof: {
			capabilityChain: string[];
			type: string;
			created: string;
			proofPurpose: string;
			proofValue: string;
			verificationMethod: string;
		};
	};
}

export class WASZcapStorage {
	private zcapClient: any;
	private capability: any;
    private ready: Promise<void>;

	constructor(config: WasZcapStorageConfig) {
		if (!config?.appInstance?.publicKeyMultibase || !config?.appInstance?.privateKeyMultibase) {
			throw new Error('appInstance is missing key material');
		}
		if (!config?.capability) {
			throw new Error('capability (zcap) is required');
		}
		this.capability = config.capability;
        this.ready = this.initClient(config.appInstance);
	}

    private async initClient(appInstance: any) {
        const key = await Ed25519VerificationKey2020.from(appInstance);
        const signer = key.signer();
        // ezcap expects invocationSigner.id
        (signer as any).id = key.id;
        this.zcapClient = new ZcapClient({
            SuiteClass: Ed25519Signature2020,
            invocationSigner: signer,
        });
	}

	private async request(method: 'PUT' | 'GET' | 'DELETE', url: string, body?: Blob) {
        await this.ready;
		return this.zcapClient.request({
			url,
			capability: this.capability,
			method,
			action: method,
			...(body ? { blob: body } : {}),
		});
	}

	private buildUrlForKey(key: string) {
		const baseUrl = this.capability?.invocationTarget;
		if (!baseUrl) throw new Error('Capability invocationTarget is missing');
		return `${baseUrl}/${encodeURIComponent(key)}`;
	}

	async upload({ key, file }: { key: string; file: File | Blob }) {
		const url = this.buildUrlForKey(key);
		const res = await this.request('PUT', url, file as Blob);
		return this.extractId(res) ?? url;
	}
	async read(key: string): Promise<any | null> {
		const url = this.buildUrlForKey(key);
		const res = await this.request('GET', url);
		if (res?.status === 404) return null;
		try {
			return await res.json();
		} catch (_) {
			return await res.blob();
		}
	}

	async delete(key: string): Promise<boolean> {
		const url = this.buildUrlForKey(key);
		const res = await this.request('DELETE', url);
		return res?.ok || res?.status === 404;
	}

    // Updates can be performed by calling upload() with the same key

	private extractId(res: any): string | undefined {
		return res?.id || res?.result?.id || res?.url;
	}
}
