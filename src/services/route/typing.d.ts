declare namespace RouteAPI {
  // 路由数据结构
  interface RouteInfo {
    id: number;
    url: string;
    name: string;
    label?: string;
  }

  /**
   * @Description: 响应结果封装
   */
  interface Result__<T> {
    code: number;
    msg: string;
    data: T;
  }

  /* 查询路由 */
  type Result_CheckRoute = Result__<{
    list: RouteInfo[];
  }>;

  /* 新增路由 */
  type Request_AddRoute = {
    url: string;
    name: string;
    label?: string;
  };
  type Result_AddRoute = Result__<{ id: number }>;

  /* 修改路由 */
  type Request_ModifyRoute = RouteInfo;
  type Result_ModifyRoute = Result__<null>;

  /* 删除路由 */
  type Request_DeleteRoute = {
    id: number;
  };
  type Result_DeleteRoute = Result__<null>;
}
