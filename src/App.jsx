import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
        else if (Array.isArray(data.categorias)) setCategories(data.categorias);
        else setCategories([]);
      })
      .catch(() => setCategories([]));
  }, []);

  function handleSearch(query) {
    setSearchQuery(query);
  }

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

export default App;
