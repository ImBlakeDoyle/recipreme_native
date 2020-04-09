import React, { ReactNode } from 'react';
import { AppRegistry} from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import Navigator from "./AppNavigator";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
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