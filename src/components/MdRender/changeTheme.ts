export const changeTheme: (style: string) => void = (style) => {
  let styleDOM = document.head.querySelector(".md-theme");
  if (!styleDOM) {
    styleDOM = document.createElement("style");
    styleDOM.className = "md-theme";
  }
  styleDOM.innerHTML = style;
  document.head.appendChild(styleDOM);
};
