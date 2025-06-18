const API_BASE = "https://pokeapi.co/api/v2";

export async function getAllMoves() {
  const res = await fetch(`${API_BASE}/move?limit=300`);
  const data = await res.json();
  return data.results;
}

export async function getPokemonByMove(moveName) {
  const res = await fetch(`${API_BASE}/move/${moveName}`);
  const data = await res.json();
  return data.learned_by_pokemon || [];
}
