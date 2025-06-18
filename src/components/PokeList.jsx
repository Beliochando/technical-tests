import { useState, useEffect } from "react";
import { getPokemonByMove } from "../services/pokeapi";
import { PokeCard } from "./PokeCard";
import { MdOutlineCatchingPokemon } from "react-icons/md";

export function PokeList({ move }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (move) {
      getPokemonByMove(move).then(setPokemonList);
    }
  }, [move]);

  if (!move) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-grape-100 py-10">
        <MdOutlineCatchingPokemon className="text-[100px] mb-4 text-grape-100/70" />
        <p className="text-lg">No move selected yet</p>
      </div>
    );
  }

  return (
    <div>
      {pokemonList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-grape-100 py-10">
          <MdOutlineCatchingPokemon className="text-[100px] mb-4 text-grape-100/70" />
          <p className="text-lg">No move selected yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-grape-200">
          {pokemonList.map((p) => (
            <PokeCard key={p.name} name={p.name} />
          ))}
        </div>
      )}
    </div>
  );
}
