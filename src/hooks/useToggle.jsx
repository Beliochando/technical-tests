import { useState } from "react";

export function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  function toggle() {
    setState((s) => !s);
  }
  return [state, toggle];
}
