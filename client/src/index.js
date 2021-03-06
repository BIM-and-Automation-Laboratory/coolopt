import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import AuthorizedApolloProvider from "./auth/authorized-apollo-provider";
import { NotificationProvider } from "./components/Notifications/NotificationContext";
import { ModelDataContextProvider } from "./components/ChooseModels/ModelDataContext";

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <AuthorizedApolloProvider>
        <NotificationProvider>
          <ModelDataContextProvider>
            <App />
          </ModelDataContextProvider>
        </NotificationProvider>
      </AuthorizedApolloProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
