import { initializeApp } from 'firebase/app';
import {
  getStorage,
  FirebaseStorage as Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  updateMetadata,
  deleteObject,
  list,
  ListOptions,
} from 'firebase/storage';

export default class FirebaseStorage {
  private readonly storage: Storage;

  constructor() {
    try {
      initializeApp();
    } catch (e) {
      console.log(e);
    } finally {
      this.storage = getStorage();
    }
  }

  async getFileUrl(path: string): Promise<string> {
    const fileRef = ref(this.storage, path);
    const url = await getDownloadURL(fileRef);
    return url;
  }

  async uploadFile(
    path: string,
    file: File,
    metadata?: Record<string, string>
  ): Promise<string> {
    const fileRef = ref(this.storage, path);
    await uploadBytes(fileRef, file, {
      customMetadata: {
        ...(metadata || {}),
      },
    });

    return this.getFileUrl(path);
  }

  async deleteFile(path: string): Promise<void> {
    const fileRef = ref(this.storage, path);
    await deleteObject(fileRef);
  }

  async listFiles(
    path: string,
    options: { maxResults?: number; nextPageToken?: string } = {}
  ): Promise<{
    items: string[];
    nextPageToken?: string;
  }> {
    const listRef = ref(this.storage, path);
    const listOptions: ListOptions = {};
    if (options.maxResults) listOptions.maxResults = options.maxResults;
    if (options.nextPageToken) listOptions.pageToken = options.nextPageToken;

    const page = await list(listRef, listOptions);

    return {
      items: page.items.map(({ name }) => name),
      nextPageToken: page.nextPageToken,
    };
  }

  async updateFileMetadata(
    path: string,
    metadata: Record<string, string>
  ): Promise<void> {
    const fileRef = ref(this.storage, path);
    await updateMetadata(fileRef, { customMetadata: metadata });
  }
}
