import React, { useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import User from "./Users/User";
import Axios from "axios";

const Users = (props) => {
  const [users,setUsers]=useState([])
//   const patients = useSelector((state) => state.patients);
  const classes = useStyles();

  const getUsers = async () => {
    try {
      let response = await Axios.get("/users");
      console.log(response.data)
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getUsers();
  }, []);

  return !users.length ? (
    <h1 align="center">No users</h1>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={5}
    >
      {users.map((user) => (
        <Grid key={user._id} item>
          <User user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Users;
