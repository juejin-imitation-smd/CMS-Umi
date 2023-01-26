import { request } from "@umijs/max";

export async function queryCategoryList(
  params: {
    size: number;
    page: number;
  },
  options?: { [key: string]: any },
) {
  return request<CategoryAPI.Result_PageInfo_CategoryInfo__>(
    "/api/cms/column",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
