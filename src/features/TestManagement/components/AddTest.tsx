import React, { useState } from "react";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import { showSuccessModal } from "../../../components/modals/CommonModals";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { setLoading } from "../../../redux/globalSlice";
import { FormModal } from "../../../components/commons";

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
  const [level, setLevel] = useState<string>("A1");

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

  const resetForm = () => {
    setName("");
    setLevel("A1");
  };

  return (
    <FormModal
      open={isOpen}
      onClose={onClose}
      resetForm={resetForm}
      title="Add new test"
      content={
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
            <label htmlFor="select__level">Difficulty Level</label>
            <select
              id="select__level"
              name="select__level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <div className="modal-add-test__footer">
            <button onClick={handleAddTest}>Save</button>
          </div>
        </div>
      }
    />
  );
};

export default AddTest;
