import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const LogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <ul className="nav-links">
      {!isLoggedIn ? (
        <li>
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/" exact onClick={LogoutHandler}>
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
