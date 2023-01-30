import { BytemdPlugin } from "bytemd";
import frontmatter from "@bytemd/plugin-frontmatter";
import image from "../plugin-image";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import theme from "../plugin-theme";
import mermaid from "@bytemd/plugin-mermaid";
import { Editor } from "@bytemd/react";

import zhHans from "bytemd/locales/zh_Hans.json";

const plugins: Array<BytemdPlugin> = [
  frontmatter(),
  gemoji(),
  image(),
  gfm(),
  theme(),
  mermaid(),
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

/**
 * md编辑器组件
 */
const MdEditor: React.FC<Props> = (props) => {
  return <Editor {...props} plugins={plugins} locale={zhHans} />;
};

export default MdEditor;
