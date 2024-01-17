import React, { Fragment, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import {
  TYPE_LISTENING_QUESTION,
  TYPE_READING_QUESTION,
} from "../../../consts/app";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { Question, TestDetail } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";
import { EditTestInformation } from "../components";
import SentenseReading from "../components/SentenseReading";
import ParagraphReading from "../components/ParagraphReading";
import { FaPlus } from "react-icons/fa";
import AddReadingQuestion from "../components/AddReadingQuestion";

interface ITestDetailProps {}

const TestDetail: React.FunctionComponent<ITestDetailProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const [testInfo, setTestInfo] = useState<TestDetail | null>(null);
  const [isOpenEditTestInformation, setOpenEditTestInformation] =
    useState<boolean>(false);
  const [isOpenAddReadingQuestion, setOpenReadingQuestion] =
    useState<boolean>(false);

  const fetchData = async () => {
    if (isNaN(Number(id))) {
      navigate("/tests");
      return;
    }

    dispatch(setLoading("ADD"));
    const { ok, body, error } = await testApi.getTest(Number(id));
    dispatch(setLoading("REMOVE"));

    if (ok && body) {
      setTestInfo(body);
      return;
    }

    handlResponseError(error);
    navigate("/tests");
  };

  const listeningQuestions: Question[] = useMemo(
    (): Question[] =>
      testInfo
        ? testInfo.questions.filter((q) =>
            TYPE_LISTENING_QUESTION.includes(q.type)
          )
        : [],
    [testInfo]
  );

  const readingQuestions: Question[] = useMemo(
    () =>
      testInfo
        ? testInfo.questions.filter((q) =>
            TYPE_READING_QUESTION.includes(q.type)
          )
        : [],
    [testInfo]
  );

  const totalListeningQuestions: number = useMemo(
    () =>
      testInfo
        ? testInfo.questions
            .filter((q) => TYPE_LISTENING_QUESTION.includes(q.type))
            .reduce(
              (preValue, currValue) =>
                preValue + currValue.questionDetails.length,
              0
            )
        : 0,
    [testInfo]
  );

  const totalReadingQuestions: number = useMemo(
    () =>
      testInfo
        ? testInfo.questions
            .filter((q) => TYPE_READING_QUESTION.includes(q.type))
            .reduce(
              (preValue, currValue) =>
                preValue + currValue.questionDetails.length,
              0
            )
        : 0,
    [testInfo]
  );

  const totalQuestions: number = useMemo(
    () =>
      testInfo
        ? testInfo.questions.reduce(
            (preValue, currValue) =>
              preValue + currValue.questionDetails.length,
            0
          )
        : 0,
    [testInfo]
  );

  useEffectOnce(() => {
    fetchData();
  });

  return testInfo ? (
    <Fragment>
      <div className="test-detail">
        <div className="test-detail__header">
          <h3>Test Detail</h3>
          <Link className="back" to={"/tests"}>
            Back
          </Link>
        </div>
        <div className="test-detail__infor-test">
          <div className="row-info">
            <span>Test ID:</span>
            <span>{testInfo.id}</span>
          </div>
          <div className="row-info">
            <span>Title:</span>
            <span>{testInfo.title}</span>
          </div>
          <div className="row-info">
            <span>Difficulty Level:</span>
            <span>{testInfo.difficultyLevel}</span>
          </div>
          <div className="row-info">
            <span>Total Questions:</span>
            <span>{`${totalQuestions} (${totalListeningQuestions} listening, ${totalReadingQuestions} reading)`}</span>
          </div>
          <div className="row-info">
            <button
              className="edit-test"
              onClick={() => setOpenEditTestInformation(true)}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="listening-part">
          <div className="listening-part__header">
            <h3>Listening Part</h3>
            <button className="add-question">
              <FaPlus style={{ color: "#fff" }} />
            </button>
          </div>
          {listeningQuestions.length !== 0 && (
            <div className="listening-part__content">dasda</div>
          )}
        </div>

        <div className="reading-part">
          <div className="reading-part__header">
            <h3>Reading Part</h3>
            <button
              className="add-question"
              onClick={() => setOpenReadingQuestion(true)}
            >
              <FaPlus style={{ color: "#fff" }} />
            </button>
          </div>
          {readingQuestions.length !== 0 && (
            <div className="reading-part__content">
              {readingQuestions
                .filter((q) => q.type === "SENTENCE_READING")
                .map((q) => (
                  <SentenseReading
                    question={q}
                    key={`sentense-question-${q.id}`}
                  />
                ))}
              {readingQuestions
                .filter((q) => q.type === "PARAGRAPH_READING")
                .map((q) => (
                  <ParagraphReading
                    question={q}
                    key={`paragraph-reading-${q.id}`}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <EditTestInformation
        isOpen={isOpenEditTestInformation}
        onClose={() => setOpenEditTestInformation(false)}
        afterAdd={fetchData}
        id={testInfo.id}
        title={testInfo.title}
        difficultyLevel={testInfo.difficultyLevel}
        isEntryTest={testInfo.difficultyLevel === "ENTRY_TEST"}
      />
      <AddReadingQuestion
        open={isOpenAddReadingQuestion}
        onClose={() => setOpenReadingQuestion(false)}
        isEntryTest={testInfo.difficultyLevel === "ENTRY_TEST"}
      />
    </Fragment>
  ) : null;
};

export default TestDetail;
