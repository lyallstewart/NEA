import "../assets/css/sidebar.css";
import { NavLink } from "react-router-dom";

import EMSLogo from "../assets/img/ems-logo.jpeg";
import { useContext, useEffect } from "react";
import { UserContext } from "../context.jsx";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  BiHome,
  BiFolderPlus,
  BiCalendar,
  BiCog,
  BiMessageAltDetail,
  BiUserCircle,
  BiLogOut,
  BiCheckSquare,
  BiListCheck,
  BiUserPin,
  BiCalendarStar,
} from "react-icons/bi";

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/users/logout`,
      withCredentials: true,
      body: {},
    }).then((res) => {
      setUser({ isAuthenticated: false, user: null });
      navigate("/login");
    });
  };

  return (
    <nav id="sidebar">
      <div id="sidebar-upper">
        <div id="sidebar-brand">
          <img id="sidebar-brand-logo" src={EMSLogo} alt="EMS Logo" />
          <div id="sidebar-brand-wrapper">
            <p id="sidebar-brand-title">Exeter Maths School</p>
            <p id="sidebar-brand-name">Clubs and Societies</p>
          </div>
        </div>
        <div className="sidebar-nav">
          <NavLink to="/">
            <BiHome className="icon sidebar-nav-icon" /> Dashboard
          </NavLink>
          <NavLink to="/clubs">
            <BiFolderPlus className="icon sidebar-nav-icon" />
            All Clubs
          </NavLink>
          <NavLink to="/events">
            <BiCalendar className="icon sidebar-nav-icon" />
            All Events
          </NavLink>
          <NavLink to="/settings">
            <BiCog className="icon sidebar-nav-icon" />
            Settings
          </NavLink>
          <NavLink to="/request">
            <BiMessageAltDetail className="icon sidebar-nav-icon" />
            Club Requests
          </NavLink>
        </div>
        {user.user.isSuperuser ? (
          <>
            <hr id="sidebar-admin-separator" />
            <p id="sidebar-admin-header">Admin</p>
            <div className="sidebar-nav">
              <NavLink to="/admin/approvals">
                <BiCheckSquare className="icon sidebar-nav-icon" />
                Club Approvals
              </NavLink>
              <NavLink to="/admin/logs">
                <BiListCheck className="icon sidebar-nav-icon" />
                Audit Logs
              </NavLink>
              <NavLink to="/admin/users">
                <BiUserPin className="icon sidebar-nav-icon" />
                Manage Users
              </NavLink>
              <NavLink to="/admin/scheduling">
                <BiCalendarStar className="icon sidebar-nav-icon" />
                Manage Scheduling
              </NavLink>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div id="sidebar-account" className="sidebar-nav">
        <a onClick={handleLogout}>
          <BiLogOut className="icon sidebar-nav-icon" />
          Log Out
        </a>
        <a className="sidebar-account-button">
          <BiUserCircle className="icon sidebar-nav-icon" />
          {user.user.firstName + " " + user.user.lastName}
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
