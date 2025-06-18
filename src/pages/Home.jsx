import { useMove } from "../contexts/MoveContext";
import { PokeFilter } from "../components/PokeFilter";
import { PokeList } from "../components/PokeList";

export function Home() {
  const { selectedMove, setSelectedMove } = useMove();

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col p-8 max-w-screen-sm md:max-w-screen-xl w-full h-[800px] mb-4 mt-15 bg-base-100/30 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-gradient-gb inline-block">
          Pokémon Explorer
        </h1>
        <p className="mb-4 text-soft-400">
          Discover and explore Pokémon, their moves, and abilities all in one
          place.
        </p>
        <hr className="border-white mb-4" />
        <PokeFilter
          onMoveSelect={setSelectedMove}
          selectedMove={selectedMove}
        />
        <div className="flex-1 overflow-y-auto bg-white/40 px-6 py-3 rounded-lg h-full">
          <PokeList move={selectedMove} />
        </div>
      </div>
    </div>
  );
}
