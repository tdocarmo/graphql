import React from "react";

const StatsGraph = ({ totalUp, totalDown }) => {
  const maxValue = Math.max(totalUp, totalDown) || 1; // Évite division par 0
  const upHeight = (totalUp / maxValue) * 100;
  const downHeight = (totalDown / maxValue) * 100;

  return (
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
      <h3>Audits</h3>
      <svg width="100%" height="200">
        {/* Barre "Reçus" */}
        <rect
          x="30%"
          y={`${100 - upHeight}%`}
          width="20"
          height={`${upHeight}%`}
          fill="#4caf50"
        />
        <text x="30%" y="95%" fontSize="12" fill="#000">
          {totalUp} (Faits)
        </text>

        {/* Barre "Donnés" */}
        <rect
          x="70%"
          y={`${100 - downHeight}%`}
          width="20"
          height={`${downHeight}%`}
          fill="#f44336"
        />
        <text x="70%" y="95%" fontSize="12" fill="#000">
          {totalDown} (Reçus)
        </text>
      </svg>
    </div>
  );
};

export default StatsGraph;
