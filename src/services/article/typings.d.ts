declare namespace ArticleAPI {
  interface Result_PageInfo_ArticleInfo {
    code: number;
    msg: string;
    data: PageInfo_ArticleInfo;
  }
  interface PageInfo_ArticleInfo {
    total: number;
    list: Array<ArticleInfo>;
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
    view_count: number;
    like_count: number;
    comment_count: number;
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
