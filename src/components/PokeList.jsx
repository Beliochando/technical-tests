import { useState, useEffect } from "react";
import { getPokemonByMove } from "../services/pokeapi";
import { PokeCard } from "./PokeCard";

export function PokeList({ move }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (move) {
      getPokemonByMove(move).then(setPokemonList);
    }
  }, [move]);

  if (!move) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        Pokémon que aprenden {move}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemonList.map((p) => (
          <PokeCard key={p.name} name={p.name} />
        ))}
      </div>
    </div>
  );
}
