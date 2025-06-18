import { MdOutlineCatchingPokemon } from "react-icons/md";
import { usePokemonBadges } from "../hooks/usePokemonBadges";
import { usePokemonData } from "../hooks/usePokemonData";
import { useEvolutionList } from "../hooks/useEvolutionList";
import { extractIdFromUrl } from "../utils";

export function PokeDetails({ name, onSelectPokemon, onSelectMove }) {
  const { pokemon, species, evolutionChain } = usePokemonData(name);
  const evolutions = useEvolutionList(evolutionChain);
  const badgesData = usePokemonBadges(name ? [{ name }] : []);
  const badge = badgesData.length > 0 ? badgesData[0].badges : null;

  if (!pokemon) return <p className="text-soft-200">Loading Pokémon...</p>;

  return (
    <div className="text-grape-200 w-full h-full flex flex-col overflow-hidden">
      <h2 className="text-[35px] font-bold mb-2 flex items-center gap-2">
        <MdOutlineCatchingPokemon className="mt-0.5" />
        {pokemon.name.toUpperCase()}
      </h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32"
      />

      {badge && (
        <div className="mb-4 flex gap-4">
          {badge.legendary && (
            <span className="badge badge-warning">Legendary</span>
          )}
          {badge.mythical && <span className="badge badge-info">Mythical</span>}
          {badge.hasHiddenAbility && (
            <span className="badge badge-success">Hidden Ability</span>
          )}
        </div>
      )}

      <p>
        <strong>Height:</strong> {pokemon.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemon.weight}
      </p>
      <p>
        <strong>Types:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>

      <hr className="my-4 border-grape-700" />

      {/* Moves */}
      <div>
        <h3 className="font-semibold mb-2">Moves</h3>
        <ul className="max-h-48 scrollbar-hidden cursor-pointer bg-grape-100/30 p-4 rounded-lg">
          {pokemon.moves.map((m) => (
            <li
              key={m.move.name}
              className="hover:text-pumpkin-400"
              onClick={() => onSelectMove(m.move.name)}
            >
              {m.move.name}
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4 border-grape-700" />

      {/* Evolutions */}
      <div>
        <h3 className="font-semibold mb-2">Evolution Chain</h3>
        <ul className="flex gap-4 overflow-x-auto">
          {evolutions.map((evo) => (
            <li
              key={evo.name}
              className="cursor-pointer hover:text-pumpkin-400 whitespace-nowrap"
              onClick={() => onSelectPokemon(evo.name)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractIdFromUrl(evo.url)}.png`}
                alt={evo.name}
                className="w-16 h-16"
              />
              <p className="text-center capitalize">{evo.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
