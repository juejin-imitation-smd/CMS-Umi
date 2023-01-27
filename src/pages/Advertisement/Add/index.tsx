import React, { useState } from "react";
import { useNavigate } from "@umijs/max";
import { Rule } from "antd/es/form";
import { now } from "@/utils/format";
import { Button, message } from "antd";
import {
  PageContainer,
  ProForm,
  ProFormText,
} from "@ant-design/pro-components";
import { MdEditor } from "@/components/MdRender";
import services from "@/services";
import style from "./index.module.less";

const { addAdvertisement } = services.AdvertisementController;

const rules: Rule[] = [{ required: true }];

const AddAdvertisement: React.FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [content, setContent] = useState<string>("");

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
          <ProFormText label="标题" name="title" rules={rules} />
          <ProFormText label="图片地址" name="image" />
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
