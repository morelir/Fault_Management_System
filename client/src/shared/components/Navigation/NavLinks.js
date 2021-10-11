import React, { useContext,useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import Axios from "axios";

import "./NavLinks.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  let [teams,setTeams]=useState([]);


  const LogoutHandler = () => {
    authCtx.logout();
  };

  const getTeams = async () => {
    try {
      let response = await Axios.get(`faultManagement/teams`);
      let _teams=response.data.map((team)=>{return team.name})
      setTeams(_teams)
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact >
          Home
        </NavLink>
      </li>
      {isLoggedIn && teams.includes(authCtx.user.team) &&
        <li>
          <NavLink to="/faultManagement" exact >
            Fault Management
          </NavLink>
        </li>
      }
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
