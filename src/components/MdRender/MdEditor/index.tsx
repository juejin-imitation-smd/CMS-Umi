import { BytemdPlugin } from "bytemd";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import theme from "../plugin-theme";
import { Editor } from "@bytemd/react";

import zhHans from "bytemd/locales/zh_Hans.json";

const plugins: Array<BytemdPlugin> = [frontmatter(), gemoji(), theme()];

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
