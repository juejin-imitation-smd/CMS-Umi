declare namespace AuthorAPI {
  interface AuthorInfo {
    uid: string;
    usernme: string;
    description: string;
    avatar: string;
    article_count: number;
  }

  interface Result_PageInfo_AuthorInfo__ {
    code: number;
    msg: string;
    data: {
      total: number;
      list: AuthorInfo[];
    };
  }
}
