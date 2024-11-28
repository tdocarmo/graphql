import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { GET_USER_PROFILE, GET_LAST_PROJECT } from "../../graphql/queries";

const Profile = () => {
  const { authToken } = useAuth();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setDecodedToken(decoded);
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
      }
    }
  }, [authToken]);

  const {
    data,
    loading,
    error: queryError,
  } = useQuery(GET_USER_PROFILE, {
    skip: !authToken,
  });

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(GET_LAST_PROJECT, {
    skip: !authToken,
  });

  if (!authToken) {
    return <div>Vous devez vous connecter pour accéder à votre profil.</div>;
  }

  if (loading || projectLoading) {
    return <div>Chargement des données...</div>;
  }

  if (queryError || projectError) {
    return (
      <div>
        Erreur lors de la récupération des données :{" "}
        {queryError?.message || projectError?.message}
      </div>
    );
  }

  const user = data?.user?.[0];
  const xpTotal = data?.xp?.aggregate?.sum?.amount || 0;
  const highestLevel = data?.level?.[0]?.amount || "Non défini";

  const lastProjects = projectData?.user?.[0]?.xps || [];
  const formatProjectName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* Bienvenue */}
      <header style={{ padding: "20px", backgroundColor: "#DAF7A6" }}>
        <h1>Bienvenue, {user?.firstName}</h1>
      </header>

      {/* Conteneur pour les cartes */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px", // L'espace entre les cartes
          flexWrap: "nowrap", // S'assurer que les cartes restent sur la même ligne
          padding: "20px",
        }}
      >
        {/* Première carte : Campus et Début du cursus */}
        <div
          style={{
            flex: "1 1 32%", // Chaque carte prend 32% de la largeur
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: "250px", // Limiter la largeur min
          }}
        >
          <p>
            <strong>Campus :</strong> {user?.campus || "Non spécifié"}
          </p>
          <p>
            <strong>Début du cursus :</strong>{" "}
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Deuxième carte : Derniers projets */}
        <div
          style={{
            flex: "1 1 32%", // Chaque carte prend 32% de la largeur
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: "250px", // Limiter la largeur min
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Mes derniers projets</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {lastProjects.length > 0 ? (
              lastProjects.map((project, index) => (
                <li key={index}>{formatProjectName(project.path)}</li>
              ))
            ) : (
              <p>Aucun projet récent trouvé.</p>
            )}
          </ul>
        </div>

        {/* Troisième carte : XP Total et Level */}
        <div
          style={{
            flex: "1 1 32%", // Chaque carte prend 32% de la largeur
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: "250px", // Limiter la largeur min
          }}
        >
          <p>
            <strong>XP Total :</strong> {xpTotal}
          </p>
          <p>
            <strong>Level :</strong> {highestLevel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
