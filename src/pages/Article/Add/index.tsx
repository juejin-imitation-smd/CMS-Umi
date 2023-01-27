import React, { useState } from "react";
import { useNavigate } from "@umijs/max";
import { Rule } from "antd/es/form";
import { now } from "@/utils/format";
import { DefaultOptionType } from "antd/es/select";
import { getLabelAndSubTab } from "../index";
import { Button, message } from "antd";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-components";
import { MdEditor } from "@/components/MdRender";
import services from "@/services";
import style from "./index.module.less";

const { addArticle } = services.ArticleController;

const labelOptions = await getLabelAndSubTab();

const rules: Rule[] = [{ required: true }];

const AddArticle: React.FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [content, setContent] = useState<string>("");
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
    // TODO：作者id
    form.validateFields().then(async (values) => {
      const body = {
        ...values,
        author_id: 2,
        content,
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
          <ProFormText label="标题" name="title" rules={rules} />
          <ProFormSelect
            colProps={{ md: 12, xl: 12 }}
            label="分类"
            name="label"
            rules={rules}
            onMetaChange={(v) => {
              console.log(v);
            }}
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
          <ProFormText label="图片地址" name="image" />
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
