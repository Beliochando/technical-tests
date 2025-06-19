import { useState } from "react";
import { useMove } from "../contexts/MoveContext";
import { PokeFilter } from "../components/PokeFilter";
import { PokeList } from "../components/PokeList";
import { PokeDetails } from "../components/PokeDetails";
import { CompareMoves } from "../pages/CompareMoves";
import { ComparePokemon } from "../pages/ComparePokemon"; // <-- Importamos ComparePokemon
import { TbFilter, TbFilterX } from "react-icons/tb";
import { badgeStyles } from "../styles/badgeStyles";
import { useSortOrder } from "../hooks/useSortOrder";
import { LiaSortAlphaDownSolid, LiaSortAlphaUpAltSolid } from "react-icons/lia";
import { BiSortDown } from "react-icons/bi";

export function Home() {
  const { selectedMove, setSelectedMove } = useMove();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showCompareMoves, setShowCompareMoves] = useState(false);
  const [showComparePokemon, setShowComparePokemon] = useState(false); // Estado para mostrar ComparePokemon
  const [pokemonToCompare, setPokemonToCompare] = useState(null); // Pokémon seleccionado para comparar
  const [badgeFilter, setBadgeFilter] = useState(null);
  const [showBadgeOptions, setShowBadgeOptions] = useState(false);
  const [sortOrder, toggleSortOrder] = useSortOrder(null);
  const [previousSelectedPokemon, setPreviousSelectedPokemon] = useState(null);

  function handleMoveSelectFromFilter(move) {
    setSelectedMove(move);
    setSelectedPokemon(null);
    setBadgeFilter(null);
    setShowCompareMoves(false);
    setShowComparePokemon(false);
  }

  function handleMoveSelectFromDetails(move) {
    setSelectedMove(move);
    setShowCompareMoves(false);
    setShowComparePokemon(false);
  }

  function handlePokemonClick(name) {
    if (selectedPokemon === name) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokemon(name);
      setShowCompareMoves(false);
      setShowComparePokemon(false);
    }
  }

  function handleBadgeFilterClick() {
    if (showBadgeOptions) {
      setShowBadgeOptions(false);
      setBadgeFilter(null);
    } else {
      setShowBadgeOptions(true);
      setBadgeFilter(badgeOptions[0]);
    }
  }

  function handleSelectBadge(badge) {
    setBadgeFilter(badge);
  }

  // Mostrar panel comparar moves
  function handleCompareMovesClick() {
    setShowCompareMoves(true);
    setSelectedPokemon(null);
    setShowComparePokemon(false);
  }

  // Mostrar panel comparar Pokémon
  function handleComparePokemonClick(name) {
    setPreviousSelectedPokemon(selectedPokemon); // guardamos el pokemon que había
    setPokemonToCompare(name);
    setShowComparePokemon(true);
    setSelectedPokemon(null); // Opcional: para ocultar el detalle mientras comparas
    setShowCompareMoves(false);
  }

  function handleCloseComparePokemon() {
    setShowComparePokemon(false);
    setPokemonToCompare(null);
    setSelectedPokemon(previousSelectedPokemon); // volvemos a poner el pokemon antes seleccionado
    setPreviousSelectedPokemon(null);
  }

  const badgeOptions = ["legendary", "mythical", "hasHiddenAbility"];

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col p-8 max-w-screen-xl w-full h-[800px] mb-4 mt-15 bg-base-100/30 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gradient-gb inline-block">
            Pokémon Explorer
          </h1>
        </div>

        <div className="flex gap-4 flex-1 overflow-hidden">
          {/* Columna izquierda: siempre en DOM para transición */}
          <div
            className={`flex flex-col transition-all duration-500 ease-in-out ${
              showComparePokemon
                ? "w-0 opacity-0 overflow-hidden"
                : selectedPokemon || showCompareMoves
                  ? "w-1/3 opacity-100"
                  : "w-full opacity-100"
            }`}
            style={{ minWidth: 0 }}
          >
            <PokeFilter
              onMoveSelect={handleMoveSelectFromFilter}
              selectedMove={selectedMove}
              onCompareMovesClick={handleCompareMovesClick}
            />

            {selectedMove && (
              <div className="flex items-center gap-2 mb-2 ">
                <button
                  onClick={toggleSortOrder}
                  aria-label="Toggle alphabetical sort"
                  title={
                    sortOrder === "asc"
                      ? "Ordenar Z → A"
                      : sortOrder === "desc"
                        ? "Quitar orden"
                        : "Ordenar A → Z"
                  }
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-grape-300 transition cursor-pointer ${
                    sortOrder
                      ? "bg-grape-200 hover:bg-grape-300 hover:text-white text-white"
                      : "bg-white/70 hover:bg-grape-200 hover:text-white text-grape-300"
                  }`}
                >
                  {sortOrder === "asc" && (
                    <LiaSortAlphaDownSolid className="w-5 h-5" />
                  )}
                  {sortOrder === "desc" && (
                    <LiaSortAlphaUpAltSolid className="w-5 h-5" />
                  )}
                  {!sortOrder && <BiSortDown className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleBadgeFilterClick}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-grape-300 transition cursor-pointer ${
                    badgeFilter
                      ? "bg-grape-200 hover:bg-grape-300 hover:text-white text-white"
                      : "bg-white/70 hover:bg-grape-200 hover:text-white text-grape-300"
                  }`}
                  aria-label="Toggle badge filter"
                >
                  {showBadgeOptions ? (
                    <TbFilterX className="w-4 h-4 text-current" />
                  ) : (
                    <TbFilter className="w-4 h-4 text-current" />
                  )}
                </button>

                {showBadgeOptions && (
                  <div className="flex gap-2">
                    {badgeOptions.map((badge) => {
                      const { className, icon } = badgeStyles[badge];
                      const badgeLabels = {
                        legendary: "Leg.",
                        mythical: "Myth.",
                        hasHiddenAbility: "Hidden",
                      };
                      return (
                        <button
                          key={badge}
                          onClick={() => handleSelectBadge(badge)}
                          className={`px-3 py-1 rounded-md capitalize text-xs cursor-pointer flex items-center gap-1 ${
                            badgeFilter === badge
                              ? `bg-grape-200 text-white ${className}`
                              : "bg-white text-grape-200 hover:bg-grape-100 hover:text-grape-300"
                          }`}
                        >
                          {icon}
                          {badgeLabels[badge]}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 overflow-y-auto rounded-lg p-6 scrollbar-custom bg-white/40">
              <PokeList
                move={selectedMove}
                badgeFilter={badgeFilter}
                onSelectPokemon={handlePokemonClick}
                selectedPokemon={selectedPokemon}
                isNarrow={
                  !!selectedPokemon || showCompareMoves || showComparePokemon
                }
                sortOrder={sortOrder}
              />
            </div>
          </div>

          {(selectedPokemon || showCompareMoves || showComparePokemon) && (
            <div
              className={`overflow-y-auto rounded-lg scrollbar-custom transition-all duration-500 ease-in-out ${
                showComparePokemon ? "w-full opacity-100" : "w-2/3 opacity-100"
              }`}
              style={{ height: "100%", minWidth: 0 }}
              key={
                selectedPokemon
                  ? selectedPokemon
                  : showCompareMoves
                    ? "compareMoves"
                    : "comparePokemon"
              }
            >
              {showCompareMoves ? (
                <CompareMoves selectedMove={selectedMove} />
              ) : showComparePokemon ? (
                <ComparePokemon
                  pokemonAName={pokemonToCompare}
                  selectedMove={selectedMove}
                  onClose={handleCloseComparePokemon}
                />
              ) : (
                <PokeDetails
                  name={selectedPokemon}
                  onSelectMove={handleMoveSelectFromDetails}
                  onSelectPokemon={handlePokemonClick}
                  onComparePokemon={handleComparePokemonClick}
                  selectedMove={selectedMove}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
