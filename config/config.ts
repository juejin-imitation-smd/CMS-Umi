import { defineConfig } from "@umijs/max";
import routes from "./routes";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "@JueJin/CMS",
  },
  routes,
  npmClient: "pnpm",
  proxy: {
    "/proxy": {
      target: "http://47.96.134.75:3000/",
      changeOrigin: true,
      pathRewrite: { "^/proxy": "" },
    },
  },
});
