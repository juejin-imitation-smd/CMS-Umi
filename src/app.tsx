import { RunTimeLayoutConfig, RequestConfig } from "@umijs/max";
import { Route } from "antd/es/breadcrumb/Breadcrumb";
import { ProBreadcrumb } from "@ant-design/pro-components";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "/proxy"
    : "http://47.96.134.75:3000";

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: "JueJin/CMS" };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg",
    menu: {
      locale: false,
    },

    /* 面包屑配置 */
    breadcrumbRender: (routes: Route[] = []) => {
      return routes;
    },
    headerContentRender: () => <ProBreadcrumb />,
  };
};

export const request: RequestConfig = {
  baseURL,
  timeout: 5000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [],
};
