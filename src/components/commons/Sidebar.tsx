import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  return (
    <div className="sidebar">
      <NavLink className={"sidebar__button"} to={"/"}>
        <PiUsersThreeFill className={"icon"} />
        User Management
      </NavLink>
      <NavLink className={"sidebar__button"} to={"/tests"}>
        <FaFileAlt className={"icon"} />
        Test Management
      </NavLink>
    </div>
  );
};

export { Sidebar };
