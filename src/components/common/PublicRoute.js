import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? (
          <Component props={props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PublicRoute;
