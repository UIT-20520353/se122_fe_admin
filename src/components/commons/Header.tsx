import React, { Fragment, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import authApi from "../../api/authApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import default_avatar from "../../assets/images/avatar.png";
import logo from "../../assets/images/logo.png";
import { useHandleResponseError } from "../../hooks/useHandleResponseError";
import { logout, selectProfile, setLoading } from "../../redux/globalSlice";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);

  const userProfileRef = useRef<HTMLDivElement>(null);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState<boolean>(false);

  const onClickOutside = () => {
    setIsShowProfileMenu(false);
  };

  useOnClickOutside(userProfileRef, onClickOutside);

  const handleLogout = async () => {
    dispatch(setLoading("ADD"));
    const { error, ok } = await authApi.logout();
    dispatch(setLoading("REMOVE"));
    if (!ok) {
      handleResponseError(error);
      dispatch(logout());
      navigate("/login");
      return;
    }
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="header">
        <Link to={"/"} className="header__logo header__left">
          <img className="logo" src={logo} alt="logo" />
          <div className="website-name">
            <p>Ielts Tinder</p>
            <p>Communication</p>
          </div>
        </Link>

        <div className="header__right">
          <div className="header__profile" ref={userProfileRef}>
            <div
              className="user-detail"
              onClick={() => setIsShowProfileMenu(true)}
            >
              <p>
                Hello,
                <span>{` ${profile?.firstName || ""} ${
                  profile?.lastName || ""
                }`}</span>
              </p>
              <p>Admin</p>
            </div>
            <img
              className="avatar"
              src={default_avatar}
              alt="avatar"
              onClick={() => setIsShowProfileMenu(true)}
            />

            <div
              className={`dropdown-menu ${
                isShowProfileMenu ? "flex" : "hidden"
              }`}
            >
              <div className="dropdown-menu__item" onClick={handleLogout}>
                <FiLogOut className="text-red font-20" />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Header };
