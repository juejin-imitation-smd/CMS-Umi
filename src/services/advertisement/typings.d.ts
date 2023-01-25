declare namespace AdvertisementInfoAPI {
  interface Result_PageInfo_AdvertisementInfo {
    code?: number;
    msg?: string;
    data: PageInfo_AdvertisementInfo;
  }
  interface Result_AdvertisementInfo {
    code?: number;
    msg?: string;
    data: AdvertisementInfo;
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
    content: string;
    image: string;
  }
  interface AdvertisementInfoVO {
    title?: string;
    content?: string;
    image?: string;
  }
  interface PageInfo_AdvertisementInfoVO {
    page?: number;
    size?: number;
    query?: {
      title?: string;
      content?: string;
    };
  }
}
