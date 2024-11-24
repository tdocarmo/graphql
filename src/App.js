import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';  // Utilisation du contexte d'authentification
import LoginForm from './components/Auth/LoginForm';
import Profile from './components/Profile/Profile';

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
        <Routes>
          <Route path="/" element={<LoginForm />} />  {/* Page de connexion */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />  {/* Page de profil, protégée */}
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
