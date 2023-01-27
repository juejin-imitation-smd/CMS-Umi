import React, { PropsWithChildren } from "react";
import { Modal } from "antd";

interface ModalFormProps {
  title: string;
  modalVisible: boolean;
  onCancel: () => void;
}

const ModalForm: React.FC<PropsWithChildren<ModalFormProps>> = (props) => {
  const { title, modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={title}
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default ModalForm;
