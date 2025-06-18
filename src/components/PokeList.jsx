import { useState, useEffect, useRef } from "react";
import { getPokemonByMove } from "../services/pokeapi";
import { usePokemonBadges } from "../hooks/usePokemonBadges";
import { PokeCard } from "./PokeCard";
import { MdFlashOn } from "react-icons/md";

export function PokeList({ move, onSelectPokemon, selectedPokemon, isNarrow }) {
  const [pokemonList, setPokemonList] = useState([]);

  // Ref para almacenar referencias de cada card por nombre
  const refs = useRef({});

  useEffect(() => {
    if (move) {
      getPokemonByMove(move).then(setPokemonList);
    } else {
      setPokemonList([]);
    }
  }, [move]);

  const pokemonWithBadges = usePokemonBadges(pokemonList);

  // Scroll a la card seleccionada cuando cambia selectedPokemon
  useEffect(() => {
    if (selectedPokemon && refs.current[selectedPokemon]) {
      refs.current[selectedPokemon].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selectedPokemon]);

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
          ref={(el) => {
            refs.current[p.name] = el;
          }}
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
