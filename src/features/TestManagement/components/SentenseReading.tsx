import React from "react";
import { Question } from "../../../models/test";
import { getQuestion } from "../../../utils/questionUtils";
import { FaPen } from "react-icons/fa";

interface SentenseReadingProps {
  question: Question;
}

const getNo = (index: number): string => {
  switch (index) {
    case 1:
      return "B. ";
    case 2:
      return "C. ";
    case 3:
      return "D. ";
    case 4:
      return "E. ";
    default:
      return "A. ";
  }
};

const SentenseReading: React.FunctionComponent<SentenseReadingProps> = ({
  question,
}) => {
  return (
    <div className="sentense-reading">
      <div className="flex-row items-center justify-between w-full">
        <p className="question">
          {getQuestion(question.questionDetails[0].text)}
        </p>
        <button className="btn-edit">
          <FaPen />
        </button>
      </div>

      <div className="answers">
        {question.questionDetails[0].answers.map((a, index) => (
          <div
            key={`question-${question.id}-answer-${a.id}`}
            className={`answer ${a.isCorrect ? "correct" : ""}`}
          >
            {`${getNo(index)}${a.content}`}
          </div>
        ))}
        <div className="explain">
          <span>Explain: </span>
          <p
            dangerouslySetInnerHTML={{
              __html: question.questionDetails[0].explain,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SentenseReading;
