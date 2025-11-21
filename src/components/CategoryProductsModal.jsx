import React, { useState } from "react";
import clienteAxios from './config/axiosClient';

export default function CategoryProductsModal({ categories }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");

  // Mapea las categorías visibles en los banners con sus ids backend (u objetos nombre)
  // Para "Ropa de cama" lista ids de varias categorías
  const categoriasBanner = {
    "Estores Digitales": categories.find(c => c.nombre === "Estores Digitales")?._id,
    "Estores Lisos": categories.find(c => c.nombre === "Estores Lisos")?._id,
    "Fundas de sofá": categories.find(c => c.nombre === "Fundas de sofá")?._id,
    "Cojines": categories.find(c => c.nombre === "Cojines")?._id,
    "Ropa de cama": categories.filter(c =>
      ["Fundas Nórdicas", "Colchas", "Sabanas"].includes(c.nombre)
    ).map(c => c._id)
  };

  async function openModalPorCategoria(categoriaClave) {
    setCategoriaNombre(categoriaClave);
    const ids = categoriasBanner[categoriaClave];

    try {
      let endpoint = ""; // He cambiado el nombre de 'url' a 'endpoint' para que tenga más sentido, pero puedes usar 'url'

      if (Array.isArray(ids)) {
        // 1. CAMBIO: Quitamos 'http://localhost:3000'
        // Dejamos solo la ruta y los parámetros
        endpoint = `/productos?categoria=${ids.join(",")}`;
      } else {
        // 1. CAMBIO: Lo mismo aquí
        endpoint = `/productos?categoria=${ids}`;
      }

      // 2. CAMBIO: Usamos clienteAxios
      // Axios ya convierte la respuesta a JSON automáticamente
      const respuesta = await clienteAxios.get(endpoint);
      const data = respuesta.data; 

      // 3. El resto de tu lógica se mantiene igual
      // Asumo que tu backend devuelve un objeto { ok: true, productos: [...] }
      if (data.ok) {
        setProductos(data.productos);
      } else {
        setProductos([]);
      }
      setModalOpen(true);

    } catch (error) {
      console.error("Error al cargar productos:", error);
      setProductos([]);
      setModalOpen(true);
    }
}

  function closeModal() {
    setModalOpen(false);
    setProductos([]);
    setCategoriaNombre("");
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {/* Banners clicables */}
        {Object.keys(categoriasBanner).map((catName) => (
          <div
            key={catName}
            onClick={() => openModalPorCategoria(catName)}
            className="cursor-pointer rounded-lg shadow-lg overflow-hidden max-w-xs"
            title={`Ver productos de ${catName}`}
          >
            <img
              src={`/img/banner-${catName.toLowerCase().replace(/\s/g, "-")}.jpg`}
              alt={`Banner ${catName}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 bg-secondary dark:bg-darkNavBg text-neutral text-center font-semibold">
              {catName}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-lg">
            <button
              onClick={closeModal}
              className="text-3xl font-bold mb-4 float-right hover:text-red-600"
              aria-label="Cerrar ventana"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Productos - {categoriaNombre}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productos.length > 0 ? (
                productos.map((p) => (
                  <div key={p._id} className="border p-4 rounded shadow-sm">
                    <h3 className="font-semibold">{p.nombre}</h3>
                    {p.imagen && (
                      <img src={p.imagen} alt={p.nombre} className="mt-2 max-h-40 object-contain" />
                    )}
                    <p className="mt-1">{p.descripcion}</p>
                    <p className="mt-1 font-bold">{p.precio} €</p>
                  </div>
                ))
              ) : (
                <p>No hay productos en esta categoría.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
