import { useMemo } from "react";

export function useMoveComparisonChart(
  moveATypeCounts,
  moveBTypeCounts,
  moveALabel,
  moveBLabel
) {
  const data = useMemo(() => {
    if (!moveATypeCounts || !moveBTypeCounts) return null;

    const allTypes = Array.from(
      new Set([
        ...Object.keys(moveATypeCounts),
        ...Object.keys(moveBTypeCounts),
      ])
    );

    const moveAData = allTypes.map((type) => moveATypeCounts[type] ?? 0);
    const moveBData = allTypes.map((type) => moveBTypeCounts[type] ?? 0);

    return {
      labels: allTypes.map(
        (type) => type.charAt(0).toUpperCase() + type.slice(1)
      ),
      datasets: [
        {
          label: moveALabel,
          data: moveAData,
          backgroundColor: "#ff98f9", // bubble-300
          borderRadius: 6,
        },
        {
          label: moveBLabel,
          data: moveBData,
          backgroundColor: "#ffc341", // pumpkin-300
          borderRadius: 6,
        },
      ],
    };
  }, [moveATypeCounts, moveBTypeCounts, moveALabel, moveBLabel]);

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: "#4a5568",
            font: { size: 14, weight: "normal" },
            padding: 10,
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          title: {
            display: false,
          },
        },
        x: {
          ticks: {
            color: "#4a5568",
            font: { size: 14, weight: "300", family: "'Inter', sans-serif" }, // ✅ font-medium
          },
          grid: {
            display: false,
            drawBorder: false,
          },
          title: {
            display: false,
          },
        },
      },
    }),
    []
  );

  return { data, options };
}
