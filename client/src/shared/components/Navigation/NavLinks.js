import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import Axios from "axios";
import {capitalizeFirstLetter} from "../../../utils/functions"

import "./NavLinks.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const LogoutHandler = () => {
    authCtx.logout();
    // history.replace("/login");
  };


  return (
    <ul className="nav-links">
      {isLoggedIn && (
        <li>
          <div style={{ color: "#88989b" }}>
            <div style={{textAlign:"center"}}>Hello, {capitalizeFirstLetter(authCtx.user.name)}</div>
            <div style={{textAlign:"center"}}> {`${authCtx.user.role==="system administrator" ? "System Administrator": authCtx.user.team }`}</div>
          </div>
        </li>
      )}
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {!isLoggedIn ? (
        <li>
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
      ) : (
        <>
          {(authCtx.user.team === "Customer service" ||
            authCtx.user.team === "Technical service") && (
            <li>
              <NavLink to="/faultManagement" exact>
                Fault Management
              </NavLink>
            </li>
          )}
          {(authCtx.user.team === "Stock" ||
            authCtx.user.team === "Purchase") && (
            <li>
              <NavLink to="/requestManagement" exact>
                Request Management
              </NavLink>
            </li>
          )}
          {(authCtx.user.role === "system administrator" ||
            authCtx.user.role === "team leader") && (
            <li>
              <NavLink to="/userManagement" exact>
                User Management
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/" exact onClick={LogoutHandler}>
              Logout
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
