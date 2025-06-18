import { useState } from "react";
import { PokeFilter } from "../components/PokeFilter";
import { PokeList } from "../components/PokeList";

export function Home() {
  const [selectedMove, setSelectedMove] = useState("");

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-4 max-w-screen-sm md:max-w-screen-xl w-full mb-4 mt-20">
        <h1 className="text-3xl font-bold mb-4">Pokémon Moves Explorer</h1>
        <p className="mb-6 text-gray-600">
          Select a move to see which Pokémon can learn it.
        </p>

        <PokeFilter onMoveSelect={setSelectedMove} />
        <PokeList move={selectedMove} />
      </div>
    </div>
  );
}
