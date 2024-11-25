import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Contexte d'authentification pour récupérer le token
import axios from "axios";

const Profile = () => {
  const { authToken, logout } = useAuth(); // Récupération du token et de la fonction logout du contexte
  const [profileData, setProfileData] = useState(null); // State pour stocker les données du profil
  const [error, setError] = useState(null); // State pour gérer les erreurs

  useEffect(() => {
    if (authToken) {
      const fetchProfile = async () => {
        try {
          // Envoi de la requête GraphQL pour récupérer les données du profil
          const response = await axios.post(
            process.env.REACT_APP_API_URL, // Utilisation de la variable d'environnement pour l'URL de l'API
            {
              query: `
                query {
                  me {
                    id
                    username
                    email
                  } 
                }
              `,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Envoi du token d'authentification dans les headers
              },
            }
          );
          // Stockage des données du profil dans le state
          setProfileData(response.data.data.me);
        } catch (error) {
          setError("Erreur lors de la récupération du profil.");
          console.error("Erreur lors de la récupération du profil", error);
        }
      };

      fetchProfile();
    }
  }, [authToken]); // L'effet s'exécute quand le token change

  // Si pas de token, l'utilisateur doit être connecté pour voir son profil
  if (!authToken) {
    return <div>Vous devez vous connecter pour voir votre profil.</div>;
  }

  // Affichage du profil ou message de chargement
  return (
    <div>
      <h1>Profil</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profileData ? (
        <div>
          <p>Bienvenue, {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <button onClick={logout}>Se déconnecter</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Profile;
