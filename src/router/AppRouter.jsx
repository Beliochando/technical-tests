import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "../pages/Home";
import { PokemonPage } from "../pages/PokemonPage";
import { ComparePage } from "../pages/ComparePage";
import { ErrorPage } from "../pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/pokemon", element: <PokemonPage /> },
  { path: "/compare", element: <ComparePage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
