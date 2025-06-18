import { useEffect, useState } from "react";
import { getAllMoves } from "../services/pokeapi";

export function PokeFilter({ onMoveSelect }) {
  const [moves, setMoves] = useState([]);
  const [selectedMove, setSelectedMove] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllMoves().then(setMoves);
  }, []);

  const handleSelect = (move) => {
    setSelectedMove(move);
    onMoveSelect(move);
    setOpen(false);
  };

  return (
    <div className="mb-4 w-full">
      <label className="block font-semibold mb-2">Select a move:</label>

      <div className="relative w-full">
        <button onClick={() => setOpen(!open)} className="btn w-full text-left">
          {selectedMove || "-- Choose a move --"}
        </button>

        {open && (
          <ul className="absolute mt-1 w-full overflow-y-auto bg-base-100 rounded-box shadow border z-50 max-h-120">
            <li>
              <a
                className="block px-4 py-2 hover:bg-base-200 text-gray-500 italic"
                onClick={() => handleSelect("")}
              >
                -- Choose a move --
              </a>
            </li>

            {moves.map((move) => (
              <li key={move.name}>
                <a
                  className="block px-4 py-2 hover:bg-base-200"
                  onClick={() => handleSelect(move.name)}
                >
                  {move.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
