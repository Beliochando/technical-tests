import { useEffect, useState } from "react";
import { getAllMoves } from "../services/pokeapi";
import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";
import { MdFlashOn } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

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
    <div className="mb-2 w-full">
      <label className="font-semibold mb-2 text-grape-500 flex items-center gap-2">
        <MdFlashOn className="text-pumpkin-400" />
        Select a move to see which Pokémon can learn it
      </label>

      <div className="relative w-full">
        <button
          onClick={() => setOpen(!open)}
          className="btn-select flex items-center justify-between gap-2"
        >
          <span className="flex-1 text-left">
            {selectedMove
              ? capitalizeFirstLetter(selectedMove)
              : "Choose a move"}
          </span>
          <FiChevronDown
            className={`text-soft-400 ${open ? "rotate-180" : ""}`}
            style={{ verticalAlign: "middle" }}
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
              .slice() // copia para no mutar el estado original
              .sort((a, b) => a.name.localeCompare(b.name)) // orden alfabético
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
    </div>
  );
}
