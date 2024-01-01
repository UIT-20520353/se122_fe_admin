import React from "react";
import "./Menu.style.css";
import { useNavigate } from "react-router-dom";

interface IMenuProps {}

const Menu: React.FunctionComponent<IMenuProps> = () => {
  const navigate = useNavigate();
  const handleNavigate = (url: string) => {
    navigate(url);
  }

  return (
    <>
      <div className="homeWrapper">
        <div className="d-flex align-items-start">
          <div
            className="nav flex-column nav-pills me-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <button
              className="nav-link active customMenuItem"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="false"
              type="button"
              onClick={() => handleNavigate('/')}
            >
              Home
            </button>
            <button
              className="nav-link customMenuItem"
              id="v-pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
              type="button"
              onClick={() => handleNavigate('/calendar')}
            >
              Calendar
            </button>
            <button
              className="nav-link customMenuItem"
              id="v-pills-disabled-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-disabled"
              role="tab"
              aria-controls="v-pills-disabled"
              aria-selected="false"
              type="button"
              onClick={() => handleNavigate('/matching')}
            >
              Matching
            </button>
            <button
              className="nav-link customMenuItem"
              id="v-pills-settings-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-settings"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected="false"
              type="button"
              onClick={() => handleNavigate('/profile')}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
      <div className="menuSpacer"></div>
    </>
  );
};

export default Menu;
