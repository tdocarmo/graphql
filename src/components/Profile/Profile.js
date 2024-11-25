import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Contexte d'authentification pour récupérer le token
import { jwtDecode } from "jwt-decode"; // Importation correcte
import { GET_USER_PROFILE } from "../../graphql/queries"; // Assurez-vous que la requête est correcte
import { useQuery } from "@apollo/client"; // Pour exécuter la requête GraphQL

const Profile = () => {
  const { authToken, logout } = useAuth(); // Récupération du token et de la fonction logout du contexte
  const [profileData, setProfileData] = useState(null); // State pour stocker les données du profil
  const [error, setError] = useState(null); // State pour gérer les erreurs
  const [userId, setUserId] = useState(null); // Pour stocker l'ID de l'utilisateur extrait du token

  useEffect(() => {
    if (authToken) {
      try {
        // Décoder le token pour obtenir l'ID de l'utilisateur
        const decodedToken = jwtDecode(authToken); // Utilisation de jwtDecode
        console.log("Decoded Token:", decodedToken); // Afficher le contenu du token décodé
        
        setUserId(decodedToken.sub); // Utiliser `sub` pour l'ID de l'utilisateur
      } catch (error) {
        console.error("Erreur lors du décodage du token", error);
        setError("Token invalide ou expiré.");
      }
    }
  }, [authToken]); // Dépendance sur authToken

  // Utilisation de la requête GraphQL pour récupérer les données du profil de l'utilisateur
  const { data, loading, error: queryError } = useQuery(GET_USER_PROFILE, {
    variables: { userId: userId },
    skip: !userId, // Ne pas exécuter la requête tant que l'ID utilisateur n'est pas disponible
  });

  useEffect(() => {
    if (userId) {
      console.log("User ID:", userId); // Afficher l'ID de l'utilisateur
    }
  }, [userId]); // Afficher lorsque `userId` change

  useEffect(() => {
    if (data) {
      setProfileData(data.user); // Stocker les données du profil dans le state
    }
  }, [data]);

  // Si pas de token ou si l'utilisateur n'est pas authentifié
  if (!authToken) {
    return <div>Vous devez vous connecter pour voir votre profil.</div>;
  }

  // Si les données du profil sont en train de se charger
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Affichage du profil ou message d'erreur
  return (
    <div>
      <h1>Profil</h1>
      {queryError && <p style={{ color: "red" }}>Erreur lors de la récupération du profil</p>}
      {profileData ? (
        <div>
          <p>Bienvenue, {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <button onClick={logout}>Se déconnecter</button>
        </div>
      ) : (
        <p>Le profil n'a pas pu être récupéré.</p>
      )}
    </div>
  );
};

export default Profile;
