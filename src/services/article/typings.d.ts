declare namespace ArticleAPI {
  interface Result_PageInfo_AuthorInfo {
    code: number;
    msg: string;
    data: PageInfo_AuthorInfo;
  }
  interface PageInfo_AuthorInfo {
    total: number;
    list: Array<AuthorInfo>;
  }
  interface Result_PageInfo_LabelInfo {
    code: number;
    msg: string;
    data: PageInfo_LabelInfo;
  }
  interface PageInfo_LabelInfo {
    total: number;
    list: Array<LabelInfo>;
  }
  interface Result_PageInfo_ArticleInfo {
    code: number;
    msg: string;
    data: PageInfo_ArticleInfo;
  }
  interface PageInfo_ArticleInfo {
    total: number;
    list: Array<ArticleInfo>;
  }
  interface Result_ArticleInfo {
    code: number;
    msg: string;
    data: {
      article: ArticleInfo;
    };
  }
  interface ArticleInfo {
    id: number;
    title: string;
    time: string;
    label: string;
    sub_tabs: Array<string>;
    content: string;
    image: string;
    author_id: number;
    author: AuthorAPI.AuthorInfo;
    view_count: number;
    like_count: number;
    comment_count: number;
  }
  interface LabelInfo {
    id: number;
    name: string;
    url: string;
    labels: Array<SubTabsInfo>;
  }
  interface SubTabsInfo {
    id: number;
    label: string;
  }
  interface AuthorInfo {
    id: number;
    article_count: number;
    avatar: string;
    description: string;
    username: string;
  }
  interface ArticleInfoVO {
    author_id: number;
    title: string;
    time: string;
    label: string;
    sub_tabs: Array<string>;
    content: string;
    image: string;
    view_count: number;
    like_count: number;
    comment_count: number;
  }
  // interface PageInfo_ArticleInfoVO {
  //   page: number;
  //   size: number;
  // }
}
