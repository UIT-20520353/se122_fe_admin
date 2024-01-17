import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { FormModal } from "../../../components/commons";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLoading } from "../../../redux/globalSlice";
import AddQuestion from "./AddQuestion";

const validationSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["SENTENCE_READING", "PARAGRAPH_READING"], "Invalid question type")
    .required("Question type is required!"),
  point: yup
    .number()
    .required("Point is required")
    .min(1, "Please enter point between 1 and 10.")
    .max(10, "Please enter point between 1 and 10.")
    .typeError("Point must be a number"),
  question: yup.string().required("Question is required"),
});

interface AddReadingQuestionProps {
  open: boolean;
  onClose: () => void;
  isEntryTest?: boolean;
}

export interface AddReadingQuestionFormProps {
  type: "SENTENCE_READING" | "PARAGRAPH_READING";
  point: number;
  question: string;
}

const AddReadingQuestion: React.FunctionComponent<AddReadingQuestionProps> = ({
  open,
  onClose,
  isEntryTest = false,
}) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddReadingQuestionFormProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      type: "SENTENCE_READING",
      point: 0,
      question: "",
    },
  });

  const onSubmit = async (data: AddReadingQuestionFormProps) => {
    dispatch(setLoading("ADD"));
    dispatch(setLoading("REMOVE"));
    console.log(data);
  };

  return (
    <FormModal
      open={open}
      title={"Add new reading question"}
      content={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-add-reading-question"
        >
          <div className="row">
            <label htmlFor="select-question-type">Question Type</label>
            <select id="select-question-type" {...register("type")}>
              <option value="PARAGRAPH_READING">Paragraph reading</option>
              <option value="SENTENCE_READING">Sentence reading</option>
            </select>
            {errors.type && (
              <span className="error-message">{errors.type.message}</span>
            )}
          </div>
          <AddQuestion
            property={"question"}
            register={register}
            errors={errors}
            label="Question"
          />
          {isEntryTest && (
            <div className="row">
              <label htmlFor="input-question-point">Point</label>
              <input
                id="input-question-point"
                type="text"
                placeholder="Enter question point"
                {...register("point")}
              />
              {errors.point && (
                <span className="error-message">{errors.point.message}</span>
              )}
            </div>
          )}
          <div className="modal-add-reading-question__footer">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      }
      onClose={onClose}
      resetForm={reset}
    />
  );
};

export default AddReadingQuestion;
