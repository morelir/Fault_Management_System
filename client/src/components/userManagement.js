import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Users from "./UserManagement/Users";

const UserManagement = (props) => {
  return (
    <Grid>
      <Users />
    </Grid>
  );
};

export default UserManagement;
