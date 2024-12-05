import React from "react";

const SkillCircleGraph = ({ skills, title }) => {
  const renderSkillCircle = (skill) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const progress = ((100 - skill.amount) / 100) * circumference;
    console.log(skill.amount);
    
    return (
      <div key={skill.type} style={{ textAlign: "center", margin: "10px" }}>
        <svg width="100" height="100" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={`${skill.color}33`}
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={skill.color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            fill="none"
          />
        </svg>
        <div style={{ marginTop: "10px", transform: "rotate(0deg)" }}>
          <div style={{ fontWeight: "bold" }}>{skill.amount}%</div>
          <div style={{ fontSize: "0.9em", color: "#666" }}>{skill.label}</div>
        </div>
      </div>
    );
  };

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
      <h3>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {skills.map(renderSkillCircle)}
      </div>
    </div>
  );
};

export default SkillCircleGraph;