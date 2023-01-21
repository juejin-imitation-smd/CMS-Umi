import React, { PropsWithChildren } from "react";
import { Modal } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {/* {props.children} */}
      <ProForm>
        <ProFormText label="标题" name="title" />
        <ProFormTextArea label="内容" name="content" />
        <ProFormText label="图片" name="image" />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
