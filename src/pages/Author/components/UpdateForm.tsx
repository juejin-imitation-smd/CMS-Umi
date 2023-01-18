import React, { PropsWithChildren } from "react";
import { Modal } from "antd";

interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const UpdateForm: React.FC<PropsWithChildren<UpdateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="编辑作者信息"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

UpdateForm.propTypes = {};

export default UpdateForm;
