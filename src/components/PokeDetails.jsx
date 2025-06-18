import { MdOutlineCatchingPokemon } from "react-icons/md";
import { usePokemonBadges } from "../hooks/usePokemonBadges";
import { usePokemonData } from "../hooks/usePokemonData";
import { useEvolutionList } from "../hooks/useEvolutionList";
import { extractIdFromUrl } from "../utils";
import { MdStars, MdShield } from "react-icons/md";
import { GiNinjaHead } from "react-icons/gi";
import { useCapitalizeFirstLetter } from "../hooks/useCapitalizeFirstLetter";

export function PokeDetails({ name, onSelectPokemon, onSelectMove }) {
  const { pokemon, species, evolutionChain } = usePokemonData(name);
  const evolutions = useEvolutionList(evolutionChain);
  const badgesData = usePokemonBadges(name ? [{ name }] : []);
  const badge = badgesData.length > 0 ? badgesData[0].badges : null;
  const capitalize = useCapitalizeFirstLetter();

  if (!pokemon) return <p className="text-soft-200">Loading Pokémon...</p>;

  const officialArtworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="text-grape-200 w-full h-full flex flex-col p-2">
      <div className="relative">
        <h2 className="text-[35px] font-bold flex items-center gap-2 m-0 p-0">
          <MdOutlineCatchingPokemon className="m-0 p-0" />
          {pokemon.name.toUpperCase()}
        </h2>

        {badge && (
          <div className="absolute top-0 right-0 flex gap-2">
            {badge.legendary && (
              <span className="badge badge-soft badge-error text-sm">
                <MdStars size={14} /> Legendary
              </span>
            )}
            {badge.mythical && (
              <span className="badge badge-soft badge-warning text-sm">
                <MdShield size={14} /> Mythical
              </span>
            )}
            {badge.hasHiddenAbility && (
              <span className="badge badge-soft badge-info text-sm">
                <GiNinjaHead size={14} /> Hidden Ability
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-8 items-start max-w-4xl">
        <div className="w-48 h-48 flex items-center justify-center">
          <img
            src={officialArtworkUrl}
            alt={pokemon.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col max-x-md gap-4">
          <div className="bg-grape-100/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Moves</h3>
            <div className="flex flex-wrap max-h-32 overflow-y-auto scrollbar-hidden rounded-lg gap-2 cursor-pointer">
              {pokemon.moves.map((m) => (
                <li
                  key={m.move.name}
                  className="tag list-none"
                  onClick={() => onSelectMove(m.move.name)}
                >
                  {capitalize(m.move.name)}
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4 border-grape-100" />

      <div className="flex flex-col gap-4 rounded-lg min-h-[150px] w-full flex-grow overflow-auto">
        <div className="flex items-center gap-4 rounded-lg">
          <p className="text-sm font-bold uppercase opacity-70 whitespace-nowrap text-grape-300">
            Types
          </p>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="bg-pumpkin-100 text-pumpkin-400 px-3 py-1 rounded-lg font-semibold text-sm"
              >
                {capitalize(t.type.name)}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-1 border-grape-100" />

        <div className="flex-grow overflow-auto">
          <h3 className="font-semibold mb-2">Stats</h3>
          <div className="flex w-full gap-3">
            {pokemon.stats.map(({ base_stat, stat }) => (
              <div
                key={stat.name}
                className="bg-grape-100/40 px-4 py-3 rounded-lg text-center whitespace-nowrap"
                style={{ flex: "1 1 auto" }}
              >
                <p className="text-2xl font-bold">{base_stat}</p>
                <p className="text-xs font-medium uppercase opacity-70">
                  {stat.name.replace("-", " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-4 border-grape-100" />

      {/* Aquí ponemos la sección de Evolutions pegada abajo */}
      <div className="mt-auto">
        <h3 className="font-semibold mb-2">Evolution Chain</h3>
        <ul className="flex gap-4 overflow-x-auto scrollbar-hidden">
          {evolutions.map((evo) => (
            <li
              key={evo.name}
              className="cursor-pointer hover:text-pumpkin-400 whitespace-nowrap"
              onClick={() => onSelectPokemon(evo.name)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractIdFromUrl(
                  evo.url
                )}.png`}
                alt={evo.name}
                className="w-16 h-16 object-contain"
              />
              <p className="text-center capitalize">{evo.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
