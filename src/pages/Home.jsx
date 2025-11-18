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

export default function Home({ darkMode, setDarkMode }) {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setProductosDestacados(data.productos);
          setProductosFiltrados([]);
          setBusquedaActiva(false);
        }
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }, []);

  function handleSearch(query) {
    if (!query.trim()) {
      setBusquedaActiva(false);
      setProductosFiltrados([]);
      return;
    }
    setBusquedaActiva(true);

    fetch(`http://localhost:3000/productos?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setProductosFiltrados(data.productos);
        }
      })
      .catch((error) => console.error("Error fetching productos:", error));
  }

  return (
    <div className="bg-fondoPage dark:darkBg min-h-screen transition-colors duration-500 text-black dark:text-white">
      <Header />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onSearch={handleSearch} />
      <main className="container mx-auto px-6">
        <Banner />
        <BannerPrincipal />
        <ProductGrid
          productosDestacados={productosDestacados}
          productosFiltrados={productosFiltrados}
          busquedaActiva={busquedaActiva}
        />
        <BannersSection />
        <SeoText />
        <SubscribeForm />
      </main>
      <Footer />
    </div>
  );
}
