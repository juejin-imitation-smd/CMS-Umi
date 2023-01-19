import { request } from "@umijs/max";
// 获取广告列表
export async function getAdvertisements(
  body: AdvertisementInfoAPI.PageInfo_AdvertisementInfoVO,
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_PageInfo_AdvertisementInfo>(
    "/getAdvertisements",
    {
      method: "GET",
      data: body,
      ...(options || {}),
    },
  );
}

// 获取指定广告信息
export async function advertisement(
  id: number,
  options?: { [key: string]: any },
) {
  return request<AdvertisementInfoAPI.Result_AdvertisementInfo>(
    "/advertisement",
    {
      method: "GET",
      params: { id },
      ...(options || {}),
    },
  );
}

// 新建广告
export async function addAdvertisement(
  body: AdvertisementInfoAPI.AdvertisementInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result>("/advertisement", {
    method: "POST",
    data: body,
    ...(options || {}),
  });
}

// 修改广告
export async function modifyAdvertisement(
  body: AdvertisementInfoAPI.AdvertisementInfo,
  options?: { [key: string]: any },
) {
  return request<API.Result>("/advertisement", {
    method: "PUT",
    data: body,
    ...(options || {}),
  });
}

// 删除广告
export async function deleteAdvertisement(
  id: number,
  options?: { [key: string]: any },
) {
  return request<API.Result>("/advertisement", {
    method: "DEL",
    params: { id },
    ...(options || {}),
  });
}
