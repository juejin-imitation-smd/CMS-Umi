const advertisements = [
  {
    id: 0,
    title: "复习前端：前端安全",
    content:
      "书任可通府下利便多集具更先参计火。回周正也维为设我系高自就近车住回至。亲两火就再南口造些为组每知型。满文为切真些元干转处状办至给术气。则在志山消力由日个前象商热始则。象取海路建国广进真华价叫六科机拉不。",
    image:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad2e4d8fa38a4c8384def5cfe22adc70~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?",
  },
  {
    id: 1,
    title: "复习前端：前端安全",
    content:
      "书任可通府下利便多集具更先参计火。回周正也维为设我系高自就近车住回至。亲两火就再南口造些为组每知型。满文为切真些元干转处状办至给术气。则在志山消力由日个前象商热始则。象取海路建国广进真华价叫六科机拉不。",
    image:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad2e4d8fa38a4c8384def5cfe22adc70~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?",
  },
  {
    id: 2,
    title: "复习前端：前端安全",
    content:
      "书任可通府下利便多集具更先参计火。回周正也维为设我系高自就近车住回至。亲两火就再南口造些为组每知型。满文为切真些元干转处状办至给术气。则在志山消力由日个前象商热始则。象取海路建国广进真华价叫六科机拉不。",
    image:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad2e4d8fa38a4c8384def5cfe22adc70~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?",
  },
  {
    id: 3,
    title: "复习前端：前端安全",
    content:
      "书任可通府下利便多集具更先参计火。回周正也维为设我系高自就近车住回至。亲两火就再南口造些为组每知型。满文为切真些元干转处状办至给术气。则在志山消力由日个前象商热始则。象取海路建国广进真华价叫六科机拉不。",
    image:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad2e4d8fa38a4c8384def5cfe22adc70~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?",
  },
  {
    id: 4,
    title: "复习前端：前端安全",
    content:
      "书任可通府下利便多集具更先参计火。回周正也维为设我系高自就近车住回至。亲两火就再南口造些为组每知型。满文为切真些元干转处状办至给术气。则在志山消力由日个前象商热始则。象取海路建国广进真华价叫六科机拉不。",
    image:
      "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad2e4d8fa38a4c8384def5cfe22adc70~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?",
  },
];

export default {
  "GET /api/cms/getAdvertisements": (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: advertisements, total: 20 },
      errorCode: 0,
    });
  },
  "GET /api/cms/advertisement": (req: any, res: any) => {
    res.json({
      success: true,
      data: advertisements[0],
      errorCode: 0,
    });
  },
  "POST /api/cms/advertisement": (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  "PUT /api/cms/advertisement": (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  "DELETE /api/cms/advertisement": (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
