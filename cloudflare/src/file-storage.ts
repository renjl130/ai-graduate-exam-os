export interface StoredFileMetadata {
  name: string;
  size: number;
  contentType: string;
  uploadedAt: string;
  kind?: "library" | "import";
  importJobId?: string;
}

export const MAX_FILE_BYTES = 25 * 1024 * 1024;

export function storageKey(userId: string, path: string): string {
  return `${userId}/${path}`;
}
