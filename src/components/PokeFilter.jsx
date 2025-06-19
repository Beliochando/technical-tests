import { useEffect, useState } from "react";
import { getAllMoves } from "../services/pokeapi";
import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";
import { MdFlashOn } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

export function PokeFilter({
  onMoveSelect,
  selectedMove,
  onCompareMovesClick,
}) {
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
    <div className="mb-2 w-full">
      <label className="font-semibold mb-2 text-grape-500 flex items-center gap-2">
        <MdFlashOn className="text-pumpkin-400" />
        Select a move to see which Pokémon can learn it
      </label>

      {/* Flex contenedor para botón y select */}
      <div className="flex items-center gap-2 w-full relative">
        {/* Botón SELECT con dropdown */}
        <div className="relative w-full">
          <button
            onClick={() => setOpen(!open)}
            className="btn-select flex items-center justify-between w-full"
            type="button"
          >
            <span className="text-left flex-1">
              {selectedMove
                ? capitalizeFirstLetter(selectedMove)
                : "Choose a move"}
            </span>
            <FiChevronDown
              className={`text-soft-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <ul className="absolute mt-1 w-full max-h-120 overflow-y-auto bg-white rounded-box shadow-2xl border-none z-50">
              <li>
                <a
                  className="dropdown-item dropdown-item-italic"
                  onClick={() => handleSelect("")}
                >
                  -- Choose a move --
                </a>
              </li>
              {moves
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((move) => (
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

        {/* Botón Comparar Moves */}
        <button
          onClick={onCompareMovesClick}
          type="button"
          className="text-sm px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg whitespace-nowrap"
        >
          Comparar moves
        </button>
      </div>
    </div>
  );
}
