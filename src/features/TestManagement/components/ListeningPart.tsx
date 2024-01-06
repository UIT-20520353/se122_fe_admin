import React, { useState } from "react";
import AddListenQuestion from "./AddListenQuestion";
import { QuestionModel } from "../../../models/question";
import { useAppDispatch } from "../../../app/hooks";
import { setLoading } from "../../../redux/globalSlice";
import questionApi from "../../../api/questionApi";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import {
  showConfirmModal,
  showSuccessModal,
} from "../../../components/modals/CommonModals";
import EditListenQuestion from "./EditListenQuestion";

interface ListeningPartProps {
  testId: string;
  questions: QuestionModel[];
  afterDelete: () => void;
}

const ListeningPart: React.FunctionComponent<ListeningPartProps> = ({
  testId,
  questions,
  afterDelete,
}) => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<QuestionModel | null>(null);

  const handleDeleteQuestion = async (id: number) => {
    dispatch(setLoading("ADD"));
    const { ok, error } = await questionApi.deleteQuestion(id);
    dispatch(setLoading("REMOVE"));

    if (ok) {
      showSuccessModal({
        content: "Delete question successfully.",
        title: "Notification",
        onOk: () => {},
      });
    } else {
      handlResponseError(error);
    }
    afterDelete();
  };

  const handleDeleteClick = (id: number) => {
    showConfirmModal({
      title: "Notification",
      content: "Are you sure to delete this question?",
      onOk: () => handleDeleteQuestion(id),
      maskClosable: false,
    });
  };

  return (
    <div className="test-part">
      <div className="test-part__header">
        <h3>Listening Part</h3>
        <button onClick={() => setIsOpen(true)}>Add question</button>
      </div>
      {questions.length !== 0 ? (
        <div className="test-part__questions">
          {questions.map((q, index) => (
            <div className="question" key={`listening-question-${index}`}>
              <audio src={q.resource} autoPlay={false} controls />
              <p style={{ fontSize: "16px" }}>
                <span style={{ fontWeight: 600 }}>{`Question ${
                  index + 1
                }: `}</span>
                {q.question}
              </p>
              <div className="answers">
                {q.answers.map((a, i) => (
                  <p key={`listening-question-${index}-answer-${i}`}>
                    <span>{`Answer ${i + 1}: `}</span>
                    {a.content}
                    <span className={`${a.isResult ? "result" : ""}`}></span>
                  </p>
                ))}
              </div>
              <div className="question__footer">
                <button onClick={() => setQuestion(q)}>Edit</button>
                <button onClick={() => handleDeleteClick(q.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty_data">
          <img
            alt="empty"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFN0lEQVR4nO2ZW2wUVRjHx+iDJsYn46OJD0r02QdfjInKJRoMRERq0Kh9IIpCW8Beoe1KS6kIMVKDqSIaQGgQvMRIbHe329uW3qCVuwW7sKW7M3uZdrtz3TN/c9bOdLqdbXfLstsmfskvOfnmm/P9/5Ozc2ZmGeb/mA4A9/Giujwsqt+HBHU4LKiRkKAqIUG9SnO8qK6gNcxiDFaSngoJqjskqJiLYFRtC0jS08xiClZQng9MKpFAVEUqcFElzArKC8xiCG5cWsZNKhFuUkU6sJMKz45LT+ZUPF3PbETuYiMKFobcnlMDvoj6km9CgRnFVQ/FWQM2EDBydExz9FhivY9Xl+fMwJ0J5buxCQVmqFD89gFURzX8gWAcOqY5xVk7o3ZsQsGdcaUxZwa8vHxldFyGmTFuWrDqsMXRDdFjifWjvHw1ZwZu81LEy8tI5A4XhGL/T3hcvL0KY2xgVp2Xl0HnyJkBT1iK3grLSMTLzjSgtFRhlOVm1d0Ky/CEc2kgJF7yhCSY8foCUOxTa95uM4zQHD2WWO8JiVdyZmAkKB0eCUowIztqDMG3fYE4uiHZUTujdiQo4Z+A9HXODAxz4os3gxLMiK17ITlq4fFxRo6OqTHRVT+j9iYlJNz7HbluCMvrBjVY0T0q40ZAXBDdo7LlnJT6Ibycsd12zyDp3j2gwYovhggu+SX8zYlpcdkv4sAgsZyTUnuB9GbkybVmAOtqz2uo6klOw2AMF8ckXGfFlLjok/Dlhdicc9Kee/rx+l2Jb2rC/bsHyGV6Rcrdc7Onl8DlkXDNL8wJraG18823e0DDp/3kWqUTDyzYQNUA8m39GijF7alxoC+Gn68pGPCKuOIT4tAxze3vi6U8j22qr60f7y9IfKUTD1b3EE91rwbKttb02NcTw2WfEIeO0z2/eqpvVS/xft6Fh9I3cA5FlT0adLa2IG2ah0XYb4gLOrfS1HtXLwrTvfoPV3QT/85uDTqbzyJtiu1anIWcu9PUu8JNuMpuPJKygXI3qapw0xOn2fQ7skpFQn+qKdWr/2hpBxkv69RgJv8XZJWyhP6lnSRS2YnH5jVQ3EEOlHRoSOSd08gqJRYaStrJ/rnFt+Px4nYiWd3W3mpCVim20PBJG5G3ufBEUgPbXeTwDpcGK9b/iKyyI4mO7S7yraX4HXYsK2olqtU9ucAeG1rZwCKbFLTE/rLeI0hsWxuemWWg0EF+KnJosCLveMSdbQMbjkXcyfQU2cmpGeILnHi2oIVoBXZ6tWeytYXcWnHQH8u2gRUH/bEtzWTEShOl0InnDAMfN6NlSzNgxcaTUVe2xa+c4u2mqCuZri3NaDUM1A1puFsq3ApWfTW/qFUNLMo65bvuVzekwTBQc15DJsg7zs9rIO8Yn5FeNedNBmx9GjJBoV2a/+7SLGWkl63PZGDXOQ2ZIv/MZFLx752ezFifXedMBsq7NGSSj85KWPcDj1cOcXj1EBcfb/5DymiP8i6TgVTfkhYbjPEI0aphKcIYuzDdGKZw3hBx1S9gmBPjX85u83L8Mzj9V2XQR4y6tYfDs9Y4zZnnutcwpo0MOpfGokkNhISYUbfGwgDNmee61zB6fHgW0NENiM69xtdlue0zw4C5Ntcwephf5QwDrfUmA/sMA9l+tdw0B4aB/F8BnfmWkF73WuP0Elr9TdjIZxNGj3fPADp/Xk/+I+4bJUbdarOBxrCRzyaMHhtPAUsRRo83T0DMOwksJTacIKJhYO0RoeyNo0RdfxxYCqw7GlPXHBFKZ71WLsX4F5RiBmuNXeuNAAAAAElFTkSuQmCC"
          />
          <span>No data</span>
        </div>
      )}

      <AddListenQuestion
        testId={testId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        afterAdd={afterDelete}
      />

      <EditListenQuestion
        isOpen={Boolean(question)}
        onClose={() => setQuestion(null)}
        question={question}
        afterUpdate={afterDelete}
      />
    </div>
  );
};

export default ListeningPart;
