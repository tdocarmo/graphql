import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Contexte d'authentification
import { useQuery } from "@apollo/client"; // Hook GraphQL
import { jwtDecode } from "jwt-decode"; // Décodage du token JWT
import { GET_USER_PROFILE } from "../../graphql/queries"; // Requête GraphQL
import logo from "../../assets/logo.png"; // Import logo

const Profile = () => {
  const { authToken, logout } = useAuth(); // Récupérer le token et la fonction logout
  const [decodedToken, setDecodedToken] = useState(null); // Contient les informations du token décodé

  // Décoder le token JWT pour récupérer les informations utilisateur
  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setDecodedToken(decoded); // Stocker les données décodées
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
      }
    }
  }, [authToken]);

  // Requête GraphQL pour récupérer les données du profil utilisateur
  const { data, loading, error: queryError } = useQuery(GET_USER_PROFILE, {
    skip: !authToken, // Ne pas exécuter si aucun token n'est présent
  });

  // Affichage des données ou messages en cas d'erreur/chargement
  if (!authToken) {
    return <div>Vous devez vous connecter pour accéder à votre profil.</div>;
  }

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (queryError) {
    return <div>Erreur lors de la récupération du profil : {queryError.message}</div>;
  }

  // Extraction des données de la requête
  const user = data?.user?.[0]; // Premier utilisateur (si la requête retourne une liste)
  const xpTotal = data?.xp?.aggregate?.sum?.amount || 0; // Somme totale des XP
  const highestLevel = data?.level?.[0]?.amount || "Non défini"; // Plus haut niveau atteint

  // Composant affichant les informations utilisateur
  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      {/* Ajout du texte Bienvenue ici dans le header */}
      <h1>Bienvenue, {user?.firstName} {user?.lastName}</h1>
      
      {user ? (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          {/* Contenu des informations du profil sans la salutation */}
          <p>
            <strong>Audit Ratio :</strong> {user.auditRatio || "Non spécifié"}
          </p>
          <p>
            <strong>Campus :</strong> {user.campus || "Non spécifié"}
          </p>
          <p>
            <strong>Date de création :</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Total Up :</strong> {user.totalUp}
          </p>
          <p>
            <strong>Total Down :</strong> {user.totalDown}
          </p>
          <hr />
          <h3>Statistiques :</h3>
          <p>
            <strong>XP Total :</strong> {xpTotal}
          </p>
          <p>
            <strong>Niveau Maximal :</strong> {highestLevel}
          </p>
        </div>
      ) : (
        <p>Impossible de récupérer votre profil.</p>
      )}
    </div>
  );
};

export default Profile;
