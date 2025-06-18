import { useCallback } from "react";

export function useCapitalizeFirstLetter() {
  const capitalizeFirstLetter = useCallback((str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, []);

  return capitalizeFirstLetter;
}
