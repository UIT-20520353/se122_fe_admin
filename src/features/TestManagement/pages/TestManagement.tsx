import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { FaEye, FaPen } from "react-icons/fa";
import { useEffectOnce } from "usehooks-ts";
import testApi from "../../../api/testApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { BaseRequestQueryParam } from "../../../models/http";
import { TestModel } from "../../../models/test";
import { setLoading } from "../../../redux/globalSlice";

interface TestManagementProps {}

interface DataProps {
  tests: TestModel[];
  total: number;
}

interface FilterProps {
  page: number;
  name: string;
}

const initialFilter: FilterProps = {
  page: 1,
  name: "",
};

const getParams = (filter: FilterProps): BaseRequestQueryParam => ({
  size: 10,
  page: filter.page - 1,
  sort: "id,desc",
  "name.contains": filter.name || null,
});

const TestManagement: React.FunctionComponent<TestManagementProps> = () => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();

  const [data, setData] = useState<DataProps>({
    tests: [],
    total: 0,
  });
  const [filter, setFilter] = useState<FilterProps>(initialFilter);

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
      render: (text) => (
        <Tag
          color={text === "EASY" ? "success" : "warning"}
          style={{ fontWeight: "700" }}
        >
          {text === "EASY" ? "Easy" : "Medium"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex-row gap-1">
          <Button type="primary" className="button-action">
            <FaEye className="button-action__icon" />
          </Button>
          <Button type="primary" className="button-action edit">
            <FaPen className="button-action__icon" />
          </Button>
        </div>
      ),
    },
  ];

  useEffectOnce(() => {
    fetchData(getParams(initialFilter));
  });

  return (
    <div className="test-management">
      <Table columns={columns} dataSource={data.tests} pagination={false} />
    </div>
  );
};

export default TestManagement;
