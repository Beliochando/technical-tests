import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";

export function usePokemonComparisonChart(
  pokemonAName,
  pokemonAData,
  inputPokemonName,
  pokemonBData
) {
  const capitalize = useCapitalizeFirstLetter();

  const labels = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def"];

  const filterStats = (stats) =>
    stats
      .filter((s) =>
        [
          "hp",
          "attack",
          "defense",
          "special-attack",
          "special-defense",
        ].includes(s.stat.name)
      )
      .map((s) => s.base_stat);

  const data = {
    labels,
    datasets: [
      {
        label: capitalize(pokemonAName),
        data: pokemonAData ? filterStats(pokemonAData.stats) : [],
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo 500
      },
      {
        label: capitalize(inputPokemonName),
        data: pokemonBData ? filterStats(pokemonBData.stats) : [],
        backgroundColor: "rgba(251, 191, 36, 0.7)", // Amber 400
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Comparación de stats Pokémon" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return { data, options };
}
