import { useState, useEffect } from "react";
import { getPokemonByMove, getPokemonByName } from "../services/pokeapi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { usePokemonComparisonChart } from "../hooks/usePokemonComparisonChart";
import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ComparePokemon({ pokemonAName, selectedMove, onClose }) {
  const [inputPokemon, setInputPokemon] = useState("");
  const [pokemonAData, setPokemonAData] = useState(null);
  const [pokemonBData, setPokemonBData] = useState(null);
  const [allPokemons, setAllPokemons] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const { data, options } = usePokemonComparisonChart(
    pokemonAName,
    pokemonAData,
    inputPokemon,
    pokemonBData
  );

  const capitalize = useCapitalizeFirstLetter();

  // Carga datos pokemon A (inicial)
  useEffect(() => {
    if (!pokemonAName) return;
    getPokemonByName(pokemonAName)
      .then(setPokemonAData)
      .catch(() => setError("Error cargando primer Pokémon"));
  }, [pokemonAName]);

  // Carga pokemons filtrados por movimiento seleccionado
  useEffect(() => {
    if (!selectedMove) {
      setAllPokemons([]);
      return;
    }
    import("../services/pokeapi").then(({ getPokemonByMove }) => {
      getPokemonByMove(selectedMove)
        .then((pokemonList) => {
          setAllPokemons(pokemonList.map((p) => p.name));
        })
        .catch(() => setAllPokemons([]));
    });
  }, [selectedMove]);

  // Filtrado para autocomplete input (sobre pokemons filtrados)
  const filteredPokemons =
    inputPokemon.trim() === ""
      ? []
      : allPokemons
          .filter((p) => p.includes(inputPokemon.toLowerCase()))
          .slice(0, 10);

  async function handlePokemonSelect(name) {
    setInputPokemon(name);
    setShowDropdown(false);
    setError("");
    try {
      const data = await getPokemonByName(name);
      setPokemonBData(data);
    } catch {
      setError("Error cargando segundo Pokémon");
      setPokemonBData(null);
    }
  }

  return (
    <div className="flex flex-col w-full h-full p-6 px-10 bg-white/70 rounded-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-grape-400">
          Compare Pokémon Stats
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-pumpkin-400 hover:bg-pumpkin-500 text-white rounded-md font-semibold"
        >
          Volver
        </button>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-grape-300 flex items-center gap-2">
            Movimiento Seleccionado:
          </label>
          <div className="px-3 py-2 bg-grape-100 border-grape-100 rounded-md text-grape-200 font-semibold min-w-[140px]">
            {capitalize(selectedMove) || "Ninguno"}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-grape-300 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-bubble-300" />
            Pokémon Base:
          </label>
          <div className="px-3 py-2 bg-bubble-100/50 border-bubble-100/50 rounded-md text-bubble-400 font-semibold min-w-[140px]">
            {capitalize(pokemonAName) || "Ninguno"}
          </div>
        </div>

        <div className="flex flex-col relative">
          <label className="font-medium mb-1 text-grape-300 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-pumpkin-300" />
            Nuevo Pokémon para comparar:
          </label>
          <input
            type="text"
            value={inputPokemon}
            onChange={(e) => {
              setInputPokemon(e.target.value);
              setShowDropdown(true);
            }}
            placeholder="Escribe nombre Pokémon"
            className="px-3 py-2 border border-pumpkin-300 text-soft-400 rounded-lg w-60 focus:outline-none focus:text-soft-500 focus:border-pumpkin-400"
            autoComplete="off"
          />
          {filteredPokemons.length > 0 && showDropdown && (
            <ul className="absolute z-10 top-full mt-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto w-60 shadow-xl">
              {filteredPokemons.map((name) => (
                <li
                  key={name}
                  onClick={() => handlePokemonSelect(name)}
                  className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {capitalize(name)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error && <div className="text-red-600 mb-4 font-medium">{error}</div>}

      {pokemonAData && pokemonBData && (
        <div className="flex justify-center items-center h-full w-full">
          <div className="w-full max-w-2xl h-full">
            <Bar options={options} data={data} />
          </div>
        </div>
      )}
    </div>
  );
}
