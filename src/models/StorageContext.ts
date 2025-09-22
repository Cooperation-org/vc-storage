import { GoogleDriveStorage } from './GoogleDriveStorage.js';
import { WASZcapStorage } from './WASZcapStorage.js';

export type StorageKind = 'googleDrive' | 'was' | 'wasZcap';

export type GoogleDriveOptions = { accessToken: string };
export type WASOptions = { signer: any; spaceId: string };
export type WASZcapOptions = { appInstance: any; capability: any };

export function createStorage(kind: 'googleDrive', options: GoogleDriveOptions): GoogleDriveStorage;
export function createStorage(kind: 'wasZcap', options: WASZcapOptions): WASZcapStorage;
export function createStorage(kind: StorageKind, options: any): any {
	if (kind === 'googleDrive') {
		if (!options?.accessToken) throw new Error('Missing accessToken for Google Drive');
		return new GoogleDriveStorage(options.accessToken);
	}
	if (kind === 'wasZcap') {
		if (!options?.appInstance || !options?.capability) throw new Error('Missing appInstance or capability for WAS Zcap');
		return new WASZcapStorage({ appInstance: options.appInstance, capability: options.capability });
	}
	throw new Error('Unsupported storage kind');
}
