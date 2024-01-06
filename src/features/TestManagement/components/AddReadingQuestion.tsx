import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { useAppDispatch } from "../../../app/hooks";
import {
  showErrorModal,
  showSuccessModal,
} from "../../../components/modals/CommonModals";
import { setLoading } from "../../../redux/globalSlice";
import questionApi from "../../../api/questionApi";

interface AddReadingQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  testId: string;
  afterAdd: () => void;
}

interface AnswerProps {
  content: string;
  isResult: boolean;
}

const AddReadingQuestion: React.FunctionComponent<AddReadingQuestionProps> = ({
  isOpen,
  onClose,
  testId,
  afterAdd,
}) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<AnswerProps[]>([]);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const temp = [...answers];
    temp[index].content = e.target.value;
    setAnswers(temp);
  };

  const onCheckedChange = (index: number) => {
    const temp = answers.map((a, i) =>
      i === index ? { ...a, isResult: true } : { ...a, isResult: false }
    );
    setAnswers(temp);
  };

  const removeAnswer = (index: number) => {
    setAnswers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAnswerClick = () => {
    if (answers.length >= 5) return;
    setAnswers((prev) => [...prev, { content: "", isResult: false }]);
  };

  const onSaveQuestion = async () => {
    if (!question) {
      showErrorModal({
        content: "Please add question",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    if (!answers.length) {
      showErrorModal({
        content: "Please add answers for this question",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    const filledAnswers = answers.some((a) => !a.content);
    if (filledAnswers) {
      showErrorModal({
        content: "Please fill content for answers",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    const isChooseAnswers = answers.some((a) => a.isResult);
    if (!isChooseAnswers) {
      showErrorModal({
        content: "Please choose result for this question",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    dispatch(setLoading("ADD"));
    const { ok, error } = await questionApi.addQuestionReading({
      testId,
      question,
      type: "READING",
      answers,
    });
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        content: "Add question successfully.",
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
      setQuestion("");
      setAnswers([]);
    }
  }, [isOpen]);

  return (
    <Modal
      title="Add reading new question"
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
          <label htmlFor="input__question">Enter your question</label>
          <input
            type="text"
            id="input__question"
            name="input__question"
            autoComplete="off"
            className="input"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="answers">
          <div className="answers__header">
            <p style={{ fontSize: "16px", fontWeight: "400" }}>Answers</p>
            <button onClick={handleAddAnswerClick}>
              <CiCirclePlus />
            </button>
          </div>
          <div className="answers__body">
            {answers.map((answer, index) => (
              <div key={`question-${index}`} className="answer">
                <input
                  type="text"
                  id={`question-text-${index}`}
                  name={`question-text-${index}`}
                  placeholder="Enter your answer"
                  value={answer.content}
                  onChange={(e) => onInputChange(e, index)}
                  autoComplete="off"
                />
                <input
                  type={"radio"}
                  id={`question-${index}`}
                  name={"question"}
                  value={index}
                  checked={answers[index].isResult}
                  onChange={() => onCheckedChange(index)}
                />
                <button
                  className="remove-answer"
                  onClick={() => removeAnswer(index)}
                >
                  <CiCircleMinus />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="modal__footer">
          <button onClick={onSaveQuestion}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddReadingQuestion;
