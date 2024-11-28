import React from "react";

const Graph = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <svg width="100%" height="50" style={{ backgroundColor: "#f4f4f4" }}>
      {data.reduce((acc, item, index) => {
        const previousWidth = acc.totalWidth;
        const barWidth = total > 0 ? (item.value / total) * 100 : 0;

        acc.elements.push(
          <rect
            key={index}
            x={`${previousWidth}%`}
            y="10"
            width={`${barWidth}%`}
            height="30"
            fill={item.color}
          />
        );

        acc.totalWidth += barWidth;
        return acc;
      }, { elements: [], totalWidth: 0 }).elements}
    </svg>
  );
};

export default Graph;
