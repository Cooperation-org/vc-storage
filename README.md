# @cooperation/vc-storage

TypeScript utilities to work with storage backends used by Linked Claims: Google Drive and Wallet Aggregated Storage (WAS). Includes a simple factory to construct storage clients and helpers used by the authoring app.

## Installation

```bash
npm install @cooperation/vc-storage
```

## Exports (selected)

- GoogleDriveStorage
- LCWStorage (WAS via @wallet.storage/fetch-client)
- WASZcapStorage (WAS via zCap delegation)
- createStorage(kind, options)
- Misc models: CredentialEngine, Resume, ResumeVC, utils

## Storage factory

```ts
import { createStorage } from '@cooperation/vc-storage';

// Google Drive
const drive = createStorage('googleDrive', { accessToken });

// WAS (zCap-capability, delegated access)
const wasZ = createStorage('wasZcap', { appInstance, capability });
```

## GoogleDriveStorage (highlights)

```ts
import { GoogleDriveStorage } from '@cooperation/vc-storage';

const drive = new GoogleDriveStorage(accessToken);

// Upload binary (images/videos/pdfs)
await drive.uploadBinaryFile({ file }); // -> { id }

// Save JSON file to a specific folder
await drive.saveFile({ data: { fileName: 'VC', mimeType: 'application/json', body: JSON.stringify(vc) }, folderId });

// Retrieve file content
await drive.retrieve(fileId); // -> { id, data }

// Delete
await drive.delete(fileId);
```

## WASZcapStorage (WAS, zCap delegation)

Use when uploading from the browser with delegated capability (zCap).

```ts
import { WASZcapStorage } from '@cooperation/vc-storage';

const was = new WASZcapStorage({ appInstance, capability });

// Blob upload (images, pdfs, or JSON-as-blob)
await was.upload({ key: file.name, file }); // -> id or url

// Optional read/delete
await was.read('key.json');
await was.delete('old-file.txt');
```

## Choosing a backend

- Use WASZcapStorage when you have a zCap capability and an appInstance Ed25519 keypair (delegated, least-privilege).
- Use GoogleDriveStorage for Drive workflows (e.g., storing VC artifacts/files in Drive).

## Notes

- WAS zCap requests are signed with Ed25519Signature2020 and require a valid `invocationSigner.id`.
- There is no implicit fallback between backends; handle errors per backend explicitly in your app.

## License

ISC
