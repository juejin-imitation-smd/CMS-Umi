import { request } from "@umijs/max";
// 获取文章列表
export async function queryArticleList(
  params: {
    page: number;
    size: number;
    title: string;
  },
  options?: { [key: string]: any },
) {
  return request<ArticleAPI.Result_PageInfo_ArticleInfo>(
    "/api/cms/getArticles",
    {
      method: "GET",
      params: { ...params },
      ...(options || {}),
    },
  );
}

// 获取指定文章内容
export async function getArticleDetail(
  params: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<ArticleAPI.Result_ArticleInfo>("/api/cms/article", {
    method: "GET",
    params: { ...params },
    ...(options || {}),
  });
}

// 新建文章
export async function addArticle(
  body: ArticleAPI.ArticleInfoVO,
  options?: { [key: string]: any },
) {
  return request<ArticleAPI.Result_PageInfo_ArticleInfo>("/api/cms/article", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

// 修改文章
export async function modifyArticle(
  body: ArticleAPI.ArticleInfo,
  options?: { [key: string]: any },
) {
  return request<ArticleAPI.Result_PageInfo_ArticleInfo>("/api/cms/article", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

// 删除文章
export async function deleteArticle(
  params: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<ArticleAPI.Result_PageInfo_ArticleInfo>("/api/cms/article", {
    method: "DELETE",
    params: { ...params },
    ...(options || {}),
  });
}

// 获取分类和标签
export async function queryLabel(options?: { [key: string]: any }) {
  return request<ArticleAPI.Result_PageInfo_LabelInfo>("/api/cms/column", {
    method: "GET",
    params: {
      page: "",
      size: "",
    },
    ...(options || {}),
  });
}
