declare namespace CategoryAPI {
  // 类别数据结构
  interface CategoryInfo {
    id: number;
    name: string;
    url: string;
    labels: TagInfo[];
  }

  // 标签数据结构
  interface TagInfo {
    id: number;
    label: string;
    category?: CategoryInfo;
  }

  /**
   * @Description: 响应结果封装
   */
  interface Result__<T> {
    code: number;
    msg: string;
    data: T;
  }

  /* 分页查询 */
  interface PageInfo_CategoryInfo__ {
    list: CategoryInfo[];
    total: number;
  }
  type Request_PageInfo_CategoryInfo = {
    page: number;
    size: number;
  };
  type Result_PageInfo_CategoryInfo = Result__<PageInfo_CategoryInfo__>;

  /* 新增类别 */
  type Request_AddCategory = {
    name: string;
    url: string;
    labels: string[];
  };
  type Result_AddCategoy = Result__<{ id: string }>;

  /* 修改类别 */
  type Request_ModifyCategory = {
    id: number;
    name: string;
    url: string;
    labels: string[];
  };
  type Result_ModifyCategory = Result__<null>;

  /* 删除类别 */
  type Request_DeleteCategory = {
    id: string;
  };
  type Result_DeleteCategory = Result__<null>;
}
