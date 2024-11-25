import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState(""); // Nom ou email
  const [password, setPassword] = useState(""); // Mot de passe
  const [error, setError] = useState(""); // Message d'erreur
  const { login, AUTH_URL } = useAuth(); // Récupération du contexte
  const navigate = useNavigate(); // Navigation après login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = `${identifier}:${password}`;
      const encodedCredentials = btoa(credentials);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      };

      console.log("Tentative de connexion à :", AUTH_URL);

      const response = await axios.post(AUTH_URL, {}, { headers });

      if (response.data) {
        console.log("Réponse du serveur :", response.data);
        login(response.data); // Stockage du token
        navigate("/profile"); // Redirection
      } else {
        setError("Erreur : aucun token reçu.");
      }
    } catch (error) {
      console.error("Erreur :", error.response || error.message);
      setError(
        error.response?.data?.message ||
          "Erreur de connexion. Vérifiez vos identifiants."
      );
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="identifier">Nom d'utilisateur ou Email :</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
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
