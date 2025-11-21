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

export default function Home({ darkMode, setDarkMode, categories, onSearch, searchQuery }) {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      fetch("http://localhost:3000/productos")
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setProductosDestacados(data.productos);
            setProductosFiltrados([]);
            setBusquedaActiva(false);
          }
        })
        .catch(error => console.error("Error fetching productos:", error));
    } else {
      fetch(`http://localhost:3000/productos?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            setProductosFiltrados(data.productos);
            setBusquedaActiva(true);
          }
        })
        .catch(error => console.error("Error fetching productos:", error));
    }
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
