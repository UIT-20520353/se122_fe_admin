import React, { useState } from "react";
import { Modal, Select } from "antd";

interface AddQuestionModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddQuestionModal: React.FunctionComponent<AddQuestionModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [type, setType] = useState<"FILL" | "LISTEN">("FILL");

  return (
    <Modal
      open={isOpen}
      title="Add new question"
      footer={null}
      centered
      onCancel={closeModal}
      width={800}
      maskClosable={false}
    >
      <div className="modal__content">
        <div className="flex-col w-full gap-1">
          <label htmlFor="select__level" className="label">
            Question Type
          </label>
          <Select
            id="select__level"
            style={{ width: "100%", height: "36px" }}
            onChange={(value: "FILL" | "LISTEN") => setType(value)}
            value={type}
            options={[
              { value: "FILL", label: "Fill" },
              { value: "LISTEN", label: "Listen" },
            ]}
          />
        </div>
      </div>
    </Modal>
  );
};

export { AddQuestionModal };
