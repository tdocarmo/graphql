import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState(""); // Nom d'utilisateur ou email
  const [password, setPassword] = useState(""); // Mot de passe
  const [error, setError] = useState(""); // Message d'erreur
  const { login, AUTH_URL } = useAuth(); // Utilisation du contexte Auth
  const navigate = useNavigate(); // Pour la redirection après la connexion

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Combinaison des identifiants en format 'username:password'
      const credentials = `${identifier}:${password}`;

      // Encodage en Base64 de la chaîne 'username:password'
      const encodedCredentials = btoa(credentials);

      // Construction des headers avec l'authentification Basic
      const headers = {
        "Content-Type": "application/json", // Le type de contenu
        "Authorization": `Basic ${encodedCredentials}`, // Authentification Basic avec Base64
      };

      console.log("Tentative de connexion à l'URL :", AUTH_URL);
      console.log("Envoi des données : ", { identifier, password }); // Log des données envoyées

      // Envoi de la requête POST avec Basic Auth dans les headers
      const response = await axios.post(
        AUTH_URL, 
        {},  // Aucun corps de requête nécessaire, car l'authentification est dans les headers
        { headers } // Ajout des headers à la requête
      );

      console.log("Réponse du serveur : ", response);  // Log de la réponse complète du serveur

      if (response.data.token) {
        login(response.data.token); // Stocke le token dans le contexte
        navigate("/profile"); // Redirection vers la page profil
      } else {
        setError("Aucun token reçu, veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur d'authentification:", error.response || error.message);  // Log d'erreur complet
      if (error.response) {
        console.log("Détails de l'erreur : ", error.response.data);
        setError(error.response?.data?.message || "Erreur de connexion. Vérifiez vos informations.");
      } else {
        setError("Erreur de connexion. Veuillez vérifier votre connexion réseau.");
      }
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identifier">Nom d'utilisateur ou Email:</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Nom d'utilisateur ou Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
