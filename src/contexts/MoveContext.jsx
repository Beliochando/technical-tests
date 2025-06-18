import { createContext, useContext, useState } from "react";

const MoveContext = createContext();

export function MoveProvider({ children }) {
  const [selectedMove, setSelectedMove] = useState("");

  return (
    <MoveContext.Provider value={{ selectedMove, setSelectedMove }}>
      {children}
    </MoveContext.Provider>
  );
}

export function useMove() {
  return useContext(MoveContext);
}
