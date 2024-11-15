import "../assets/css/sidebar.css";
import {NavLink} from "react-router-dom";

import EMSLogo from "../assets/img/ems-logo.jpeg"
import {useContext, useEffect} from "react";
import {UserContext} from "../context.jsx";
import axios from "axios";
import {useNavigate} from "react-router";

const Sidebar = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/users/logout`,
      withCredentials: true,
      body: {}
    })
      .then(res => {
        setUser({isAuthenticated: false, user: null})
        navigate('/login');
      })
  }

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <nav id="sidebar">
      <div id="sidebar-upper">
        <div id="sidebar-brand">
          <img id="sidebar-brand-logo" src={EMSLogo} alt="EMS Logo" />
          <div>
            <p id="sidebar-brand-title">Exeter Maths School</p>
            <p id="sidebar-brand-name">Clubs and Societies</p>
          </div>
        </div>
        <div className="sidebar-nav">
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon sidebar-nav-icon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l-2 0l9 -9l9 9l-2 0"/>
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
            </svg>
            Dashboard
          </NavLink>
          <NavLink to="/clubs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon sidebar-nav-icon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2"/>
            </svg>
            All Clubs
          </NavLink>
          <NavLink to="/request">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon sidebar-nav-icon"
            >
              <path d="M8 9h8"/>
              <path d="M8 13h6"/>
              <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"/>
            </svg>
            Club Requests
          </NavLink>
          <NavLink to="/events">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon sidebar-nav-icon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3"/>
              <path d="M16 3v4"/>
              <path d="M8 3v4"/>
              <path d="M4 11h10"/>
              <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
              <path d="M18 16.5v1.5l.5 .5"/>
            </svg>
            All Events
          </NavLink>
          <NavLink to="/settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon sidebar-nav-icon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path
                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
            </svg>
            Settings
          </NavLink>
          <NavLink to="/admin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon sidebar-nav-icon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5"/>
            </svg>
            Admin
          </NavLink>
        </div>
      </div>
      <div id="sidebar-account" className="sidebar-nav">
        <a onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon sidebar-nav-icon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
            <path d="M9 12h12l-3 -3"/>
            <path d="M18 15l3 -3"/>
          </svg>
          Log Out
        </a>
        <a className="sidebar-account-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon sidebar-nav-icon"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 10a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M6 21v-1a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v1" />
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
          </svg>
          {user.user.email}
        </a>
      </div>
    </nav>
  );
}

export default Sidebar;