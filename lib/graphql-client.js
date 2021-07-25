import { ApolloClient, InMemoryCache } from "@apollo/client";

export const gqlClient = new ApolloClient({
  uri: process.env.HEROKU_BASE_URL + "/graphql",
  cache: new InMemoryCache(),
});
