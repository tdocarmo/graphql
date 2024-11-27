import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';  // Utilisation du contexte d'authentification
import LoginForm from './components/Auth/LoginForm';
import Profile from './components/Profile/Profile';
import Header from './components/Header';  // Importer le composant Header
import Footer from './components/Footer';  // Importer le composant Footer

function ProtectedRoute({ children }) {
  const { authToken } = useAuth();  // Utilisation de authToken
  if (!authToken) {
    return <Navigate to="/" />;  // Si l'utilisateur n'est pas authentifié, on redirige vers la page de connexion
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Affichage du header */}
        <Routes>
          <Route path="/" element={<LoginForm />} />  {/* Page de connexion */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />  {/* Page de profil, protégée */}
            </ProtectedRoute>
          } />
        </Routes>
        <Footer /> {/* Affichage du footer */}
      </Router>
    </AuthProvider>
  );
}

export default App;
