import React, { useState } from "react";
import { useNavigate } from "@umijs/max";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { getLabelAndSubTab, getAuthors } from "../index";
import { Button, message, UploadFile } from "antd";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormUploadButton,
  ProFormDateTimePicker,
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
  const [theme, setTheme] = useState<string>("juejin");

  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
      if (fileList.length > 0) {
        if (fileList[0] instanceof File) {
          const { data } = await uploadFile(fileList[0]);
          image = data.path;
        }
      }
      const body = {
        ...values,
        content,
        theme,
        image,
        time: +values.time.format("x"),
        view_count: 0,
        like_count: 0,
        comment_count: 0,
      };
      await addArticle(body);
      message.success("ζδΊ€ζε");
      navigate("/article");
    });
  };

  return (
    <PageContainer
      header={{
        title: "εε»Ίζη« ",
        extra: [
          <Button
            key="1"
            onClick={() => {
              navigate("/article");
            }}
          >
            θΏε
          </Button>,
        ],
      }}
      content={
        <ProForm form={form} grid submitter={{ render: () => null }}>
          <ProFormText
            colProps={{ md: 12, xl: 12 }}
            label="ζ ι’"
            name="title"
            rules={rules}
          />
          <ProFormSelect
            colProps={{ md: 12, xl: 12 }}
            label="δ½θ"
            name="author_id"
            rules={rules}
            fieldProps={{
              options: authorOption,
            }}
          />
          <ProFormSelect
            colProps={{ md: 12, xl: 12 }}
            label="εη±»"
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
            label="ζ η­Ύ"
            name="sub_tabs"
            rules={rules}
            fieldProps={{
              options: subTabOption,
            }}
          />
          <ProFormUploadButton
            title="ιζ©ε°ι’"
            max={1}
            fieldProps={{
              fileList: fileList,
              listType: "picture-card",
              beforeUpload(file, list) {
                const isJpgOrPng =
                  file.type === "image/jpeg" || file.type === "image/png";
                if (!isJpgOrPng) {
                  message.error("θ―·ιζ© JPG/PNG ζ ΌεΌηζδ»Ά!");
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
          <ProFormDateTimePicker
            label="εεΈζΆι΄"
            name="time"
            rules={rules}
            fieldProps={{
              format: (value) => value.format("YYYY-MM-DD HH:mm:ss"),
            }}
          />
        </ProForm>
      }
    >
      <div className={style.content} style={{ paddingBottom: 10 }}>
        ζη« εε?Ή
      </div>
      <MdEditor
        value={content}
        onChange={(v) => {
          setContent(v);
        }}
        themeName={theme}
        setThemeName={setTheme}
      />
      <Button type="primary" onClick={onSubmit} style={{ marginTop: 10 }}>
        ζδΊ€
      </Button>
    </PageContainer>
  );
};

export default AddArticle;
