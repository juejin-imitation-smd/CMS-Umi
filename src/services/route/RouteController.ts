import { request } from "@umijs/max";

/**
 * @Description: 查询路由
 */
export async function queryRouteList(
  params: null,
  options?: { [key: string]: any },
) {
  return request<RouteAPI.Result_CheckRoute>("/api/cms/route", {
    method: "GET",
    ...(options || {}),
  });
}

/**
 * @Description: 新增路由
 */
export async function addRoute(
  params: RouteAPI.Request_AddRoute,
  options?: { [key: string]: any },
) {
  return request<RouteAPI.Result_AddRoute>("/api/cms/route", {
    method: "POST",
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 新增路由
 */
export async function modifyRoute(
  params: RouteAPI.Request_ModifyRoute,
  options?: { [key: string]: any },
) {
  return request<RouteAPI.Result_ModifyRoute>("/api/cms/route", {
    method: "PUT",
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * @Description: 删除路由
 */
export async function deleteRoute(
  params: RouteAPI.Request_DeleteRoute,
  options?: { [key: string]: any },
) {
  return request<RouteAPI.Result_DeleteRoute>("/api/cms/route", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
