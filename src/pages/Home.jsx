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
    // Creem una funció asíncrona interna per a poder utilitzar await 
    const buscarProductos = async () => {
      try {
        // CAS 1: Si NO hi ha text en la busqueda
        if (!searchQuery.trim()) {
          
          const { data } = await clienteAxios.get("/productos");

          if (data.ok) {
            setProductosDestacados(data.productos);
            setProductosFiltrados([]);
            setBusquedaActiva(false);
          }

        } else {
          // CAS 2: Si SÍ hi ha text en la busqueda
          const { data } = await clienteAxios.get(`/productos?q=${encodeURIComponent(searchQuery)}`);

          if (data.ok) {
            setProductosFiltrados(data.productos);
            setBusquedaActiva(true);
          }
        }
      } catch (error) {
        console.error("Error fetching productos:", error);
              }
    };

    buscarProductos();

}, [searchQuery]);

  return (
    <div className="bg-fondo dark:bg-darkBg min-h-screen transition-colors duration-500 text-black dark:text-white">
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
        {/* Pasem categories per a que BannerPrincipal navegue */}
        <BannerPrincipal categories={categories} />
        <ProductGrid
          productosDestacados={productosDestacados}
          productosFiltrados={productosFiltrados}
          busquedaActiva={busquedaActiva}
        />
        {/* Pasem categories per a que BannersSection navegue */}
        <BannersSection categories={categories} />
        <SeoText />
        <SubscribeForm />
      </main>
      <Footer />
    </div>
  );
}
