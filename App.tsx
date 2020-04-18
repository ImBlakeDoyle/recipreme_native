import React from 'react';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { AppRegistry} from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import Navigator from "./AppNavigator";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
      console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
      );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([errorLink, httpLink]);


const client = new ApolloClient({
  cache,
  link,
  connectToDevTools: true
});

const App = () => {

  return (
  <ApolloProvider client={client}>
    <Navigator />
  </ApolloProvider>
  )
}

AppRegistry.registerComponent('MyApp', () => App);

export default App;