import React, { Fragment } from "react";
import Navbarr from "./components/layout/Navbarr";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Homee";
import Login from "./components/auth/Login";
import About from "./components/pages/Aboutt";
import Register from "./components/auth/Register";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import Alerts from "./components/layout/Alerts";
import AlertState from "./context/alert/AlertState";
import setAuthtoken from "./utills/setAuthtoken ";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";
if (localStorage.token) {
  setAuthtoken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbarr />
            <Fragment>
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
