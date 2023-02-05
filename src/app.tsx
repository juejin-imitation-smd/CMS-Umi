import { RunTimeLayoutConfig, RequestConfig } from "@umijs/max";
import { Route } from "antd/es/breadcrumb/Breadcrumb";
import { ProBreadcrumb } from "@ant-design/pro-components";
import { message } from "antd";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "/proxy"
    : "http://47.96.134.75:3000";

// 与后端约定的响应数据格式
interface ResponseStructure {
  statusCode: number;
  message: string;
}

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
    logout: () => {
      if (sessionStorage.getItem("userInfo")) {
        sessionStorage.setItem("userInfo", "");
        window.location.href = "/login";
      }
    },

    /* 面包屑配置 */
    breadcrumbRender: (routes: Route[] = []) => {
      return routes;
    },
    headerContentRender: () => <ProBreadcrumb />,
  };
};

export const request: RequestConfig = {
  // 统一的请求设定
  baseURL,
  timeout: 7000,
  headers: { "X-Requested-With": "XMLHttpRequest" },

  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { statusCode, message } = res;
      if (statusCode) {
        const error: any = new Error(message);
        error.name = "BizError";
        error.info = { message };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === "BizError") {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { message: errorMsg } = errorInfo;
          message.error(errorMsg);
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(error.response.data.message);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error("未响应! 请重试");
      } else {
        // 发送请求时出了点问题
        message.error("请求出错, 请重试.");
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [],

  // 响应拦截器
  responseInterceptors: [],
};
