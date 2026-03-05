declare module '@digitalcredentials/did-method-key' {
	export function driver(): {
		use(options: { multibaseMultikeyHeader: string; fromMultibase: (options: object) => Promise<unknown> }): void;
		get(options: { did: string }): Promise<object>;
	};
}
