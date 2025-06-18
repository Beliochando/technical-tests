import { useEffect, useState } from "react";
import { getPokemonDetails, getPokemonSpecies } from "../services/pokeapi";

export function usePokemonBadges(pokemonList) {
  const [pokemonWithBadges, setPokemonWithBadges] = useState([]);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      setPokemonWithBadges([]);
      return;
    }

    async function fetchBadges() {
      const results = await Promise.all(
        pokemonList.map(async (p) => {
          const details = await getPokemonDetails(p.name);
          const species = await getPokemonSpecies(details.species.url);

          const badges = {
            legendary: species.is_legendary,
            mythical: species.is_mythical,
            hasHiddenAbility: details.abilities.some((a) => a.is_hidden),
          };

          return { ...p, badges, details, species };
        })
      );

      setPokemonWithBadges(results);
    }

    fetchBadges();
  }, [pokemonList]);

  return pokemonWithBadges;
}
