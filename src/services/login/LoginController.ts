import { request } from "@umijs/max";
// 登录
export async function login(
  body: LoginAPI.LoginInfoVO,
  options?: { [key: string]: any },
) {
  return request<LoginAPI.Result_LoginInfo>("/api/login", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}
