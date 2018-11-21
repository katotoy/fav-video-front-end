import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  const userID = props.userID;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">FavVideos</span>
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li>
            <NavLink className="nav-item nav-link" to="/">
              Home
            </NavLink>
          </li>
          {userID && (
            <React.Fragment>
              <li>
                <NavLink className="nav-item nav-link" to="/myshare">
                  My Share
                </NavLink>
              </li>

              <li>
                <NavLink className="nav-item nav-link" to="/video_detail/">
                  New Video
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>

        <ul className="nav navbar-nav navbar-right">
          {!userID && (
            <React.Fragment>
              <li>
                <NavLink className="nav-item nav-link" to="/sign_up">
                  Sign-Up
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {userID && (
            <React.Fragment>
              <li>
                <NavLink className="nav-item nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
