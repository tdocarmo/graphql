import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Utilisation du contexte d'authentification
import { jwtDecode } from 'jwt-decode';
const Header = () => {
  const { authToken, logout } = useAuth(); // Récupérer le token et la fonction logout
  const user = authToken ? jwtDecode(authToken) : null;  // Décodage du token JWT pour récupérer l'utilisateur

  return (
    <header style={{ padding: '10px 20px', backgroundColor: '#84C3CE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo (ici une simple image mais à personnaliser) */}
        <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '20px' }} />
        <h1 style={{ color: '#fff' }}>Mon Application</h1>
      </div>
      
      {authToken ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Icône utilisateur + nom */}
          <div style={{ color: '#fff', marginRight: '20px' }}>
            <span>{user.firstName} {user.lastName}</span> {/* Affichage du nom */}
          </div>
          
          {/* Bouton de déconnexion */}
          <button onClick={logout} style={{ backgroundColor: '#7B6A6A', color: '#fff', padding: '5px 10px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            Se déconnecter
          </button>
        </div>
      ) : (
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Se connecter</Link>
      )}
    </header>
  );
};

export default Header;
