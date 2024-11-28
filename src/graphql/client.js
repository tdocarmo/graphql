import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL, // URL de l'API GraphQL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("tokenAuth");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Gestion des erreurs globales
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          console.log("Utilisateur non authentifié. Redirection...");
          // Tu peux appeler logout ou rediriger vers la page de connexion
          break;
        case "FORBIDDEN":
          console.error("Accès refusé !");
          break;
        default:
          console.error(`Erreur GraphQL: ${err.message}`);
      }
    }
  }

  if (networkError) {
    console.error(`Erreur réseau : ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
