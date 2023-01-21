import { request } from "@umijs/max";

export async function queryAuthorList(
  params: {
    size: number;
    page: number;
    uid?: string;
    username?: string;
  },
  options?: { [key: string]: any },
) {
  return request<AuthorAPI.Result_PageInfo_AuthorInfo__>(
    "/api/cms/advertisement",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
