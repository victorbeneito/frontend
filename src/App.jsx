import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

// 1. IMPORTANTE: Te faltaba esta línea. Ajusta la ruta si tu carpeta config está en otro lado.
import clientAxios from "./config/axiosClient"; 

export default function App() { // 2. Solo declaramos la función una vez aquí
  // --- ESTADO: DARK MODE ---
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // --- ESTADO: DATOS ---
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- EFFECT 1: GESTIÓN DEL DARK MODE ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // --- EFFECT 2: CARGA DE CATEGORÍAS (TU NUEVO CÓDIGO) ---
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        // Usamos clientAxios (ya sin http://localhost...)
        const respuesta = await clientAxios.get("/categorias");
        const data = respuesta.data; 

        if (Array.isArray(data)) setCategories(data);
        else if (Array.isArray(data.categorias)) setCategories(data.categorias);
        else setCategories([]);

      } catch (error) {
        console.error("Error cargando categorías:", error);
        setCategories([]);
      }
    };

    obtenerCategorias();
  }, []);

  // --- HANDLERS ---
  function handleSearch(query) {
    setSearchQuery(query);
  }

  // --- RENDER (JSX) ---
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              categories={categories}
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/categoria/:id"
          element={<CategoryPage darkMode={darkMode} setDarkMode={setDarkMode} categories={categories} />}
        />
      </Routes>
    </BrowserRouter>
  );
}