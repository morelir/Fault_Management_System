import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Home from "./components/home";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Login from "./components/login";
import Registration from "./components/registration";
import AuthContext from "./store/auth-context";
import FaultManagement from "./components/fault_management";
import Axios from "axios";
import ProtectedRoute from "./routes/protectedRoute";
import UserManagement from "./components/userManagement";

const App = () => {
  const authCtx = useContext(AuthContext);
  // const [teams, setTeams] = useState([]);
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
    <Router>
      <MainNavigation />
      <main>
        <div className="App">
          <header></header>
          <h1></h1>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <ProtectedRoute
              condition={!authCtx.isLoggedIn}
              component={Login}
              path="/login"
            />
            <ProtectedRoute
              condition={!authCtx.isLoggedIn}
              component={Registration}
              path="/registration"
            />
            <ProtectedRoute
              condition={
                authCtx.isLoggedIn &&
                (authCtx.user.team === "Customer service" ||
                  authCtx.user.team === "Technical service")
              }
              component={FaultManagement}
              path="/faultManagement"
            />
            <ProtectedRoute
              condition={
                authCtx.isLoggedIn &&
                (authCtx.user.role === "system administrator" ||
                  authCtx.user.role === "team leader")
              }
              component={UserManagement}
              path="/userManagement"
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
