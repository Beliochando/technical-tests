const API_BASE = "https://pokeapi.co/api/v2";

// leer todos los movimientos
export async function getAllMoves() {
  const res = await fetch(`${API_BASE}/move?limit=300`);
  const data = await res.json();
  return data.results;
}

// leer los Pokémon que aprenden un movimiento
export async function getPokemonByMove(moveName) {
  const res = await fetch(`${API_BASE}/move/${moveName}`);
  const data = await res.json();
  return data.learned_by_pokemon || [];
}

// leer el detalle de un Pokémon
export async function getPokemonDetails(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await res.json();
}

// Leer datos de la especie del Pokémon (incluye URL cadena evolución)
export async function getPokemonSpecies(url) {
  const res = await fetch(url);
  return await res.json();
}

// Leer cadena de evolución desde su URL
export async function getEvolutionChain(url) {
  const res = await fetch(url);
  return await res.json();
}
