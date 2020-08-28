import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Auth } from "../services/Auth";
import { BasicProps } from "antd/lib/layout/layout";

interface PrivateRouteInterface extends BasicProps {
  component: React.ReactType;
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteInterface> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
