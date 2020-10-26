import React, { useEffect, useRef } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { history } from "./components/_helpers/history";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TodosLayout from "./components/todos-page/TodosLayout";
import LoginPage from "./components/login-page/LoginPage";
import About from "./components/about/About";
import NotFoundPage from "./components/not-found/NotFoundPage";

import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";

import { ThemeProvider } from "styled-components";
import { themeGen } from "./theme.js";
import GlobalStyle, { Container, Spinner } from "./globalStyles";
// import uuid from 'uuid';

const App = (props) => {
  const { loggedIn, colors } = props;

  const theme = themeGen(colors);

  const container = useRef(null);
  const autosize = (ref) => {
    console.log("resized");
    if (window.screen.width < 960) {
      ref.current.style.height = `${window.outerHeight}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("load", autosize(container));
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container ref={container}>
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
            {loggedIn === null ? (
              <Route
                render={() => (
                  <Spinner
                    primary
                    fontSize="10px"
                    size="10em"
                    style={{ marginTop: "60px" }}
                  />
                )}
              />
            ) : null}
            {loggedIn !== null ? (
              <Route render={() => <NotFoundPage />} />
            ) : null}
          </Switch>
          <Footer />
        </Container>
      </ThemeProvider>
    </Router>
  );
};

App.propTypes = {
  loggedIn: PropTypes.any,
  colors: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  console.log("from redux", state.colors);
  return {
    loggedIn: state.user.loggedIn,
    colors: state.colors,
  };
}

export default connect(mapStateToProps)(App);
