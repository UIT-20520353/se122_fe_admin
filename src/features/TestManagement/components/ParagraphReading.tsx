import React from "react";
import { Question } from "../../../models/test";
import { getQuestion } from "../../../utils/questionUtils";

interface ParagraphReadingProps {
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

const ParagraphReading: React.FunctionComponent<ParagraphReadingProps> = ({
  question,
}) => {
  return (
    <div className="paragraph-reading">
      <div className="paragraph-reading__left">
        <p>{getQuestion(question.paragraph || "")}</p>
      </div>
      <div className="paragraph-reading__right">
        {question.questionDetails.map((questionDetail) => (
          <div className="question">
            <p className="question__text">{questionDetail.text}</p>
            <div className="answers">
              {questionDetail.answers.map((a, index) => (
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
                    __html: questionDetail.explain,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParagraphReading;
