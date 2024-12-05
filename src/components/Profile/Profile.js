import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { GET_USER_PROFILE, GET_LAST_PROJECT, GET_SKILLS } from "../../graphql/queries";
import StatsGraph from "./StatsGraph";
import SkillCircleGraph from "./SkillCircleGraph";

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

  const {
    data: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery(GET_SKILLS, { skip: !authToken });

  if (!authToken) {
    return <div>Vous devez vous connecter pour accéder à votre profil.</div>;
  }

  if (loading || projectLoading || skillsLoading) {
    return <div>Chargement des données...</div>;
  }

  if (queryError || projectError || skillsError) {
    return (
      <div>
        Erreur lors de la récupération des données :{" "}
        {queryError?.message || projectError?.message || skillsError?.message}
      </div>
    );
  }

  const user = data?.user?.[0];
  const xpTotal = data?.xp?.aggregate?.sum?.amount || 0;
  const highestLevel = data?.level?.[0]?.amount || "Non défini";
  const auditRatio = user?.auditRatio || 0;
  const totalDown = user?.totalDown || 0;
  const totalUp = user?.totalUp || 0;

  const languageSkills = [
    { 
      type: "js",
      label: "JavaScript",
      amount: skillsData?.user?.[0]?.transactions_js?.[0]?.amount || 0,
      color: "#F7DF1E"
    },
    { 
      type: "go",
      label: "Go",
      amount: skillsData?.user?.[0]?.transactions_go?.[0]?.amount || 0,
      color: "#00ADD8"
    },
    { 
      type: "css",
      label: "CSS",
      amount: skillsData?.user?.[0]?.transactions_css?.[0]?.amount || 0,
      color: "#264DE4"
    }
  ];

  const domainSkills = [
    {
      type: "algo",
      label: "Algo",
      amount: skillsData?.user?.[0]?.transactions_algo?.[0]?.amount || 0,
      color: "#FF4560"
    },
    {
      type: "prog",
      label: "Prog",
      amount: skillsData?.user?.[0]?.transactions_prog?.[0]?.amount || 0,
      color: "#008FFB"
    },
    {
      type: "back_end",
      label: "Back-end",
      amount: skillsData?.user?.[0]?.transactions_back_end?.[0]?.amount || 0,
      color: "#00E396"
    },
    {
      type: "front_end",
      label: "Front-end",
      amount: skillsData?.user?.[0]?.transactions_front_end?.[0]?.amount || 0,
      color: "#FEB019"
    }
  ];

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

        {/* Graphiques des skills */}
        <SkillCircleGraph title="Langages" skills={languageSkills} />
        <SkillCircleGraph title="Domaines" skills={domainSkills} />
      </div>
    </div>
  );
};

export default Profile;