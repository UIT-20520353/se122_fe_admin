import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AddReadingQuestionFormProps } from "./AddReadingQuestion";

interface AddQuestionProps {
  register: UseFormRegister<AddReadingQuestionFormProps>;
  errors: FieldErrors<AddReadingQuestionFormProps>;
  label: string;
  property: keyof AddReadingQuestionFormProps;
}

const AddQuestion: React.FunctionComponent<AddQuestionProps> = ({
  register,
  errors,
  label,
  property,
}) => {
  return (
    <div className="row">
      <label htmlFor="input-question-text">{label}</label>
      <input
        id="input-question-text"
        type="text"
        placeholder="Enter question"
        {...register(property)}
      />
      {errors[property] && (
        <span className="error-message">{errors[property]?.message}</span>
      )}
    </div>
  );
};

export default AddQuestion;
