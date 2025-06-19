import { useState } from "react";
import { useMove } from "../contexts/MoveContext";
import { PokeFilter } from "../components/PokeFilter";
import { PokeList } from "../components/PokeList";
import { PokeDetails } from "../components/PokeDetails";

export function Home() {
  const { selectedMove, setSelectedMove } = useMove();
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  function handleMoveSelectFromFilter(move) {
    setSelectedMove(move);
    setSelectedPokemon(null);
  }

  function handleMoveSelectFromDetails(move) {
    setSelectedMove(move);
  }

  function handlePokemonClick(name) {
    if (selectedPokemon === name) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokemon(name);
    }
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col p-8 max-w-screen-xl w-full h-[800px] mb-4 mt-15 bg-base-100/30 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-gradient-gb inline-block">
          Pokémon Explorer
        </h1>

        <div className="flex gap-4 flex-1 overflow-hidden">
          {/* Columna izquierda con filtro y lista */}
          <div
            className={`flex flex-col transition-all duration-300
            ${selectedPokemon ? "w-1/3" : "w-full"}`}
          >
            <PokeFilter
              onMoveSelect={handleMoveSelectFromFilter}
              selectedMove={selectedMove}
            />

            <div className="flex-1 overflow-y-auto rounded-lg p-6 scrollbar-custom">
              <PokeList
                move={selectedMove}
                onSelectPokemon={handlePokemonClick}
                selectedPokemon={selectedPokemon}
                isNarrow={!!selectedPokemon}
              />
            </div>
          </div>

          {/* Detalle del Pokémon a la derecha */}
          {selectedPokemon && (
            <div
              className="w-2/3 overflow-y-auto bg-white/70 rounded-lg p-6 scrollbar-custom"
              style={{ height: "100%" }}
              key={selectedPokemon}
            >
              <PokeDetails
                name={selectedPokemon}
                onSelectMove={handleMoveSelectFromDetails}
                selectedMove={selectedMove}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
