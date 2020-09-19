import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as todosActions from "./redux/actions/todosActions";
import * as userActions from "./redux/actions/userActions";
import PropTypes from "prop-types";
import { history } from "./components/_helpers/history";
import { Router } from "react-router-dom";

import Header from "./components/layout/Header";
import TodosLayout from "./components/todos-page/TodosLayout";
import LoginPage from "./components/login-page/LoginPage";
import About from "./components/about/About";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";

// import uuid from 'uuid';
import "./App.css";

/* 
++++++++++TODOS++++++++++++++
- User System (if you're logout it don't shows you the todo's page)
- Efficiency problem: change in single todo request to database all of them.
- Add 404 page
- Add username slugs (make public button?)
- About button to go to Todos page

Near todos.
- Connect to redux all todos
- Use private and public routes to manage redirects. 
- Solve the branch (we're in tmp now)
- Manage errors
- Apply bootstrap

*/

const firebase = require("firebase");

const App = (props) => {
  /*
    USERS SYSTEM
  */
  const {
    getTodos,
    userLoginSuccess,
    userLogoutSuccess,
    loggedIn = false,
  } = props;
  console.log(loggedIn);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //I keep action creators separated
        // for easy understanding in case to add new features.
        userLoginSuccess(user.uid);
        getTodos();
      } else {
        userLogoutSuccess();
      }
    });
  }, []);

  return (
    <>
      <div className="App">
        <div className="container">
          <Router history={history}>
            <Header />

            <PrivateRoute
              exact
              path="/"
              component={TodosLayout}
              authenticated={loggedIn}
            />

            <Route path="/about" render={() => <About />} />
            <PublicRoute
              path="/login"
              component={LoginPage}
              authenticated={loggedIn}
            />
          </Router>
        </div>
      </div>
    </>
  );
};

App.propTypes = {
  getTodos: PropTypes.func.isRequired,
  userLoginSuccess: PropTypes.func.isRequired,
  userLogoutSuccess: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.loggedIn ? state.loggedIn : false,
  };
}

const mapDispatchToProps = {
  getTodos: todosActions.getTodos,
  userLoginSuccess: userActions.userLoginSuccess,
  userLogoutSuccess: userActions.userLogoutSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
