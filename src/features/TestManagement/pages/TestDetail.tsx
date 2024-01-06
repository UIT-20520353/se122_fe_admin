import { Select } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import { showSuccessModal } from "../../../components/modals/CommonModals";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { TestDetailModel } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";
import ListeningPart from "../components/ListeningPart";
import ReadingPart from "../components/ReadingPart";

interface ITestDetailProps {}

const initialTestInfo: TestDetailModel = {
  id: 0,
  name: "",
  level: "EASY",
  questions: [],
  image: null,
  paragraph: null,
};

const TestDetail: React.FunctionComponent<ITestDetailProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const [testInfo, setTestInfo] = useState<TestDetailModel>(initialTestInfo);

  const updateTest = async () => {
    dispatch(setLoading("ADD"));
    const { ok, body, error } = await testApi.updateTest(Number(id), testInfo);
    dispatch(setLoading("REMOVE"));

    if (ok && body) {
      setTestInfo({ ...body, questions: [], image: null, paragraph: null });
      showSuccessModal({
        content: "Test information updated successfully.",
        onOk: () => {},
        title: "Notification",
      });
      return;
    }

    handlResponseError(error);
  };

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

  return (
    <div className="test-detail">
      <div className="test-detail__header">
        <h3>Test Detail</h3>
        <Link className="back" to={"/tests"}>
          Back
        </Link>
      </div>
      <div className="test-detail__infor-test">
        <div className="column">
          <label htmlFor="test__id">Test ID</label>
          <input
            type="text"
            id="test__id"
            name="test__id"
            autoComplete="off"
            placeholder="Enter your test id"
            readOnly
            value={testInfo.id}
          />
        </div>
        <div className="column">
          <label htmlFor="test__name">Test Name</label>
          <input
            type="text"
            id="test__name"
            name="test__name"
            autoComplete="off"
            placeholder="Enter your test name"
            value={testInfo.name}
            onChange={(e) =>
              setTestInfo((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="column">
          <label htmlFor="search__level">Status</label>
          <Select
            id="search__level"
            style={{ width: "100%", height: "36px" }}
            options={[
              { value: "EASY", label: "Easy" },
              { value: "MEDIUM", label: "Medium" },
            ]}
            value={testInfo.level}
            onChange={(value) =>
              setTestInfo((prev) => ({ ...prev, level: value }))
            }
          />
        </div>
        <div></div>
        <div></div>
        <div className="save-test-infor">
          <button onClick={updateTest}>Save changes</button>
        </div>
      </div>
      <ListeningPart
        afterDelete={fetchData}
        questions={testInfo.questions.filter((q) => q.type === "LISTENING")}
        testId={id || ""}
      />
      <ReadingPart
        afterDelete={fetchData}
        questions={testInfo.questions.filter((q) => q.type === "READING")}
        testId={id || ""}
        test={testInfo}
      />
    </div>
  );
};

export default TestDetail;
