import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Users from "./UserManagement/Users";
import NavBar from "./UserManagement/NavBar";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const UserManagement = (props) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getUsers = async () => {
    try {
      let response = await Axios.get("/users");
      console.log(response.data);
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(async () => {
    await getUsers();
  }, []);
  const updateUsers = (users) => {
    setUsers(users);
  };

  return isLoading ? (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  ) : (
    <Grid>
      <NavBar updateUsers={updateUsers}/>
      <Users users={users}/>
    </Grid>
  );
};

export default UserManagement;
