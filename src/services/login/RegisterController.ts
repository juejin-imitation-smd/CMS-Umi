import { request } from "@umijs/max";
// 注册
export async function register(
  body: RegisterAPI.RegisterVO,
  options?: { [key: string]: any },
) {
  return request<RegisterAPI.Result_RegisterInfo>("/api/register", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}
