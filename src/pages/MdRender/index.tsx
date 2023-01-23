import React, { useState } from "react";
import { MdEditor, MdViewer } from "@/components/MdRender";

/**
 * md渲染器组件用例页面
 */
const AdvertisementList: React.FC<unknown> = () => {
  const [value, setValue] = useState<string>("");
  const themeName = "juejin";

  return (
    <>
      <MdEditor
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <MdViewer value={value} themeName={themeName} />
    </>
  );
};

export default AdvertisementList;
