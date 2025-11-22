import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";


import clientAxios from "./config/axiosClient"; 

export default function App() { 
  // --- ESTAT: DARK MODE ---
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // --- ESTADO: DADES ---
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- EFFECT 1: GESTIÓ DEL DARK MODE ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // --- EFFECT 2: CARREGA DE CATEGORÍES
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
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