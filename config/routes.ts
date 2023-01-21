const routes = [
  {
    path: "/login",
    component: "./Login",
    hideInMenu: true,
    menuRender: false,
  },
  { path: "/", redirect: "/home" },
  {
    name: "首页",
    path: "/home",
    component: "./Home",
    icon: "HomeFilled",
    routes: [
      {
        name: "首页-子路由",
        path: "/home/404",
        component: "./NotFound",
      },
    ],
  },
  {
    name: "权限演示",
    path: "/access",
    component: "./Access",
    access: "canReadPageA",
  },
  {
    name: " CRUD 示例",
    path: "/table",
    component: "./Table",
  },
  {
    name: "作者模块",
    path: "/author",
    component: "./Author",
    icon: "User",
  },
  {
    name: "404",
    path: "/*",
    component: "./NotFound",
    hideInMenu: true,
  },
];

export default routes;
