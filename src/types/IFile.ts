export interface IFile {
  lastModified?: number;
  lastModifiedDate?: object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath?: string
}
