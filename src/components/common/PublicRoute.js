import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function PublicRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/app" />
        )
      }
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.object.isRequired,
  authenticated: PropTypes.any.isRequired,
};
