import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircleSpinner from "../components/CircleSpinner/CircleSpinner";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <CircleSpinner />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
