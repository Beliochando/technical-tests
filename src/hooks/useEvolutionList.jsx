export function useEvolutionList(evolutionChain) {
  if (!evolutionChain) return [];

  const evoList = [];
  function traverse(node) {
    evoList.push({
      name: node.species.name,
      url: node.species.url,
    });
    node.evolves_to.forEach(traverse);
  }
  traverse(evolutionChain.chain);

  return evoList;
}
