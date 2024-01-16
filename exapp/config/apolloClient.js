import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getValueFor, save } from "../helpers/secure";

const httpLink = createHttpLink({
  uri: "http://18.207.119.185/",
  
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getValueFor("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
