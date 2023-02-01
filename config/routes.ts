const routes = [
  {
    path: "/login",
    component: "./Login",
    hideInMenu: true,
    menuRender: false,
  },
  {
    path: "/register",
    component: "./Register",
    hideInMenu: true,
    menuRender: false,
  },
  { path: "/", redirect: "/home" },
  {
    name: "首页",
    path: "/home",
    component: "./Home",
    icon: "Home",
  },
  {
    name: "文章管理",
    path: "/article",
    component: "./Article",
    icon: "Highlight",
  },
  {
    name: "添加文章",
    path: "/article/add",
    component: "./Article/Add",
    hideInMenu: true,
    menuRender: false,
  },
  {
    name: "编辑文章",
    path: "/article/edit/:id",
    component: "./Article/Edit",
    hideInMenu: true,
    menuRender: false,
  },
  {
    name: "广告管理",
    path: "/advertisement",
    component: "./Advertisement",
    icon: "Snippets",
  },
  {
    name: "添加广告",
    path: "/advertisement/add",
    component: "./Advertisement/Add",
    hideInMenu: true,
    menuRender: false,
  },
  {
    name: "编辑广告",
    path: "/advertisement/edit/:id",
    component: "./Advertisement/Edit",
    hideInMenu: true,
    menuRender: false,
  },
  {
    name: "作者管理",
    path: "/author",
    component: "./Author",
    icon: "User",
  },
  {
    name: "类别标签管理",
    path: "/category",
    component: "./Category",
    icon: "Tags",
  },
  {
    name: "首页路由管理",
    path: "/route",
    component: "./Route",
    icon: "Link",
  },
  {
    name: "404",
    path: "/*",
    component: "./NotFound",
    hideInMenu: true,
  },
];

export default routes;
