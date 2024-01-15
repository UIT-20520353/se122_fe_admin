import React, { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { TestDetail } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";
import { EditTestInformation } from "../components";

interface ITestDetailProps {}

const TestDetail: React.FunctionComponent<ITestDetailProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const [testInfo, setTestInfo] = useState<TestDetail | null>(null);
  const [isOpenEditTestInformation, setOpenEditTestInformation] =
    useState<boolean>(false);

  // const updateTest = async () => {
  //   dispatch(setLoading("ADD"));
  //   const { ok, body, error } = await testApi.updateTest(Number(id), testInfo);
  //   dispatch(setLoading("REMOVE"));

  //   if (ok && body) {
  //     setTestInfo({ ...body, questions: [], image: null, paragraph: null });
  //     showSuccessModal({
  //       content: "Test information updated successfully.",
  //       onOk: () => {},
  //       title: "Notification",
  //     });
  //     return;
  //   }

  //   handlResponseError(error);
  // };

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
            <button
              className="edit-test"
              onClick={() => setOpenEditTestInformation(true)}
            >
              Edit
            </button>
          </div>
        </div>
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
