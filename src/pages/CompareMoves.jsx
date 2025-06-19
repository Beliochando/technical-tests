import { useState, useEffect } from "react";
import { useMove } from "../contexts/MoveContext";
import { getAllMoves, getTypeCountsForMove } from "../services/pokeapi";
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
import { useMoveComparisonChart } from "../hooks/useMoveComparisonChart";
import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";

export function CompareMoves() {
  const { selectedMove } = useMove();
  const [inputMove, setInputMove] = useState("");
  const [allMoves, setAllMoves] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [moveAData, setMoveAData] = useState(null);
  const [moveBData, setMoveBData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllMoves().then(setAllMoves);
  }, []);

  useEffect(() => {
    if (inputMove.trim() === "") {
      setFilteredMoves([]);
      setMoveBData({ pp: 0, accuracy: 0, priority: 0 });
      setError("");
      return;
    }
    const filtered = allMoves
      .filter((m) => m.name.includes(inputMove.toLowerCase()))
      .slice(0, 10);
    setFilteredMoves(filtered);
  }, [inputMove, allMoves]);

  async function handleMoveSelect(moveName) {
    setInputMove(moveName);
    setFilteredMoves([]);
    setShowDropdown(false);
    setError("");

    if (!selectedMove) {
      setError("Selecciona primero un movimiento principal.");
      return;
    }

    try {
      const [moveATypesCount, moveBTypesCount] = await Promise.all([
        getTypeCountsForMove(selectedMove.toLowerCase()),
        getTypeCountsForMove(moveName.toLowerCase()),
      ]);
      setMoveAData(moveATypesCount);
      setMoveBData(moveBTypesCount);
    } catch {
      setError("Error al obtener los datos de los movimientos.");
      setMoveAData(null);
      setMoveBData(null);
    }
  }

  const { data, options } = useMoveComparisonChart(
    moveAData,
    moveBData,
    selectedMove,
    inputMove
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const capitalize = useCapitalizeFirstLetter();

  return (
    <div className="flex flex-col w-full h-full p-6 px-10 bg-white/70 rounded-lg relative">
      <h2 className="text-2xl font-semibold text-grape-400 mb-4">
        Compare moves
      </h2>
      <div className="flex flex-col items-center justify-start mt-15 h-full ">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          {/* Selector Movimiento Actual con círculo dentro del label */}
          <div className="flex flex-col">
            <label className="font-medium mb-1 text-grape-300 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-bubble-300" />
              Selected Move:
            </label>
            <div className="px-3 py-2 bg-bubble-100/50 border-bubble-100/50 rounded-md text-bubble-400 font-semibold">
              {capitalize(selectedMove) || "Ninguno"}
            </div>
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="input-move"
              className="font-medium mb-1 text-grape-300 flex items-center gap-2"
            >
              <span className="w-4 h-4 rounded-full inline-block bg-pumpkin-300" />
              New move to compare:
            </label>
            <input
              id="input-move"
              type="text"
              value={inputMove}
              onChange={(e) => {
                setInputMove(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Escribe otro movimiento"
              className="px-3 py-2 border border-pumpkin-300 text-soft-400 rounded-lg w-60 focus:outline-none focus:text-soft-500 focus:border-pumpkin-400"
              autoComplete="off"
            />

            {filteredMoves.length > 0 && showDropdown && (
              <ul className="absolute z-10 top-full mt-1 bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto w-60 shadow-xl">
                {filteredMoves.map((move) => (
                  <li
                    key={move.name}
                    onClick={() => handleMoveSelect(move.name)}
                    className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
                  >
                    {capitalize(move.name)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {error && <div className="text-red-600 mb-4 font-medium">{error}</div>}

        {/* Gráfica centrada y con separación */}
        {data && (
          <div className="flex justify-center items-center h-full w-full">
            <div className="w-full max-w-2xl h-full">
              <Bar options={options} data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
