import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import clienteAxios from '../config/axiosClient';

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

        // 2. CAMBIO: 
        // - Usamos clienteAxios.get
        // - Quitamos 'http://localhost:3000'
        // - Dejamos solo la ruta y el parámetro dinámico
        const res = await clienteAxios.get(`/productos?categoria=${id}`);
        
        // 3. CAMBIO: 
        // - Ya no necesitamos await res.json()
        // - Los datos están directamente en res.data
        const data = res.data;

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
    
    if (id) { // Es buena práctica verificar que 'id' existe antes de llamar
        fetchProductsByCategory();
    }
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
