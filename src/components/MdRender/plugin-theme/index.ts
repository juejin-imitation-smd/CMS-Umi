import type { BytemdPlugin } from "bytemd";
import { icon } from "./icon";
import { styles } from "./styles";

export const changeThemeStyle: (style: string) => void = (style) => {
  let styleDOM = document.head.querySelector(".md-theme");
  if (!styleDOM) {
    styleDOM = document.createElement("style");
    styleDOM.className = "md-theme";
  }
  styleDOM.innerHTML = style;
  document.head.appendChild(styleDOM);
};

interface Props {
  themeName: string;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * 主题切换插件
 */
export default function theme({
  themeName,
  setThemeName,
}: Props): BytemdPlugin {
  changeThemeStyle(styles[themeName].style);

  const actionItems = Object.entries(styles).map((item) => {
    const [key, value] = item;
    return {
      title: key,
      style: value.style,
    };
  });

  return {
    actions: [
      {
        title: "Markdown 主题",
        icon,
        handler: {
          type: "dropdown",
          actions: actionItems.map(({ title, style }) => ({
            title,
            handler: {
              type: "action",
              click({}) {
                setThemeName(title);
                changeThemeStyle(style);
              },
            },
          })),
        },
      },
    ],
  };
}
