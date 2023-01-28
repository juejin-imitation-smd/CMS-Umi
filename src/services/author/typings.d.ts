declare namespace AuthorAPI {
  // 作者数据结构
  interface AuthorInfo {
    id: number;
    username: string;
    description: string;
    avatar: string;
    article_count: number;
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
  interface PageInfo_AuthorInfo__ {
    list: AuthorInfo[];
    total: number;
  }
  type Request_PageInfo_AuthorInfo = {
    size: number;
    page: number;
    username?: string;
  };
  type Result_PageInfo_AuthorInfo = {
    code: number;
    msg: string;
    data: {
      total: number;
      list: AuthorInfo[];
    };
  };

  /* 新增作者 */
  type Request_AddAuthor = {
    username: string;
    description: string;
    avatar: string;
    article_count: number;
  };
  type Result_AddAuthor = Result__<{ id: number }>;

  /* 修改作者 */
  type Request_ModifyAuthor = AuthorInfo;
  type Result_ModifyAuthor = Result__<null>;

  /* 删除作者 */
  type Request_DeleteAuthor = {
    id: number;
  };
  type Result_DeleteAuthor = Result__<null>;
}
