import React, { PropsWithChildren, useEffect } from "react";
import { Modal, message } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Rule } from "antd/es/form";
import services from "@/services";

const { modifyAdvertisement } = services.AdvertisementController;

interface UpdateFormProps {
  values: any;
  modalVisible: boolean;
  onCancel: () => void;
}

const rules: Rule[] = [{ required: true }];

const UpdateForm: React.FC<PropsWithChildren<UpdateFormProps>> = (props) => {
  const { values, modalVisible, onCancel } = props;
  const [form] = ProForm.useForm();

  const onSubmit = async (formValues: any) => {
    const body = {
      ...formValues,
      id: values.id,
    };
    await modifyAdvertisement(body);
    onCancel();
    message.success("提交成功");
  };

  useEffect(() => {
    form.setFieldsValue({ ...values });
  }, [values]);

  return (
    <Modal
      destroyOnClose
      title="编辑广告信息"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm form={form} grid onFinish={onSubmit}>
        <ProFormText label="标题" name="title" rules={rules} />
        <ProFormTextArea label="内容" name="content" rules={rules} />
        <ProFormText label="封面地址" name="image" />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
