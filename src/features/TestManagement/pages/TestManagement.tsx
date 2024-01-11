import { Button, Pagination, Select, Table, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { BaseRequestQueryParam } from "../../../models/http";
import { TestModel } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";
import AddTest from "../components/AddTest";

interface TestManagementProps {}

interface DataProps {
  tests: TestModel[];
  total: number;
}

interface FilterProps {
  page: number;
  name: string;
  level: string;
  testId: string;
}

const initialFilter: FilterProps = {
  page: 1,
  name: "",
  level: "",
  testId: "",
};

const getParams = (filter: FilterProps): BaseRequestQueryParam => ({
  size: 10,
  page: filter.page - 1,
  sort: "id,desc",
  "name.contains": filter.name || null,
  "level.equals": filter.level || null,
  "testId.equals": filter.testId || null,
});

const TestManagement: React.FunctionComponent<TestManagementProps> = () => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterProps>(initialFilter);
  const [isOpenAddTest, setIsOpenAddTest] = useState<boolean>(false);

  const [data, setData] = useState<DataProps>({
    tests: [],
    total: 0,
  });

  const onPageChange = (page: number) => {
    setFilter((prev) => {
      fetchData(getParams({ ...prev, page }));
      return { ...prev, page };
    });
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof FilterProps
  ) => {
    setFilter((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const onSelectChange = (value: string) => {
    setFilter((prev) => {
      fetchData(getParams({ ...prev, level: value }));
      return { ...prev, level: value };
    });
  };

  const handleSearchClick = () => {
    setFilter((prev) => {
      fetchData(
        getParams({
          ...prev,
          page: 1,
        })
      );
      return {
        ...prev,
        page: 1,
      };
    });
  };

  const handleResetClick = () => {
    setFilter(initialFilter);
    fetchData(getParams(initialFilter));
  };

  const columns: ColumnsType<TestModel> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text: "A1" | "A2" | "B1" | "B2" | "C1" | "C2") => (
        <Tag
          color={
            text === "A1" || text === "A2"
              ? "success"
              : text === "B1" || text === "B2"
              ? "warning"
              : "error"
          }
          className="font-bold"
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Tooltip placement="right" title="View detail">
          <Button
            type="primary"
            className="flex-center"
            onClick={() => navigate(`/tests/${record.id}`)}
          >
            <FaEye style={{ fontSize: "16px" }} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  const fetchData = async (params: BaseRequestQueryParam) => {
    dispatch(setLoading("ADD"));
    const { ok, body, error, pagination } = await testApi.getTests(params);
    dispatch(setLoading("REMOVE"));

    if (ok && body && pagination) {
      setData({
        tests: body,
        total: pagination.total,
      });
      return;
    }

    handlResponseError(error);
  };

  useEffect(() => {
    fetchData(getParams(initialFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="test-management">
      <div className="search__block">
        <div className="search__block--column">
          <label htmlFor="search__test__id">Test ID</label>
          <input
            id="search__test__id"
            name="search__test__id"
            placeholder="Enter test id to search"
            autoComplete="off"
            value={filter.testId}
            onChange={(e) => onInputChange(e, "testId")}
          />
        </div>
        <div className="search__block--column">
          <label htmlFor="search__name">Name</label>
          <input
            id="search__name"
            name="search__name"
            placeholder="Enter name to search"
            autoComplete="off"
            value={filter.name}
            onChange={(e) => onInputChange(e, "name")}
          />
        </div>

        <div className="search__block--column">
          <label htmlFor="search__level">Status</label>
          <Select
            id="search__level"
            style={{ width: "100%", height: "36px" }}
            options={[
              { value: "", label: "All" },
              { value: "EASY", label: "Easy" },
              { value: "MEDIUM", label: "Medium" },
            ]}
            value={filter.level}
            onChange={onSelectChange}
          />
        </div>
        <div className="search__block--column search-action">
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={handleResetClick}>Reset</button>
          <button onClick={() => setIsOpenAddTest(true)}>Add</button>
        </div>
      </div>
      <Table columns={columns} dataSource={data.tests} pagination={false} />
      {data.total !== 0 && (
        <div className="pagination">
          <Pagination
            total={data.total}
            pageSize={10}
            onChange={onPageChange}
            current={filter.page}
          />
        </div>
      )}

      <AddTest
        afterAdd={() => fetchData(getParams(initialFilter))}
        isOpen={isOpenAddTest}
        onClose={() => setIsOpenAddTest(false)}
      />
    </div>
  );
};

export default TestManagement;
