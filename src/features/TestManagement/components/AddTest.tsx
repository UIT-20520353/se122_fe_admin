import { Modal } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { setLoading } from "../../../redux/globalSlice";
import testApi from "../../../api/testApi";
import { showSuccessModal } from "../../../components/modals/CommonModals";

interface AddTestProps {
  isOpen: boolean;
  onClose: () => void;
  afterAdd: () => void;
}

const AddTest: React.FunctionComponent<AddTestProps> = ({
  isOpen,
  onClose,
  afterAdd,
}) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();

  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("EASY");

  const handleAddTest = async () => {
    dispatch(setLoading("ADD"));
    const { ok, error } = await testApi.createTest({ name, level });
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        title: "Notification",
        content: "Add test successfully!",
        onOk: () => {},
      });
      afterAdd();
      onClose();
    } else {
      handlResponseError(error);
    }
  };

  return (
    <Modal
      title="Add new test"
      open={isOpen}
      centered
      onCancel={onClose}
      footer={null}
      maskClosable={false}
      width={600}
      destroyOnClose
    >
      <div className="modal-add-test">
        <div className="row">
          <label htmlFor="input__test__name">Test Name</label>
          <input
            type="text"
            name="input__test__name"
            id="input__test__name"
            placeholder="Enter your test name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="select__level">Test Name</label>
          <select
            id="select__level"
            name="select__level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
          </select>
        </div>
        <div className="modal-add-test__footer">
          <button onClick={handleAddTest}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTest;
