import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SubmitButtonProps {
  content?: string;
  isLoading?: boolean;
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = ({
  content = "Login",
  isLoading = false,
}) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`submit-button mt-3 ${isLoading ? "disable" : ""}`}
    >
      {isLoading && <AiOutlineLoading3Quarters className="loading-icon" />}
      {content}
    </button>
  );
};

export { SubmitButton };
