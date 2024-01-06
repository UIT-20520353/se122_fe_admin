import React, { Fragment, useState } from "react";
import { TestInformation } from "../components";
import { AddQuestionModal } from "./AddQuestionModal";

interface AddTestProps {}

const AddTest: React.FunctionComponent<AddTestProps> = () => {
  const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] =
    useState<boolean>(false);

  return (
    <Fragment>
      <div className="add-test-page">
        <h2 className="add-test-page__title">Add new test</h2>
        <TestInformation />
        <div className="questions">
          <div className="questions__header">
            <h3>Questions</h3>
            <button
              className="add-question"
              onClick={() => setIsOpenAddQuestionModal(true)}
            >
              Add new question
            </button>
          </div>
        </div>
      </div>
      <AddQuestionModal
        isOpen={isOpenAddQuestionModal}
        closeModal={() => setIsOpenAddQuestionModal(false)}
      />
    </Fragment>
  );
};

export default AddTest;
