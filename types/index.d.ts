export interface DataToSaveI {
	fileName: string;
	mimeType: string;
	body: any;
}

export type FilesType = 'KEYPAIRs' | 'MEDIAs' | 'VCs' | 'VPs' | 'RECOMMENDATIONs' | 'DIDs' | 'RELATIONS';

// Re-export credential types (case-sensitive filesystems)
export * from './Credential';
