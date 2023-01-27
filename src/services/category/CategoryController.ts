import { request } from "@umijs/max";

/**
 * @Description: 分页查询
 */
export async function queryCategoryList(
  params: CategoryAPI.Request_PageInfo_CategoryInfo,
  options?: { [key: string]: any },
) {
  return request<CategoryAPI.Result_PageInfo_CategoryInfo>("/api/cms/column", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 新增类别
 */
export async function addCategory(
  params: CategoryAPI.Request_AddCategory,
  options?: { [key: string]: any },
) {
  return request<CategoryAPI.Result_AddCategoy>("/api/cms/column", {
    method: "POST",
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 修改类别
 */
export async function modifyCategory(
  params: CategoryAPI.Request_ModifyCategory,
  options?: { [key: string]: any },
) {
  return request<CategoryAPI.Result_ModifyCategory>("/api/cms/column", {
    method: "PUT",
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 删除类别
 */
export async function deleteCategory(
  params: CategoryAPI.Request_DeleteCategory,
  options?: { [key: string]: any },
) {
  return request<CategoryAPI.Result_DeleteCategory>("/api/cms/column", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
