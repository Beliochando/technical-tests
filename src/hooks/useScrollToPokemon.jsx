import { useEffect } from "react";

export function useScrollToPokemon(pokemonName) {
  useEffect(() => {
    if (!pokemonName) return;

    const el = document.querySelector(`[data-pokemon-id="${pokemonName}"]`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [pokemonName]);
}
