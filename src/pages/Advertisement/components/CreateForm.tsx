import React, { PropsWithChildren } from "react";
import { Modal, message } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Rule } from "antd/es/form";
import services from "@/services";

const { addAdvertisement } = services.AdvertisementController;

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const rules: Rule[] = [{ required: true }];

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;

  const onSubmit = async (values: any) => {
    const body = {
      ...values,
    };
    await addAdvertisement(body);
    onCancel();
    message.success("提交成功");
  };

  return (
    <Modal
      destroyOnClose
      title="创建广告"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm grid onFinish={onSubmit}>
        <ProFormText label="标题" name="title" rules={rules} />
        <ProFormTextArea label="内容" name="content" rules={rules} />
        <ProFormText label="封面地址" name="image" />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
