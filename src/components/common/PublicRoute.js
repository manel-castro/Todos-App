import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PublicRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  console.log("authenticated is: " + authenticated);
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
