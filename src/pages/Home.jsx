import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductGrid from "../components/ProductGrid";
import BannersSection from "../components/BannersSection";
import BannerPrincipal from "../components/BannerPrincipal";
import SeoText from "../components/SeoText";
import SubscribeForm from "../components/SubscribeForm";
import Footer from "../components/Footer";
import clienteAxios from '../config/axiosClient';

export default function Home({ darkMode, setDarkMode, categories, onSearch, searchQuery }) {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  useEffect(() => {
    // Creamos una función asíncrona interna para poder usar await
    const buscarProductos = async () => {
      try {
        // CASO 1: Si NO hay texto en la búsqueda
        if (!searchQuery.trim()) {
          
          // CAMBIO: Usamos clienteAxios.get('/productos') sin localhost
          const { data } = await clienteAxios.get("/productos");

          if (data.ok) {
            setProductosDestacados(data.productos);
            setProductosFiltrados([]);
            setBusquedaActiva(false);
          }

        } else {
          // CASO 2: Si SÍ hay texto (Búsqueda activa)
          
          // CAMBIO: Construimos la URL relativa con el parámetro q
          // encodeURIComponent es importante mantenerlo para caracteres especiales
          const { data } = await clienteAxios.get(`/productos?q=${encodeURIComponent(searchQuery)}`);

          if (data.ok) {
            setProductosFiltrados(data.productos);
            setBusquedaActiva(true);
          }
        }
      } catch (error) {
        console.error("Error fetching productos:", error);
        // Aquí podrías añadir un estado de error si quisieras mostrar un mensaje al usuario
      }
    };

    // Ejecutamos la función
    buscarProductos();

}, [searchQuery]);

  return (
    <div className="bg-fondoPage dark:bg-darkBg min-h-screen transition-colors duration-500 text-black dark:text-white">
      <Header />
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        categories={categories}
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
      <main className="container mx-auto px-6">
        <Banner />
        {/* Pasamos categories para que BannerPrincipal navegue */}
        <BannerPrincipal categories={categories} />
        <ProductGrid
          productosDestacados={productosDestacados}
          productosFiltrados={productosFiltrados}
          busquedaActiva={busquedaActiva}
        />
        {/* Pasamos categories para que BannersSection navegue */}
        <BannersSection categories={categories} />
        <SeoText />
        <SubscribeForm />
      </main>
      <Footer />
    </div>
  );
}
