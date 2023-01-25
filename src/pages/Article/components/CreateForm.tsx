import React, { PropsWithChildren } from "react";
import { Modal, message } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProSchemaValueEnumObj,
} from "@ant-design/pro-components";
import { Rule } from "antd/es/form";
import services from "@/services";

const { addArticle } = services.ArticleController;

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const labelEnum: ProSchemaValueEnumObj = {
  1: "后端",
  2: "前端",
  3: "Android",
  4: "iOS",
  5: "人工智能",
  6: "开发工具",
  7: "代码人生",
  8: "阅读",
};
const subTabsEnum: ProSchemaValueEnumObj = {
  1: "后端",
  2: "前端",
  3: "JavaScript",
  4: "面试",
  5: "Github",
  6: "Vue.js",
  7: "架构",
  8: "算法",
  9: "Java",
  10: "CSS",
};
const rules: Rule[] = [{ required: true }];

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;
  const [form] = ProForm.useForm();

  const onSubmit = async (values: any) => {
    // TODO：作者id
    const body = {
      ...values,
      author_id: 0,
      time: Date.now(),
      view_count: 0,
      like_count: 0,
      comment_count: 0,
    };
    await addArticle(body);
    onCancel();
    message.success("提交成功");
  };

  return (
    <Modal
      destroyOnClose
      title="创建文章"
      width={620}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm form={form} grid onFinish={onSubmit}>
        <ProFormText label="标题" name="title" rules={rules} />
        <ProFormTextArea label="内容" name="content" rules={rules} />
        <ProFormText label="图片地址" name="image" />
        <ProFormSelect
          colProps={{ md: 12, xl: 12 }}
          label="分类"
          name="label"
          valueEnum={labelEnum}
          rules={rules}
        />
        <ProFormSelect
          mode="tags"
          colProps={{ md: 12, xl: 12 }}
          label="标签"
          name="sub_tabs"
          valueEnum={subTabsEnum}
          rules={rules}
        />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
