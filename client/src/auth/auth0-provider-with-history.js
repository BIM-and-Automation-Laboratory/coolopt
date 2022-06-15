import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const reactAppStage = process.env.REACT_APP_STAGE;

  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={`${window.location.origin}/callback`}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
