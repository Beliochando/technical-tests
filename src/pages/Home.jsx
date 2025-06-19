import { useState } from "react";
import { useMove } from "../contexts/MoveContext";
import { PokeFilter } from "../components/PokeFilter";
import { PokeList } from "../components/PokeList";
import { PokeDetails } from "../components/PokeDetails";
import { TbFilter, TbFilterX } from "react-icons/tb";
import { badgeStyles } from "../styles/badgeStyles";
import { useSortOrder } from "../hooks/useSortOrder";
import { LiaSortAlphaDownSolid, LiaSortAlphaUpAltSolid } from "react-icons/lia";
import { BiSortDown } from "react-icons/bi";

export function Home() {
  const { selectedMove, setSelectedMove } = useMove();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [badgeFilter, setBadgeFilter] = useState(null);
  const [showBadgeOptions, setShowBadgeOptions] = useState(false);
  const [sortOrder, toggleSortOrder] = useSortOrder(null);

  function handleMoveSelectFromFilter(move) {
    setSelectedMove(move);
    setSelectedPokemon(null);
    setBadgeFilter(null);
  }

  function handleMoveSelectFromDetails(move) {
    setSelectedMove(move);
  }

  function handlePokemonClick(name) {
    if (selectedPokemon === name) {
      setSelectedPokemon(null);
    } else {
      setSelectedPokemon(name);
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

  const badgeOptions = ["legendary", "mythical", "hasHiddenAbility"];

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col p-8 max-w-screen-xl w-full h-[800px] mb-4 mt-15 bg-base-100/30 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-gradient-gb inline-block">
          Pokémon Explorer
        </h1>

        <div className="flex gap-4 flex-1 overflow-hidden">
          {/* Columna izquierda */}
          <div
            className={`flex flex-col transition-all duration-300
            ${selectedPokemon ? "w-1/3" : "w-full"}`}
          >
            <PokeFilter
              onMoveSelect={handleMoveSelectFromFilter}
              selectedMove={selectedMove}
            />

            {selectedMove && (
              <div className="flex items-center gap-2 mb-2 ">
                {/* Botón para ordenar alfabéticamente */}
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

                {/* Botón para filtrar por badge */}
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
                isNarrow={!!selectedPokemon}
                sortOrder={sortOrder}
              />
            </div>
          </div>

          {/* Detalle del Pokémon a la derecha */}
          {selectedPokemon && (
            <div
              className="w-2/3 overflow-y-auto bg-white/70 rounded-lg p-6 scrollbar-custom"
              style={{ height: "100%" }}
              key={selectedPokemon}
            >
              <PokeDetails
                name={selectedPokemon}
                onSelectMove={handleMoveSelectFromDetails}
                onSelectPokemon={handlePokemonClick}
                selectedMove={selectedMove}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
