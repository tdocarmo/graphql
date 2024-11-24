import React from 'react';
import ReactDOM from 'react-dom/client';  // Importation de createRoot
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';  // Client Apollo pour les requêtes GraphQL
import './styles/main.css';
import App from './App';

// Créer un root avec React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utilisation de root.render au lieu de ReactDOM.render
root.render(
  <ApolloProvider client={client}> {/* ApolloProvider permet d'utiliser Apollo Client */}
    <App />
  </ApolloProvider>
);
