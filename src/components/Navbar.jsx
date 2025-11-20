import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode, categories = [], onSearch }) {
   console.log("Categorias recibidas en Navbar:", categories);
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  }

  return (
    <nav className="flex justify-between items-center bg-secondary text-neutral px-8 py-2 font-poppins dark:bg-darkNavBg dark:text-darkNavText transition-colors duration-300">
      <div className="flex space-x-6 overflow-x-auto">
        <Link to="/" className="hover:text-primary">
          Inicio
        </Link>
        {categories.map((cat) => (
          <Link key={cat._id} to={`/categoria/${cat._id}`} className="hover:text-primary whitespace-nowrap">
            {cat.nombre}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={handleChange}
          className="px-3 py-1 rounded-md text-black"
        />

        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="bg-primary text-neutral rounded-full p-2 hover:bg-primaryHover transition-colors duration-300"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

        <button className="bg-primary text-neutral px-4 py-2 rounded-base" disabled>
          Iniciar sesión
        </button>
      </div>
    </nav>
  );
}
