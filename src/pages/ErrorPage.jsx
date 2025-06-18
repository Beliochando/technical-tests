import React from "react";
export function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="mb-6">Lo sentimos, la página que buscas no existe.</p>
      <a
        href="/"
        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
      >
        Volver al inicio
      </a>
    </div>
  );
}
