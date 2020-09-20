import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  console.log("from privateRoute", authenticated);
  useEffect(() => console.log("PrivateRoute did mount"), []);
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
