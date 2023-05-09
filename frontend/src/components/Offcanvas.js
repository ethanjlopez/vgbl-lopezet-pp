import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoHomeOutline,
  IoPersonCircleOutline,
  IoCalendarOutline,
  IoLibraryOutline,
  IoDuplicateOutline,
  IoGiftOutline,
  IoCloseCircleOutline,
  IoCaretForwardCircleOutline,
  IoPauseCircleOutline,
  IoStopCircleOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import siteLogo from "../assets/vgbl-logo.svg";
import "../css/Offcanvas.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export const Offcanvas = (props) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const logoutUser = () => {
     logout();
  };

  return (
    <div className={props.className}>
      <div className="sidebar-header">
        <div className="logo-container">
          <a href="/">
            <img className="vgbl-logo" src={siteLogo} alt="logo"></img>
            <p>VGBL</p>
          </a>
        </div>
      </div>
      <div className="sidebar-body clr-accent">
        <div className="divider divider-margin"></div>
        <ul className="">
          <li>
            <NavLink className={"sidebar-item"} to="/">
              <IoHomeOutline className="sidebar-icon" />
              <div>Home</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="profile">
              <IoPersonCircleOutline className="sidebar-icon" />
              <div>Profile</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="calendar">
              <IoCalendarOutline className="sidebar-icon" />
              <div>Calendar</div>
            </NavLink>
          </li>
        </ul>
        <div className="divider divider-margin"></div>
        <div className="clr-accent">Playlists</div>
        <ul>
          <li>
            <NavLink className={"sidebar-item"} to="browse">
              <IoDuplicateOutline className="sidebar-icon" />
              Browse
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="collection">
              <IoLibraryOutline className="sidebar-icon" />
              <div>Collection</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="wishlist">
              <IoGiftOutline className="sidebar-icon" />
              <div>Wishlist</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="playing">
              <IoCaretForwardCircleOutline className="sidebar-icon" />
              <div>Playing</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="planned">
              <IoPauseCircleOutline className="sidebar-icon" />
              <div>Planned</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="completed">
              <IoSparklesOutline className="sidebar-icon" />
              <div>Completed</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="backlog">
              <IoStopCircleOutline className="sidebar-icon" />
              <div>Backlog</div>
            </NavLink>
          </li>
          <li>
            <NavLink className={"sidebar-item"} to="dropped">
              <IoCloseCircleOutline className="sidebar-icon" />
              <div>Dropped</div>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        {user ? (
          <div className="button button-container" onClick={logoutUser}>
            <button className="side-button centered round toggled-off"></button>
            {user.email}
          </div>
        ) : (
          <div className="button-container">
            <button className="button" onClick={props.login}>
              Login
            </button>
            <button className="button" onClick={props.signup}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
