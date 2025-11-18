import { useState } from "react";

export default function Navbar({ darkMode, setDarkMode, onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    console.log("Buscando:", value);
    if (onSearch) {
      onSearch(value); // informar al componente padre del valor de búsqueda
    }
  }

  return (
    <nav className="flex justify-between items-center bg-secondary text-neutral px-8 py-2 font-poppins dark:bg-darkNavBg dark:text-darkNavText transition-colors duration-300">
      <div className="flex space-x-6">
        <a href="/" className="hover:text-primary">Inicio</a>
        <a href="/categoria/estores-digitales">Estores Digitales</a>
        <a href="/categoria/estores-lisos">Estores Lisos</a>
        <a href="/categoria/fundas-sofa">Fundas de sofá</a>
        <a href="/categoria/cojines">Cojines</a>
        <a href="/categoria/fundas-nordicas">Fundas Nórdicas</a>
        <a href="/categoria/manteles">Manteles</a>
      </div>

      <div className="flex items-center space-x-4">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={handleChange}
          className="px-3 py-1 rounded-md text-black"
        />

        {/* Botón modo oscuro */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="bg-primary text-neutral rounded-full p-2 hover:bg-primaryHover transition-colors duration-300"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>

        {/* Botón iniciar sesión */}
        <button className="bg-primary text-neutral px-4 py-2 rounded-base" disabled>
          Iniciar sesión
        </button>
      </div>
    </nav>
  );
}
