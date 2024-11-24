import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Utilisation de la variable d'environnement pour l'URL de l'API
const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URL,  // Utilisation de l'URL définie dans .env
    headers: {
      // Vérification que le token existe avant de l'ajouter dans les headers
      Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,  // Si pas de token, on envoie une chaîne vide
    },
  }),
  cache: new InMemoryCache(),  // Utilisation d'un cache pour Apollo
});

export default client;
