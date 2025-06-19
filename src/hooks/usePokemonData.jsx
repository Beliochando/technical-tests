import { useState, useEffect } from "react";
import {
  getPokemonDetails,
  getPokemonSpecies,
  getEvolutionChain,
} from "../services/pokeapi";

const pokemonDataCache = new Map();

export function usePokemonData(name) {
  const [data, setData] = useState({
    pokemon: null,
    species: null,
    evolutionChain: null,
    badges: null,
  });

  useEffect(() => {
    if (!name) {
      setData({
        pokemon: null,
        species: null,
        evolutionChain: null,
        badges: null,
      });
      return;
    }

    let isCancelled = false;

    async function fetchData() {
      if (pokemonDataCache.has(name)) {
        if (!isCancelled) setData(pokemonDataCache.get(name));
        return;
      }

      const pokemon = await getPokemonDetails(name);
      const hasHiddenAbility = pokemon.abilities.some((a) => a.is_hidden);

      let species = null;
      let badges = null;
      let evolutionChain = null;

      if (pokemon.species?.url) {
        species = await getPokemonSpecies(pokemon.species.url);

        badges = {
          legendary: species.is_legendary,
          mythical: species.is_mythical,
          hasHiddenAbility,
        };

        if (species.evolution_chain?.url) {
          evolutionChain = await getEvolutionChain(species.evolution_chain.url);
        }
      }

      const fullData = { pokemon, species, evolutionChain, badges };

      pokemonDataCache.set(name, fullData);

      if (!isCancelled) setData(fullData);
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [name]);

  return data;
}
