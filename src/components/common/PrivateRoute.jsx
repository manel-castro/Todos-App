import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  authenticated: PropTypes.any.isRequired, //Pending correction.
  location: PropTypes.object,
};
