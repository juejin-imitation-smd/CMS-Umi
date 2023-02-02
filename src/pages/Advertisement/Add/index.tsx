import React, { useState } from "react";
import { useNavigate } from "@umijs/max";
import { Rule } from "antd/es/form";
import { now } from "@/utils/format";
import { getAuthors } from "@/pages/Article/index";
import { Button, message, UploadFile } from "antd";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { MdEditor } from "@/components/MdRender";
import services from "@/services";
import style from "./index.module.less";

const { addAdvertisement } = services.AdvertisementController;
const { uploadFile } = services.FileController;

const authorOption = await getAuthors();

const rules: Rule[] = [{ required: true }];

const AddAdvertisement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [content, setContent] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      let image = "";
      if (fileList.length > 0) {
        if (fileList[0] instanceof File) {
          const { data } = await uploadFile(fileList[0]);
          image = data.path;
        }
      }
      const body = {
        ...values,
        content,
        image,
        time: now(),
        view_count: 0,
        like_count: 0,
        comment_count: 0,
      };
      await addAdvertisement(body);
      message.success("提交成功");
      navigate("/advertisement");
    });
  };

  return (
    <PageContainer
      header={{
        title: "创建广告",
        extra: [
          <Button
            key="1"
            onClick={() => {
              navigate("/advertisement");
            }}
          >
            返回
          </Button>,
        ],
      }}
      content={
        <ProForm form={form} grid submitter={{ render: () => null }}>
          <ProFormText
            colProps={{ md: 12, xl: 12 }}
            label="标题"
            name="title"
            rules={rules}
          />
          <ProFormSelect
            colProps={{ md: 12, xl: 12 }}
            label="作者"
            name="author_id"
            rules={rules}
            fieldProps={{
              options: authorOption,
            }}
          />
          <ProFormUploadButton
            title="选择封面"
            max={1}
            fieldProps={{
              fileList: fileList,
              listType: "picture-card",
              beforeUpload(file, list) {
                const isJpgOrPng =
                  file.type === "image/jpeg" || file.type === "image/png";
                if (!isJpgOrPng) {
                  message.error("请选择 JPG/PNG 格式的文件!");
                  return false;
                }
                setFileList(list);
                return false;
              },
              onRemove() {
                setFileList([]);
              },
            }}
          />
        </ProForm>
      }
    >
      <div className={style.content} style={{ paddingBottom: 10 }}>
        广告内容
      </div>
      <MdEditor
        value={content}
        onChange={(v) => {
          setContent(v);
        }}
      />
      <Button type="primary" onClick={onSubmit} style={{ marginTop: 10 }}>
        提交
      </Button>
    </PageContainer>
  );
};

export default AddAdvertisement;
