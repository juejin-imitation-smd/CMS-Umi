import React, { useState } from "react";
import { useNavigate, useParams } from "@umijs/max";
import { Rule } from "antd/es/form";
import { Button, message } from "antd";
import {
  PageContainer,
  ProForm,
  ProFormText,
  ProFormDigit,
} from "@ant-design/pro-components";
import { MdEditor } from "@/components/MdRender";
import services from "@/services";
import style from "./index.module.less";

const { modifyAdvertisement, getAdvertisementDetail } =
  services.AdvertisementController;

const rules: Rule[] = [{ required: true }];

const EditArticle: React.FC = () => {
  const navigate = useNavigate();
  const { id = "0" } = useParams();
  const [form] = ProForm.useForm();
  const [content, setContent] = useState<string>("");
  const onSubmit = () => {
    // TODO：作者id
    form.validateFields().then(async (values) => {
      const body = {
        ...values,
        id: +id,
        author_id: 2,
        content,
      };
      await modifyAdvertisement(body);
      message.success("提交成功");
      navigate("/advertisement");
    });
  };

  return (
    <PageContainer
      header={{
        title: "编辑广告信息",
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
        <ProForm
          form={form}
          grid
          submitter={{ render: () => null }}
          request={async () => {
            const {
              data: { advertisement },
            } = await getAdvertisementDetail({ id: +id });
            setContent(advertisement.content);
            return advertisement;
          }}
        >
          <ProFormText label="标题" name="title" rules={rules} />
          <ProFormText label="图片地址" name="image" />
          <ProFormDigit
            colProps={{ md: 12, xl: 8 }}
            label="阅读数"
            name="view_count"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={rules}
          />
          <ProFormDigit
            colProps={{ md: 12, xl: 8 }}
            label="点赞数"
            name="like_count"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={rules}
          />
          <ProFormDigit
            colProps={{ md: 12, xl: 8 }}
            label="评论数"
            name="comment_count"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={rules}
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

export default EditArticle;
