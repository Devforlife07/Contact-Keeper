import React from "react";
import Navbar from "./components/layout/navbar.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/AuthState.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/login.jsx";
import AlertState from "./context/alert/AlertState.jsx";
import SetAuthToken from "./utils/setAuthToken";
import Alert from "./components/layout/alert.jsx";
import PrivateRoute from "./components/routing/privateRoute";
import "./App.css";
if (localStorage.token) {
  SetAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />

              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
