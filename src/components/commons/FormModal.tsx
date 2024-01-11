import { Modal } from "antd";
import React, { ReactNode, useEffect } from "react";
import { ModalTitle } from ".";

interface FormModalProps {
  open: boolean;
  title: string;
  content: ReactNode;
  width?: number;
  onClose: () => void;
  resetForm: () => void;
}

const FormModal: React.FunctionComponent<FormModalProps> = ({
  open,
  title,
  content,
  width = 600,
  onClose,
  resetForm,
}) => {
  useEffect(() => {
    resetForm();
  }, [open, resetForm]);

  return (
    <Modal
      title={<ModalTitle title={title} />}
      open={open}
      centered
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      width={width}
      destroyOnClose
      className="modal--form"
    >
      {content}
    </Modal>
  );
};

export { FormModal };
