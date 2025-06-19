import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "../pages/Home";
import { ErrorPage } from "../pages/ErrorPage";
// import { ComparePage } from "../pages/ComparePage";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  // { path: "/compare", element: <ComparePage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
