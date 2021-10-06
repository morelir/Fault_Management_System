import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";

import Home from "./components/home";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Login from "./components/login";
import Registration from "./components/registration";
import AuthContext from "./store/auth-context";
import FaultManagement from "./components/fault_management";

const App = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx)
  return (
    <Router>
      <MainNavigation />
      <main>
        <div className="App">
          <header></header>
          <h1></h1>
          <Switch>
            <Route exact path="/" component={Home}></Route>
           
            <Route
              exact
              path="/faultManagement"
              component={FaultManagement}
            ></Route>

            {!authCtx.isLoggedIn && (
              <>
                <Route exact path="/login" component={Login}></Route>
                <Route
                  exact
                  path="/registration"
                  component={Registration}
                ></Route>
              </>
            )}
            
            
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
