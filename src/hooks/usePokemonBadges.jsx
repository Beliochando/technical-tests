import { useEffect, useState } from "react";
import { getPokemonDetails, getPokemonSpecies } from "../services/pokeapi";

const pokemonCache = new Map();

export function usePokemonBadges(pokemonList) {
  const [pokemonWithBadges, setPokemonWithBadges] = useState([]);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) {
      setPokemonWithBadges([]);
      return;
    }

    let isCancelled = false;

    async function fetchBadges() {
      const results = await Promise.all(
        pokemonList.map(async (p) => {
          if (pokemonCache.has(p.name)) {
            // Usar caché si existe
            return pokemonCache.get(p.name);
          }

          const details = await getPokemonDetails(p.name);
          const species = await getPokemonSpecies(details.species.url);

          const badges = {
            legendary: species.is_legendary,
            mythical: species.is_mythical,
            hasHiddenAbility: details.abilities.some((a) => a.is_hidden),
          };

          const data = { ...p, badges, details, species };

          pokemonCache.set(p.name, data); // Guardar en caché

          return data;
        })
      );

      if (!isCancelled) {
        setPokemonWithBadges(results);
      }
    }

    fetchBadges();

    return () => {
      isCancelled = true;
    };
  }, [pokemonList]);

  return pokemonWithBadges;
}
