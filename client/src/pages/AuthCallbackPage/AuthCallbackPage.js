import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Switch, Route, Redirect } from "react-router-dom";

function AuthCallbackPage() {
  const { user } = useAuth0();

  const roles = user && user[process.env.REACT_APP_AUTH0_ROLES_NAMESPACE];

  const hasAdminRole = () =>
    roles && roles.some((role) => role === "Administrator");

  const switchRoutes = (
    <Switch>
      {/* Redirect after auth */}
      {hasAdminRole() ? (
        <Redirect from="/callback" to="/admin" />
      ) : (
        <Redirect from="/callback" to="/" />
      )}
    </Switch>
  );

  return <div>{switchRoutes}</div>;
}

export default AuthCallbackPage;
