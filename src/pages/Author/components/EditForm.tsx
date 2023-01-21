import React, { PropsWithChildren } from "react";
import { Modal } from "antd";

interface EditFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const EditForm: React.FC<PropsWithChildren<EditFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建作者信息"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

EditForm.propTypes = {};

export default EditForm;
