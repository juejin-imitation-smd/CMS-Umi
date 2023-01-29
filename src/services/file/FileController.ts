import { request } from "@umijs/max";

// 上传文件
export async function uploadFile(body: File, options?: { [key: string]: any }) {
  const data = new FormData();
  data.append("file", body);
  return request<FileAPI.Result_FileInfo>("/api/upload", {
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...(options || {}),
  });
}
