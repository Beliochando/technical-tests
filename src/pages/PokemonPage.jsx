import React from "react";
import { useParams } from "react-router-dom";

export function PokemonPage() {
  const { name } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Ficha de Pokémon: {name}</h1>
      <p>Aquí mostrarás la imagen, stats y evolución del Pokémon.</p>
    </div>
  );
}
