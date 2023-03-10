import type { BytemdPlugin } from "bytemd";
import { icon } from "./icon";
import { message } from "antd";
import services from "@/services";

const { uploadFile } = services.FileController;

/**
 * 图片插件
 */
export default function image(): BytemdPlugin {
  return {
    actions: [
      {
        title: "image",
        icon,
        handler: {
          type: "action",
          click({ editor, appendBlock, codemirror }) {
            const imageInput = document.createElement("input");
            imageInput.type = "file";
            imageInput.onchange = function (e) {
              // @ts-ignore
              const file = e.target?.files[0];
              const isJpgOrPng =
                file.type === "image/jpeg" || file.type === "image/png";
              if (!isJpgOrPng) {
                message.error("请选择 JPG/PNG 格式的文件!");
                return false;
              }
              // 上传图片获取wepb地址
              uploadFile(file).then((res) => {
                const path = res.data.path;
                const { line } = appendBlock(`![image.png](${path})`);
                editor.setSelection(codemirror.Pos(line + 1, 0));
                editor.focus();
              });
            };
            imageInput.click();
          },
        },
      },
    ],
  };
}
