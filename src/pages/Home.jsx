import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductGrid from "../components/ProductGrid";
import logo from "../img/logo-hogar.jpg";

export default function Home() {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    // Cambia esta URL por la real donde tu backend sirve los productos
    fetch('http://localhost:3000/productos')
      .then(response => response.json())
      .then(data => setProductosDestacados(data))
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  return (
    <div className="bg-fondoPage min-h-screen">
      <Header logo={logo} />
      <Navbar />
      <main className="container mx-auto px-6">
        <Banner />
        <ProductGrid productos={productosDestacados} />
      </main>
    </div>
  );
}
