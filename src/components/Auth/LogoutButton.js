import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importation de `useNavigate` pour rediriger après la déconnexion
import { useAuth } from '../../context/AuthContext'; // Importation du contexte d'authentification

const LogoutButton = () => {
  const navigate = useNavigate();  // Hook pour gérer la redirection
  const { logout } = useAuth();  // Récupération de la fonction logout du contexte

  const handleLogout = () => {
    logout();  // Appeler la fonction logout du contexte pour supprimer le token
    navigate('/');  // Rediriger vers la page de connexion
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;
