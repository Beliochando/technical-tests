import React from "react";
import { Link } from "react-router-dom";

export function PokemonPage({ name }) {
  return (
    <Link to={`/pokemon/${name}`}>
      <div className="bg-white rounded-lg shadow p-4 hover:scale-105 transition transform">
        <p className="text-center font-medium capitalize">{name}</p>
      </div>
    </Link>
  );
}
