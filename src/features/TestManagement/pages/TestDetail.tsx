import React, { Fragment, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { Question, TestDetail } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";
import { EditTestInformation } from "../components";
import {
  TYPE_LISTENING_QUESTION,
  TYPE_READING_QUESTION,
} from "../../../consts/app";

interface ITestDetailProps {}

const TestDetail: React.FunctionComponent<ITestDetailProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const [testInfo, setTestInfo] = useState<TestDetail | null>(null);
  const [isOpenEditTestInformation, setOpenEditTestInformation] =
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
            <span>{`${testInfo.questions.length} (${listeningQuestions.length} listening, ${readingQuestions.length} reading)`}</span>
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

        {listeningQuestions.length !== 0 && (
          <div className="listening-part">
            <div className="listening-part__header">
              <h3>Listening Part</h3>
            </div>
            <div className="listening-part__content">dasda</div>
          </div>
        )}

        {readingQuestions.length !== 0 && (
          <div className="reading-part">
            <div className="reading-part__header">
              <h3>Reading Part</h3>
            </div>
            <div className="reading-part__content">dasda</div>
          </div>
        )}
      </div>
      <EditTestInformation
        isOpen={isOpenEditTestInformation}
        onClose={() => setOpenEditTestInformation(false)}
        afterAdd={fetchData}
        id={testInfo.id}
        title={testInfo.title}
        difficultyLevel={testInfo.difficultyLevel}
      />
    </Fragment>
  ) : null;
};

export default TestDetail;
