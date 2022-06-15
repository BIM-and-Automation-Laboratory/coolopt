import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from
} from "@apollo/client";
import { onError } from "@apollo/client/link/error"
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || "/graphql",
  });
  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    connectToDevTools: true,
    cache,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
