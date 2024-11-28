import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { GET_USER_PROFILE, GET_LAST_PROJECT } from "../../graphql/queries";
import StatsGraph from "./StatsGraph";

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
  } = useQuery(GET_LAST_PROJECT, { skip: !authToken });

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
  const auditRatio = user?.auditRatio || 0;
  const totalDown = user?.totalDown || 0;
  const totalUp = user?.totalUp || 0;

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
          gap: "20px",
          flexWrap: "nowrap",
          padding: "20px",
        }}
      >
        {/* Première carte */}
        <div
          style={{
            flex: "1 1 32%",
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: "250px",
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

        {/* Deuxième carte */}
        <div
          style={{
            flex: "1 1 32%",
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: "250px",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Mes derniers projets</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {projectData?.user?.[0]?.xps?.length > 0 ? (
              projectData.user[0].xps.map((project, index) => (
                <li key={index}>{project.path.split("/").pop()}</li>
              ))
            ) : (
              <p>Aucun projet récent trouvé.</p>
            )}
          </ul>
        </div>

        {/* Troisième carte */}
        <div
          style={{
            flex: "1 1 32%",
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            minWidth: "250px",
          }}
        >
          <p>
            <strong>XP Total :</strong> {xpTotal}
          </p>
          <p>
            <strong>Niveau :</strong> {highestLevel}
          </p>
          <p>
            <strong>Ratio Audit :</strong>{" "}
            {auditRatio ? `${auditRatio.toFixed(2)} %` : "Non calculé"}
          </p>
        </div>
      </div>

      {/* Conteneur des graphiques */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          gap: "20px",
        }}
      >
        {/* Premier graphique */}
        <StatsGraph totalUp={totalUp} totalDown={totalDown} />

        {/* Placeholder pour les deux autres graphiques */}
        <div
          style={{
            flex: "1",
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "250px",
          }}
        >
          Graphique 2 (à implémenter)
        </div>
        <div
          style={{
            flex: "1",
            backgroundColor: "#eaf7fc",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            minWidth: "250px",
          }}
        >
          Graphique 3 (à implémenter)
        </div>
      </div>
    </div>
  );
};

export default Profile;
