import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Contexte d'authentification
import { jwtDecode } from "jwt-decode"; // Décodage du token JWT
import { GET_USER_PROFILE } from "../../graphql/queries"; // Requête GraphQL
import { useQuery } from "@apollo/client"; // Hook GraphQL

const Profile = () => {
  const { authToken, logout } = useAuth(); // Récupérer le token et la fonction logout
  const [error, setError] = useState(null); // Gérer les erreurs
  const [decodedToken, setDecodedToken] = useState(null); // Contient les informations du token décodé

  // Décoder le token JWT pour récupérer les informations utilisateur
  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        console.log("Token décodé :", decoded); // Log pour debug
        setDecodedToken(decoded); // Stocker les données décodées
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
        setError("Erreur lors du décodage du token.");
      }
    }
  }, [authToken]);

  // Requête GraphQL pour récupérer les données du profil utilisateur
  const { data, loading, error: queryError } = useQuery(GET_USER_PROFILE, {
    skip: !authToken, // Ne pas exécuter si aucun token n'est présent
  });

  useEffect(() => {
    if (data) {
      console.log("Données de l'utilisateur :", data); // Vérifiez la réponse
    }
  }, [data]);

  if (!authToken) {
    return <div>Vous devez vous connecter pour accéder à votre profil.</div>;
  }

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (queryError) {
    return (
      <div>
        Erreur lors de la récupération du profil : {queryError.message}
      </div>
    );
  }

  // Utilisateur extrait de la requête GraphQL
  const user = data?.user?.[0]; // Accède au premier utilisateur

  return (
    <div>
      <h1>Profil</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
      {user ? (
        <div>
          <p>
            <strong>Bienvenue</strong>, {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Audit Ratio :</strong> {user.auditRatio}
          </p>
          <p>
            <strong>Campus :</strong> {user.campus}
          </p>
          <p>
            <strong>Date de création :</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <button onClick={logout}>Se déconnecter</button>
        </div>
      ) : (
        <p>Impossible de récupérer votre profil.</p>
      )}
    </div>
  );
};

export default Profile;
