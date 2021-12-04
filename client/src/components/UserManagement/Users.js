import React, { useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import User from "./Users/User";
import AuthContext from "../../store/auth-context";
import Axios from "axios";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  //   const patients = useSelector((state) => state.patients);
  const classes = useStyles();
  const authCtx = useContext(AuthContext);

  
  const getUsers = async () => {
    try {
      let response = await Axios.get("/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUsers= (users)=>{
    setUsers(users);
  }

  useEffect(async () => {
    await getUsers();
  }, []);

  return !users.length ? (
    <h1 align="center">No users</h1>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={5}
    >
      {users
        .filter((user) => {
          if (
            authCtx.user.role === "system administrator" &&
            user.role !== "system administrator"
          )
            return true;
          return (
            authCtx.user.role === "team leader" &&
            user.team === authCtx.user.team
          );
        })
        .map((user) => (
          <Grid item xs={4} sm={2} key={user._id} item>
            <User user={user} updateUsers={updateUsers} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Users;
