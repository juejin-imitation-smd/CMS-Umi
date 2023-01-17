import { defineConfig } from "@umijs/max";
import routes from "./routes";

export default defineConfig({
  /* 打包配置 */
  // base需为服务器分配的前置路由名称
  base: "/umi-cms/",
  publicPath: "./",

  /* 插件模块 */
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "@umijs/max",
  },
  routes,
  npmClient: "pnpm",
});
