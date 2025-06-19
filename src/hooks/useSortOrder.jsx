import { useState } from "react";

export function useSortOrder(initial = null) {
  const [sortOrder, setSortOrder] = useState(initial);

  function toggleSortOrder() {
    setSortOrder((prev) =>
      prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
    );
  }

  return [sortOrder, toggleSortOrder];
}
