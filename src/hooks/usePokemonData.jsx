import { useState, useEffect } from "react";
import {
  getPokemonDetails,
  getPokemonSpecies,
  getEvolutionChain,
} from "../services/pokeapi";

export function usePokemonData(name) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    if (!name) return;

    setPokemon(null);
    setSpecies(null);
    setEvolutionChain(null);

    getPokemonDetails(name).then((p) => {
      setPokemon(p);
      if (p.species?.url) {
        getPokemonSpecies(p.species.url).then((speciesData) => {
          setSpecies(speciesData);
          if (speciesData.evolution_chain?.url) {
            getEvolutionChain(speciesData.evolution_chain.url).then(
              setEvolutionChain
            );
          }
        });
      }
    });
  }, [name]);

  return { pokemon, species, evolutionChain };
}
