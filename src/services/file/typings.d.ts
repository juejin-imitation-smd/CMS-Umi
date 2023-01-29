declare namespace FileAPI {
  interface Result_FileInfo {
    code: number;
    msg: string;
    data: FileInfo;
  }
  interface FileInfo {
    path: string;
  }
}
