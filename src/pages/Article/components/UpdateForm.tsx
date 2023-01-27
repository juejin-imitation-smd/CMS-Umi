import React, { PropsWithChildren, useEffect } from "react";
import { Modal, message } from "antd";
import {
  ProSchemaValueEnumObj,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDigit,
} from "@ant-design/pro-components";
import { Rule } from "antd/es/form";
import services from "@/services";

const { modifyArticle } = services.ArticleController;

interface UpdateFormProps {
  values: any;
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

const UpdateForm: React.FC<PropsWithChildren<UpdateFormProps>> = (props) => {
  const { values, modalVisible, onCancel } = props;
  const [form] = ProForm.useForm();

  const onSubmit = async (formValues: any) => {
    // TODO：作者id
    const body = {
      ...formValues,
      id: values.id,
      author_id: 0,
    };
    await modifyArticle(body);
    onCancel();
    message.success("提交成功");
  };

  useEffect(() => {
    form.setFieldsValue({ ...values });
  }, [values]);

  return (
    <Modal
      destroyOnClose
      title="编辑文章信息"
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
    </Modal>
  );
};

export default UpdateForm;
