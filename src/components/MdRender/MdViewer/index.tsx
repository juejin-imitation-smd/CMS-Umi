import { BytemdPlugin } from "bytemd";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import theme from "../plugin-theme";
import { Viewer } from "@bytemd/react";

interface Props {
  value: string;
  themeName: string;
}

/**
 * md编辑器组件
 */
const MdViewer: React.FC<Props> = ({ value, themeName }) => {
  const plugins: Array<BytemdPlugin> = [
    frontmatter(),
    gemoji(),
    theme(themeName),
  ];

  return <Viewer value={value} plugins={plugins} />;
};

export default MdViewer;
