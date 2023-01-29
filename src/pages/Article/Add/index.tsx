import React, { useState } from "react";
import { useNavigate } from "@umijs/max";
import { Rule } from "antd/es/form";
import { now } from "@/utils/format";
import { DefaultOptionType } from "antd/es/select";
import { getLabelAndSubTab, getAuthors } from "../index";
import { Button, message } from "antd";
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

const { addArticle } = services.ArticleController;
const { uploadFile } = services.FileController;

const labelOptions = await getLabelAndSubTab();
const authorOption = await getAuthors();

const rules: Rule[] = [{ required: true }];

const AddArticle: React.FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [content, setContent] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [subTabOption, setSubTabOption] = useState<DefaultOptionType[]>([]);

  const labelChange = (value: number) => {
    labelOptions.forEach(({ label, labels }) => {
      if (label === value) {
        const temp: DefaultOptionType[] = [];
        labels.forEach(({ label }) => {
          temp.push({ label, value: label });
        });
        setSubTabOption(temp);
      }
    });
  };
  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      let image = "";
      if (coverFile !== null) {
        const { data } = await uploadFile(coverFile);
        image = data.path;
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
      await addArticle(body);
      message.success("提交成功");
      navigate("/article");
    });
  };

  return (
    <PageContainer
      header={{
        title: "创建文章",
        extra: [
          <Button
            key="1"
            onClick={() => {
              navigate("/article");
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
          <ProFormSelect
            colProps={{ md: 12, xl: 12 }}
            label="分类"
            name="label"
            rules={rules}
            fieldProps={{
              options: labelOptions as DefaultOptionType[],
              onChange: labelChange,
            }}
          />
          <ProFormSelect
            mode="tags"
            colProps={{ md: 12, xl: 12 }}
            label="标签"
            name="sub_tabs"
            rules={rules}
            fieldProps={{
              options: subTabOption,
            }}
          />
          <ProFormUploadButton
            title="选择封面"
            max={1}
            fieldProps={{
              listType: "picture-card",
              beforeUpload(file) {
                const isJpgOrPng =
                  file.type === "image/jpeg" || file.type === "image/png";
                if (!isJpgOrPng) {
                  message.error("请选择 JPG/PNG 格式的文件!");
                }
                setCoverFile(file);
                return false;
              },
              onRemove() {
                setCoverFile(null);
              },
            }}
          />
        </ProForm>
      }
    >
      <div className={style.content} style={{ paddingBottom: 10 }}>
        文章内容
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

export default AddArticle;
