import React, { useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import User from "./Users/User";
import AuthContext from "../../store/auth-context";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import CreateNewUserModal from "./Users/User/CreateNewUserModal";

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

  const updateUsers = (users) => {
    setUsers(users);
  };

  useEffect(async () => {
    await getUsers();
  }, []);

  return !users.length ? (
    <h1 align="center">No users</h1>
  ) : (
    <>
      {/* <form style={{marginLeft:"15px"}} action="GalleryAdvancedSearch" method="post" class="d-flex flex-row bd-highlight mb-3">
      <div class="p-2 bd-highlight">
          
          <input type="date" name="movie.LASTDATE" id="date" class="form-control" required/>
      </div>
      <div class="p-2 bd-highlight">
         
          <input type="time" name="FromTime" id="time" class="form-control" required/>
      </div>
      <div class="p-2 bd-highlight">
          <div class="form-group col-md-4">
              <label for="inputState">Category:</label>
             
             
          </div>
      </div>
      <div class="p-2 bd-highlight">
    
          <div class="d-flex justify-content-start">
              <input type="range" name="movie.PRICE" value="24" min="1" max="100" oninput="this.nextElementSibling.value = this.value" required/>
              <output>24</output>
          </div>
      </div>
      <div class="p-2 bd-highlight">
          <button type="submit" class="btn btn-outline-success" id="btnsrc">Search</button>
      </div>
    </form> */}
      {/* <div className="mb-2">
        <Button variant="primary" size="lg">
          Create New User
        </Button> */}
        {/* <Button variant="secondary" size="lg">
          Block level button
        </Button> */}
      {/* </div> */}

      <CreateNewUserModal updateUsers={updateUsers}/>

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
            <Grid style={{paddingRight:'70px'}} item xs={4} sm={2} key={user._id} item>
              <User user={user} updateUsers={updateUsers} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Users;
