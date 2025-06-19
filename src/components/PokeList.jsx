import { useState, useEffect } from "react";
import { getPokemonByMove } from "../services/pokeapi";
import { usePokemonBadges } from "../hooks/usePokemonBadges";
import { useScrollToPokemon } from "../hooks/useScrollToPokemon";
import { PokeCard } from "./PokeCard";
import { MdFlashOn } from "react-icons/md";

export function PokeList({ move, onSelectPokemon, selectedPokemon, isNarrow }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (move) {
      getPokemonByMove(move).then(setPokemonList);
    } else {
      setPokemonList([]);
    }
  }, [move]);

  const pokemonWithBadges = usePokemonBadges(pokemonList);

  // SCROLL
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    if (
      selectedPokemon &&
      pokemonWithBadges.length > 0 &&
      pokemonWithBadges.some((p) => p.name === selectedPokemon)
    ) {
      setScrollTarget(selectedPokemon);
    }
  }, [selectedPokemon, pokemonWithBadges]);

  // Hook Scroll
  useScrollToPokemon(scrollTarget);

  if (!move) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-grape-100 py-10">
        <MdFlashOn className="text-[100px] mb-4 text-grape-100/70" />
        <p className="text-lg">No move selected yet</p>
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-grape-100 py-10">
        <MdFlashOn className="text-[100px] mb-4 text-grape-100/70" />
        <p className="text-lg">No Pokémon found for this move</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 text-grape-200
      ${isNarrow ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}`}
    >
      {pokemonWithBadges.map((p) => (
        <div
          key={p.name}
          data-pokemon-id={p.name}
          className={`cursor-pointer rounded-lg transition
          ${selectedPokemon === p.name ? "bg-blue-400/60" : "hover:bg-blue-100/50"}`}
          onClick={() => onSelectPokemon(p.name)}
        >
          <PokeCard
            name={p.name}
            isActive={selectedPokemon === p.name}
            badges={p.badges}
          />
        </div>
      ))}
    </div>
  );
}
