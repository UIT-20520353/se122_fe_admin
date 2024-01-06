import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { QuestionModel } from "../../../models/question";
import { AnswerModel } from "../../../models/answer";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import {
  showErrorModal,
  showSuccessModal,
} from "../../../components/modals/CommonModals";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { setLoading } from "../../../redux/globalSlice";
import questionApi from "../../../api/questionApi";

interface EditListenQuestionProps {
  isOpen: boolean;
  onClose: () => void;
  question: QuestionModel | null;
  afterUpdate: () => void;
}

const EditListenQuestion: React.FunctionComponent<EditListenQuestionProps> = ({
  isOpen,
  onClose,
  question,
  afterUpdate,
}) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const inputAudioRef = React.useRef<HTMLInputElement>(null);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswers, setNewAnswers] = useState<AnswerModel[]>([]);

  const handleAddAnswerClick = () => {
    if (newAnswers.length >= 5) return;
    setNewAnswers((prev) => [
      ...prev,
      { content: "", isResult: false, id: -1 },
    ]);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const temp = [...newAnswers];
    temp[index].content = e.target.value;
    setNewAnswers(temp);
  };

  const onCheckedChange = (index: number) => {
    const temp = newAnswers.map((a, i) =>
      i === index ? { ...a, isResult: true } : { ...a, isResult: false }
    );
    setNewAnswers(temp);
  };

  const removeAnswer = (index: number) => {
    setNewAnswers((prev) => prev.filter((_, i) => i !== index));
  };

  const onSaveQuestion = async () => {
    const formData = new FormData();

    if (
      inputAudioRef.current &&
      inputAudioRef.current.files &&
      inputAudioRef.current.files[0]
    ) {
      formData.append("resource", inputAudioRef.current.files[0]);
    }

    if (!newAnswers.length) {
      showErrorModal({
        content: "Please add answers for this question",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    const filledAnswers = newAnswers.some((a) => !a.content);
    if (filledAnswers) {
      showErrorModal({
        content: "Please fill content for answers",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    const isChooseAnswers = newAnswers.some((a) => a.isResult);
    if (!isChooseAnswers) {
      showErrorModal({
        content: "Please choose result for this question",
        title: "Error",
        onOk: () => {},
      });
      return;
    }

    formData.append(
      "question",
      new Blob(
        [
          JSON.stringify({
            id: question?.id || -1,
            type: "LISTENING",
            question: newQuestion,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    const blobAnswers = new Blob([JSON.stringify(newAnswers)], {
      type: "application/json",
    });
    formData.append("answers", blobAnswers);

    dispatch(setLoading("ADD"));
    const { ok, error } = await questionApi.updateQuestion(formData);
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        content: "Update question successfully.",
        title: "Notification",
        onOk: () => {},
      });
      onClose();
      afterUpdate();
    } else {
      handlResponseError(error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setNewQuestion("");
      setNewAnswers([]);
    } else {
      if (question) {
        setNewQuestion(JSON.parse(question.question));
        setNewAnswers(question.answers);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      title="Edit question"
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
          <span>Old audio file</span>
          <audio src={question?.resource} autoPlay={false} controls />
        </div>
        <div className="row">
          <label htmlFor="choose_audio_file">Select new audio file</label>
          <input
            type={"file"}
            multiple={false}
            id="choose_audio_file"
            name="choose_audio_file"
            accept="audio/*"
            ref={inputAudioRef}
          />
        </div>
        <div className="row">
          <label htmlFor="input__question">Enter your new question</label>
          <input
            type="text"
            id="input__question"
            name="input__question"
            autoComplete="off"
            className="input"
            placeholder="Enter your new question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
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
            {newAnswers.map((answer, index) => (
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
                  checked={newAnswers[index].isResult}
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

export default EditListenQuestion;
