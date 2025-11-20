import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";

export default function CategoryPage({ darkMode, setDarkMode, categories }) {
  const { id } = useParams();
  const [productosCategoria, setProductosCategoria] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar categoría seleccionada
  const categoriaSeleccionada = categories.find(cat => cat._id === id);

  useEffect(() => {
    async function fetchProductsByCategory() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/productos?categoria=${id}`);
        const data = await res.json();
        if (data.ok) {
          setProductosCategoria(data.productos);
        } else {
          setProductosCategoria([]);
        }
      } catch (error) {
        console.error("Error loading category products:", error);
        setProductosCategoria([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProductsByCategory();
  }, [id]);

  return (
    <div className="bg-fondo dark:darkBg min-h-screen transition-colors duration-500 text-secondary dark:bg-darkBg dark:text-white">
      <Header />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} categories={categories} />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold mb-6">
          Productos categoría - <span className="text-accent">{categoriaSeleccionada?.nombre}</span>
        </h1>
        {loading ? (
          <p>Cargando productos...</p>
        ) : productosCategoria.length > 0 ? (
          <ProductGrid productosFiltrados={productosCategoria} busquedaActiva={true} productosDestacados={[]} />
        ) : (
          <p>Resultados de la búsqueda, no hay productos que mostrar.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
