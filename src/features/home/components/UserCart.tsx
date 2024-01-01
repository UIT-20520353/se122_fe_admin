import React from "react";
import { UserModel } from "../../../models/user";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FaBirthdayCake, FaHome } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { useAppDispatch } from "../../../app/hooks";
import { setLoading } from "../../../redux/globalSlice";
import requestApi from "../../../api/requestApi";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";

interface UserCartProps {
  user: UserModel;
  index: number;
  statusButtons: boolean[];
  updateStatusButtons: (index: number) => void;
}

const UserCart: React.FunctionComponent<UserCartProps> = ({
  user,
  index,
  statusButtons,
  updateStatusButtons,
}) => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();

  const handleSendClick = async (userId: number, type: "SEND" | "CANCEL") => {
    dispatch(setLoading("ADD"));
    const { error, ok } =
      type === "SEND"
        ? await requestApi.sendRequest(userId)
        : await requestApi.cancelRequestByUserId(userId);
    dispatch(setLoading("REMOVE"));

    if (ok) {
      updateStatusButtons(index);
    } else handleResponseError(error);
  };

  return (
    <div className="user-cart">
      <div>
        <div className="user-cart__header">
          <img className="avatar" src={user.avatar} />
          <div className="user-detail">
            <p className="user-name">{`${user.firstName} ${user.lastName}`}</p>
            <div className="other-infor">
              <div className="column">
                {user.gender === "Male" ? (
                  <IoMdMale className="gender-icon" />
                ) : (
                  <IoMdFemale className="gender-icon" />
                )}
                <span>{user.gender}</span>
              </div>
              <div className="column">
                <FaBirthdayCake className="gender-icon" />
                <span>{user.age}</span>
              </div>
              <div className="column">
                <FaHome className="gender-icon" />
                <span>{user.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="user-cart__level">
          <div className="column">
            <TbTargetArrow className="target-icon green" />
            <p>
              Overall <span className="data">{user.overall}</span>
            </p>
          </div>
          <div className="column">
            <TbTargetArrow className="target-icon red" />
            <p>
              Target <span className="data">{user.target}</span>
            </p>
          </div>
        </div>
        <div className="user-cart__description">
          <p>{user.description || "No description."}</p>
        </div>
      </div>
      <button
        className={`${statusButtons[index] ? "sent" : ""} btn-send `}
        onClick={() =>
          handleSendClick(user.id, statusButtons[index] ? "CANCEL" : "SEND")
        }
      >
        {statusButtons[index] ? "Cancel Request" : "Send Request"}
      </button>
    </div>
  );
};

export default UserCart;
