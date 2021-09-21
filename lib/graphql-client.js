import { ApolloClient, InMemoryCache } from "@apollo/client";

export const gqlClient = new ApolloClient({
  uri: process.env.HEROKU_BASE_URL + "/graphql",
  // uri: process.env.HEROKU_BASE_TNC + "/graphql",
  // uri: process.env.STRAPI_LOCAL_BASE_URL + "/graphql",
  cache: new InMemoryCache(),
});
