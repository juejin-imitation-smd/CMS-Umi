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
  }

  /**
   * @Description: 响应结果封装
   */
  interface Result__<T> {
    code: number;
    msg: string;
    data: T;
  }

  // 分页查询
  interface PageInfo_CategoryInfo__ {
    list: CategoryInfo[];
    total: number;
  }
  /**
   * @Description: 分页查询响应结果
   */
  type Result_PageInfo_CategoryInfo__ = Result__<PageInfo_CategoryInfo__>;
}
