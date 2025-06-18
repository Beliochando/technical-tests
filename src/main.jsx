import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter";
import { MoveProvider } from "./contexts/MoveContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoveProvider>
      <AppRouter />
    </MoveProvider>
  </StrictMode>
);
