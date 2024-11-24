import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Récupération des variables d'environnement pour l'API GraphQL et l'authentification REST
const API_URL = process.env.REACT_APP_API_URL;  // URL pour GraphQL
const AUTH_URL = process.env.REACT_APP_AUTH_URL; // URL pour l'authentification REST

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour accéder au contexte Auth
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider : Fournisseur de contexte qui gère l'état d'authentification
export const AuthProvider = ({ children }) => {
  // Initialisation de l'état authToken à partir du localStorage ou valeur initiale
  const [authToken, setAuthToken] = useState(localStorage.getItem("tokenAuth"));

  // Fonction pour vérifier si le token est expiré
  const isTokenExpired = useCallback((token) => {
    if (token && token.split('.').length === 3) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Décodage du token JWT
        return decoded.exp * 1000 < Date.now(); // Vérification de la date d'expiration
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        return true; // Si décodage échoue, on considère que le token est expiré
      }
    }
    return true; // Si ce n'est pas un token JWT, il est considéré comme expiré
  }, []);

  // Fonction de login
  const login = (newToken) => {
    setAuthToken(newToken);  // Mise à jour du token dans le state
    localStorage.setItem("tokenAuth", newToken);  // Stockage du token dans le localStorage
  };

  // Fonction de logout
  const logout = useCallback(() => {
    setAuthToken(null);  // Suppression du token dans le state
    localStorage.removeItem("tokenAuth");  // Suppression du token du localStorage
  }, []);

  // Effet pour vérifier l'expiration du token à chaque changement de `authToken`
  useEffect(() => {
    if (authToken && isTokenExpired(authToken)) {
      logout();  // Appel de `logout` si le token est expiré
    }
  }, [authToken, isTokenExpired, logout]);

  return (
    <AuthContext.Provider value={{ authToken, login, logout, API_URL, AUTH_URL }}>
      {children}  {/* Rendu des composants enfants */}
    </AuthContext.Provider>
  );
};
