import { useEffect, useState } from "react";
import { getAllMoves } from "../services/pokeapi";
import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";
import { MdFlashOn } from "react-icons/md";

export function PokeFilter({ onMoveSelect, selectedMove }) {
  const [moves, setMoves] = useState([]);
  const [open, setOpen] = useState(false);

  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  useEffect(() => {
    getAllMoves().then(setMoves);
  }, []);

  const handleSelect = (move) => {
    onMoveSelect(move);
    setOpen(false);
  };

  return (
    <div className="mb-4 w-full">
      <label className="block font-semibold mb-2 text-grape-500 flex items-center gap-2">
        <MdFlashOn className="text-pumpkin-400" />
        Select a move to see which Pokémon can learn it
      </label>

      <div className="relative w-full">
        <button onClick={() => setOpen(!open)} className="btn-select">
          {selectedMove ? capitalizeFirstLetter(selectedMove) : "Choose a move"}
        </button>

        {open && (
          <ul className="absolute mt-1 w-full overflow-y-auto bg-base-100 rounded-box shadow border z-50 max-h-120">
            <li>
              <a
                className="dropdown-item dropdown-item-italic"
                onClick={() => handleSelect("")}
              >
                -- Choose a move --
              </a>
            </li>
            {moves.map((move) => (
              <li key={move.name}>
                <a
                  className="dropdown-item"
                  onClick={() => handleSelect(move.name)}
                >
                  {capitalizeFirstLetter(move.name)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
