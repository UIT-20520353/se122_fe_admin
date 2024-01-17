import React from "react";
import { FormModal } from "../../../components/commons";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLoading } from "../../../redux/globalSlice";
import testApi from "../../../api/testApi";
import { showSuccessModal } from "../../../components/modals/CommonModals";

const validationSchema = yup.object().shape({
  id: yup.number().required("Id is required!"),
  title: yup.string().required("Title is required!"),
  difficultyLevel: yup
    .string()
    .oneOf(
      ["A1", "A2", "B1", "B2", "C1", "C2", "ENTRY_TEST"],
      "Invalid difficulty level"
    )
    .required("Difficulty level is required!"),
});

interface EditTestInformationProps {
  isOpen: boolean;
  onClose: () => void;
  afterAdd: () => void;
  id: number;
  title: string;
  difficultyLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ENTRY_TEST";
  isEntryTest?: boolean;
}

interface EditTestForm {
  id: number;
  title: string;
  difficultyLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "ENTRY_TEST";
}

const EditTestInformation: React.FunctionComponent<
  EditTestInformationProps
> = ({
  isOpen,
  onClose,
  afterAdd,
  id,
  title,
  difficultyLevel,
  isEntryTest = false,
}) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTestForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id,
      title,
      difficultyLevel,
    },
  });

  const onSubmit = async (data: EditTestForm) => {
    dispatch(setLoading("ADD"));
    const { ok, error } = await testApi.updateTestInformation(data);
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        title: "Notification",
        content: "Update test information successfully!",
        onOk: () => {},
      });
      afterAdd();
      onClose();
    } else {
      handlResponseError(error);
    }
  };

  return (
    <FormModal
      open={isOpen}
      onClose={onClose}
      resetForm={reset}
      title="Change test information"
      content={
        <form onSubmit={handleSubmit(onSubmit)} className="modal-add-test">
          <div className="row">
            <label htmlFor="input__test__id">Test ID</label>
            <input
              type="text"
              id="input__test__id"
              placeholder="Enter your test id"
              readOnly
              {...register("id")}
            />
          </div>
          <div className="row">
            <label htmlFor="input__test__name">Test Name</label>
            <input
              type="text"
              id="input__test__name"
              placeholder="Enter your test name"
              autoComplete="off"
              {...register("title")}
            />
            {errors.title && (
              <span className="error-message">{errors.title.message}</span>
            )}
          </div>
          <div className="row">
            <label htmlFor="select__level">Difficulty Level</label>
            <select
              disabled={isEntryTest}
              id="select__level"
              {...register("difficultyLevel")}
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
              {isEntryTest && <option value="ENTRY_TEST">Entry test</option>}
            </select>
          </div>
          <div className="modal-add-test__footer">
            <button type="submit">Save changes</button>
          </div>
        </form>
      }
    />
  );
};

export { EditTestInformation };
