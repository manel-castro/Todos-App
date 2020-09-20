import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
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

const App = (props) => {
  /*
    USERS SYSTEM
  */
  useEffect(() => console.log("App did mount"), []);

  const { loggedIn = null } = props;
  console.log("from app: ", loggedIn);
  return (
    <>
      <div className="App">
        <div className="container">
          <Router history={history}>
            {/* {loggedIn === true ? <Redirect to="/app" /> : <Redirect to="/" />} */}

            <Header />
            <div>
              {console.log("fired")}

              <PrivateRoute
                exact
                path="/app"
                component={TodosLayout}
                authenticated={loggedIn}
              />
            </div>

            <Route path="/about" render={() => <About />} />
            <PublicRoute
              path="/"
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
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

export default connect(mapStateToProps)(App);
