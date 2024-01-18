import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "usehooks-ts";
import userApi from "../../../api/userApi";
import { useAppDispatch } from "../../../app/hooks";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import { Post, UserDetail } from "../../../models/user";
import { setLoading } from "../../../redux/globalSlice";
import { formatDate } from "../../../utils/commonUtils";

interface UserDetailProps {}

const UserDetail: React.FunctionComponent<UserDetailProps> = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const handlResponseError = useHandleResponseError();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDetail | null>(null);

  const fetchData = async () => {
    if (isNaN(Number(id))) {
      navigate("/");
      return;
    }

    dispatch(setLoading("ADD"));
    const { ok, body, error } = await userApi.getUserDetail(Number(id));
    dispatch(setLoading("REMOVE"));

    if (ok && body) {
      setUser(body);
      return;
    }

    handlResponseError(error);
  };

  const columns: ColumnsType<Post> = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: "VALID" | "INVALID" | "PENDING") => (
        <Tag
          color={
            value === "VALID"
              ? "success"
              : value === "INVALID"
              ? "error"
              : "warning"
          }
          style={{ fontWeight: 600, fontSize: "15px" }}
        >
          {value === "VALID"
            ? "Valid"
            : value === "INVALID"
            ? "Invalid"
            : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
      render: (value) => (
        <a className="link-video" target={"_blank"} href={value}>
          Link video
        </a>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (value) => {
        const m = Math.floor(value / 60);
        return <span>{`${m} ${m > 1 ? "minutes" : "minute"}`}</span>;
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (value) => <span>{formatDate(value)}</span>,
    },
  ];

  useEffectOnce(() => {
    fetchData();
  });

  return user ? (
    <div className="user-detail-page">
      <h3>User Detail</h3>
      <div className="user-infor">
        <div className="infor">
          <div className="row">
            <div className="row__left">ID:</div>
            <div className="row__right">{user.id}</div>
          </div>
          <div className="row">
            <div className="row__left">Name:</div>
            <div className="row__right">{`${user.firstName} ${user.lastName}`}</div>
          </div>
          <div className="row">
            <div className="row__left">Email:</div>
            <div className="row__right">{user.email}</div>
          </div>
          <div className="row">
            <div className="row__left">Address:</div>
            <div className="row__right">{user.address}</div>
          </div>
          <div className="row">
            <div className="row__left">Gender:</div>
            <div className="row__right">{user.gender}</div>
          </div>
          <div className="row">
            <div className="row__left">Age:</div>
            <div className="row__right">{user.age}</div>
          </div>
          <div className="row">
            <div className="row__left">Description:</div>
            <div className="row__right">{user.description}</div>
          </div>
        </div>
        <div className="avatar">
          <img src={user.avatar} alt="avatar" />
        </div>
      </div>
      <div className="" style={{ marginTop: "20px" }}>
        <Table columns={columns} dataSource={user.posts} pagination={false} />
      </div>
    </div>
  ) : null;
};

export default UserDetail;
