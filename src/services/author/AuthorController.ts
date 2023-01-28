import { request } from "@umijs/max";

/**
 * @Description: 分页查询
 */
export async function queryAuthorList(
  params: AuthorAPI.Request_PageInfo_AuthorInfo,
  options?: { [key: string]: any },
) {
  return request<AuthorAPI.Result_PageInfo_AuthorInfo>("/api/cms/author", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 新增作者
 */
export async function addAuthor(
  params: AuthorAPI.Request_AddAuthor,
  options?: { [key: string]: any },
) {
  return request<AuthorAPI.Result_AddAuthor>("/api/cms/author", {
    method: "POST",
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 新增作者
 */
export async function modifyAuthor(
  params: AuthorAPI.Request_ModifyAuthor,
  options?: { [key: string]: any },
) {
  return request<AuthorAPI.Result_ModifyAuthor>("/api/cms/author", {
    method: "PUT",
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 删除作者
 */
export async function deleteAuthor(
  params: AuthorAPI.Request_DeleteAuthor,
  options?: { [key: string]: any },
) {
  return request<AuthorAPI.Result_DeleteAuthor>("/api/cms/author", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
