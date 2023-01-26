const categories = [
  {
    id: 58,
    name: "综合",
    url: "",
    labels: [],
  },
  {
    id: 59,
    name: "关注",
    url: "following",
    labels: [],
  },
  {
    id: 60,
    name: "后端",
    url: "backend",
    labels: [
      {
        id: 3,
        label: "Redis",
      },
      {
        id: 4,
        label: "算法",
      },
      {
        id: 5,
        label: "Spring",
      },
      {
        id: 9,
        label: "Java",
      },
      {
        id: 10,
        label: "Go",
      },
      {
        id: 11,
        label: "架构",
      },
      {
        id: 12,
        label: "数据库",
      },
      {
        id: 13,
        label: "Spring Boot",
      },
      {
        id: 15,
        label: "MySQL",
      },
    ],
  },
  {
    id: 61,
    name: "前端",
    url: "frontend",
    labels: [
      {
        id: 1,
        label: "全部",
      },
      {
        id: 2,
        label: "面试",
      },
      {
        id: 6,
        label: "后端",
      },
      {
        id: 7,
        label: "掘金·金石计划",
      },
      {
        id: 8,
        label: "掘金·日新计划",
      },
      {
        id: 14,
        label: "Kubernetes",
      },
      {
        id: 16,
        label: "Elasticsearch",
      },
      {
        id: 17,
        label: "前端",
      },
      {
        id: 18,
        label: "Vue.js",
      },
      {
        id: 19,
        label: "React.js",
      },
      {
        id: 20,
        label: "CSS",
      },
      {
        id: 21,
        label: "Node.js",
      },
      {
        id: 22,
        label: "源码阅读",
      },
      {
        id: 23,
        label: "Flutter",
      },
      {
        id: 24,
        label: "Webpack",
      },
      {
        id: 25,
        label: "TypeScript",
      },
      {
        id: 26,
        label: "微信小程序",
      },
    ],
  },
  {
    id: 70,
    name: "阅读",
    url: "article",
    labels: [],
  },
  {
    id: 80,
    name: "代码人生",
    url: "career",
    labels: [],
  },
  {
    id: 81,
    name: "开发工具",
    url: "career",
    labels: [],
  },
  {
    id: 82,
    name: "人工智能",
    url: "ai",
    labels: [],
  },
];

export default {
  "GET api/cms/column": (req: any, res: any) => {
    res.json({
      code: 200,
      msg: "ok",
      data: {
        list: categories,
        total: 8,
      },
    });
  },
};
