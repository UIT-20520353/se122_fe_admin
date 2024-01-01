import { Button, Pagination, Select, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { BaseRequestQueryParam } from "../../../models/http";
import { UserModel } from "../../../models/user";
import { setLoading } from "../../../redux/globalSlice";
import { FaLock, FaLockOpen } from "react-icons/fa";

interface UserManagementProps {}

interface DataProps {
  users: UserModel[];
  total: number;
}

interface FilterProps {
  page: number;
  name: string;
  email: string;
  status: string;
}

const initialFilter: FilterProps = {
  page: 1,
  name: "",
  email: "",
  status: "",
};

const getParams = (filter: FilterProps): BaseRequestQueryParam => ({
  size: 10,
  page: filter.page - 1,
  "role.equals": "USER",
  sort: "id,desc",
  "name.contains": filter.name || null,
  "email.contains": filter.email || null,
  "status.equals": filter.status || null,
});

const UserManagement: React.FunctionComponent<UserManagementProps> = () => {
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();

  const [data, setData] = useState<DataProps>({
    users: [],
    total: 0,
  });
  const [filter, setFilter] = useState<FilterProps>(initialFilter);

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
      fetchData(getParams({ ...prev, status: value }));
      return { ...prev, status: value };
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

  const handleBlockClick = async (userId: number) => {
    dispatch(setLoading("ADD"));
    const { ok, error } = await userApi.blockUser(userId);
    if (ok) {
      fetchData(getParams(filter));
      dispatch(setLoading("REMOVE"));
    } else {
      dispatch(setLoading("REMOVE"));
      handlResponseError(error);
    }
  };

  const handleUnblockClick = async (userId: number) => {
    dispatch(setLoading("ADD"));
    const { ok, error } = await userApi.unblockUser(userId);
    if (ok) {
      fetchData(getParams(filter));
      dispatch(setLoading("REMOVE"));
    } else {
      dispatch(setLoading("REMOVE"));
      handlResponseError(error);
    }
  };

  const fetchData = async (params: BaseRequestQueryParam) => {
    dispatch(setLoading("ADD"));
    const { ok, body, error, pagination } = await userApi.getUsers(params);
    dispatch(setLoading("REMOVE"));

    if (ok && body && pagination) {
      setData({
        users: body,
        total: pagination.total,
      });
      return;
    }

    handlResponseError(error);
  };

  const columns: ColumnsType<UserModel> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag
          color={text === "ACTIVE" ? "success" : "error"}
          className="font-bold"
        >
          {text === "ACTIVE" ? "Active" : "Blocked"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          className="button-action"
          danger={record.status === "ACTIVE"}
          onClick={
            record.status === "ACTIVE"
              ? () => handleBlockClick(record.id)
              : () => handleUnblockClick(record.id)
          }
        >
          {record.status === "ACTIVE" ? (
            <FaLock className="button-action__icon" />
          ) : (
            <FaLockOpen className="button-action__icon" />
          )}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchData(getParams(initialFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-management">
      <div className="search__block">
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
          <label htmlFor="search__email">Email</label>
          <input
            id="search__email"
            name="search__email"
            placeholder="Enter email to search"
            autoComplete="off"
            value={filter.email}
            onChange={(e) => onInputChange(e, "email")}
          />
        </div>
        <div className="search__block--column">
          <label htmlFor="search__status">Status</label>
          <Select
            id="search__status"
            style={{ width: "100%", height: "36px" }}
            options={[
              { value: "", label: "All" },
              { value: "ACTIVE", label: "Active" },
              { value: "BLOCKED", label: "Blocked" },
            ]}
            value={filter.status}
            onChange={onSelectChange}
          />
        </div>
        <div className="search__block--column search-action">
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={handleResetClick}>Reset</button>
        </div>
      </div>
      <Table columns={columns} dataSource={data.users} pagination={false} />
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
    </div>
  );
};

export default UserManagement;
