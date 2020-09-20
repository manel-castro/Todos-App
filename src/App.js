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
import NotFoundPage from "./components/not-found/NotFoundPage";

import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import Spinner from "./components/_utils/Spinner";

// import uuid from 'uuid';
import "./App.css";

/* 
++++++++++TODOS++++++++++++++
- User System (if you're logout it don't shows you the todo's page)
- Efficiency problem: change in single todo request to database all of them.
- Add 404 page
- Add username slugs (make public button?)

Near todos.
- Apply bootstrap

*/

const App = (props) => {
  const { loggedIn } = props;

  return (
    <>
      <div className="App">
        <div className="container">
          <Router history={history}>
            <Header />
            <Switch>
              <Route path="/about" render={() => <About history={history} />} />

              {loggedIn !== null ? (
                <PrivateRoute
                  exact
                  path="/app"
                  component={TodosLayout}
                  authenticated={loggedIn}
                />
              ) : null}

              {loggedIn !== null ? (
                <PublicRoute
                  exact
                  path="/"
                  component={LoginPage}
                  authenticated={loggedIn}
                />
              ) : null}
              <Route render={() => <NotFoundPage />} />
            </Switch>
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
