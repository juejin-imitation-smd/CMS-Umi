import { request } from "@umijs/max";
// 获取广告列表
export async function queryAdvertisementList(
  params: {
    page: number;
    size: number;
  },
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_PageInfo_AdvertisementInfo>(
    "/api/cms/getAdvertisements",
    {
      method: "GET",
      params: { ...params },
      ...(options || {}),
    },
  );
}

// 获取指定广告内容
export async function getAdvertisementDetail(
  params: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_PageInfo_AdvertisementInfo>(
    "/api/cms/advertisement",
    {
      method: "GET",
      params: { ...params },
      ...(options || {}),
    },
  );
}

// 新建广告
export async function addAdvertisement(
  body: AdvertisementInfoAPI.AdvertisementInfoVO,
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_PageInfo_AdvertisementInfo>(
    "/api/cms/advertisement",
    {
      method: "POST",
      data: body,
      ...(options || {}),
    },
  );
}

// 修改广告
export async function modifyAdvertisement(
  body: ArticleAPI.ArticleInfo,
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_PageInfo_AdvertisementInfo>(
    "/api/cms/advertisement",
    {
      method: "PUT",
      data: body,
      ...(options || {}),
    },
  );
}

// 删除广告
export async function deleteAdvertisement(
  params: {
    id: number;
  },
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_PageInfo_AdvertisementInfo>(
    "/api/cms/advertisement",
    {
      method: "DELETE",
      params: { ...params },
      ...(options || {}),
    },
  );
}
