declare namespace AdvertisementInfoAPI {
  interface Result_PageInfo_AdvertisementInfo {
    code?: number;
    msg?: string;
    data: PageInfo_AdvertisementInfo;
  }
  interface Result_AdvertisementInfo {
    code?: number;
    msg?: string;
    data: {
      advertisement: AdvertisementInfo;
    };
  }
  interface Result {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  }
  interface PageInfo_AdvertisementInfo {
    total?: number;
    list: Array<AdvertisementInfo>;
  }
  interface AdvertisementInfo {
    id: number;
    title: string;
    time: string;
    content: string;
    image: string;
    author_id: number;
    author: AuthorAPI.AuthorInfo;
    view_count: number;
    like_count: number;
    comment_count: number;
  }
  interface AdvertisementInfoVO {
    title?: string;
    content?: string;
    image?: string;
  }
  interface PageInfo_AdvertisementInfoVO {
    page: number;
    size: number;
    title: string;
  }
}
