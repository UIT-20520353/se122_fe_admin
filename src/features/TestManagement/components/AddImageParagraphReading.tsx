import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { setLoading } from "../../../redux/globalSlice";
import {
  showErrorModal,
  showSuccessModal,
} from "../../../components/modals/CommonModals";
import testApi from "../../../api/testApi";

interface AddImageParagraphReadingProps {
  isOpen: boolean;
  onClose: () => void;
  testId: string;
  afterAdd: () => void;
  paragraph: string | null;
}

const AddImageParagraphReading: React.FunctionComponent<
  AddImageParagraphReadingProps
> = ({ isOpen, onClose, testId, afterAdd, paragraph }) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");

  const handleSave = async () => {
    const formData = new FormData();

    if (
      inputImageRef.current &&
      inputImageRef.current.files &&
      inputImageRef.current.files[0]
    ) {
      formData.append("resource", inputImageRef.current.files[0]);
    } else {
      if (text === "") {
        showErrorModal({
          content: "Please choose image or enter paragraph",
          title: "Error",
          onOk: () => {},
        });
        return;
      }
    }
    formData.append("paragraph", text);

    dispatch(setLoading("ADD"));
    const { ok, error } = await testApi.addResource(formData, testId);
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        content: "Add image / paragraph for reading successfully.",
        title: "Notification",
        onOk: () => {},
      });
      onClose();
      afterAdd();
    } else {
      handlResponseError(error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setText("");
    } else {
      setText(paragraph || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      title="Add reading resource"
      open={isOpen}
      centered
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      width={600}
      destroyOnClose
    >
      <div className="modal-question listening">
        <div className="row">
          <label htmlFor="choose_image_file">Select image</label>
          <input
            type={"file"}
            multiple={false}
            id="choose_image_file"
            name="choose_image_file"
            accept="image/png, image/jpeg"
            ref={inputImageRef}
          />
        </div>
        <div className="row">
          <label htmlFor="choose_paragraph">Paragraph for reading</label>
          <textarea
            id="choose_paragraph"
            name="choose_paragraph"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="modal__footer">
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddImageParagraphReading;
