import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import Axios from "axios";

import "./NavLinks.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const LogoutHandler = () => {
    authCtx.logout();
    // history.replace("/login");
  };

  // let [teams, setTeams] = useState([]);
  // const getTeams = async () => {
  //   try {
  //     let response = await Axios.get(`faultManagement/teams`);
  //     let _teams = response.data.map((team) => {
  //       return team.name;
  //     });
  //     setTeams(_teams);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getTeams();
  // }, []);

  return (
    <ul className="nav-links">
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
              <NavLink to="/faultManagement" exact>
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
