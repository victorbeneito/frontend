export default function ProductCard({ producto }) {
  if (!producto) return null;

  const urlImagen =
    producto.imagenes && producto.imagenes.length > 0
      ? producto.imagenes[0]
      : null;

  return (
    <div
      className="font-poppins bg-white rounded-lg shadow-sm p-4 flex flex-col items-center border border-gray-200 hover:shadow-lg transition-all duration-300 w-full max-w-[360px] mx-auto
                 dark:bg-darkNavBg dark:text-darkNavText"
    >
      {/* Imatge */}
      {urlImagen ? (
        <img
          src={urlImagen}
          alt={producto.nombre}
          className="w-full h-72 object-contain mb-3 rounded-md"
        />
      ) : (
        <div className="w-full h-72 bg-gray-200 mb-3 rounded flex items-center justify-center text-gray-500 dark:bg-gray-700 dark:text-gray-300">
          Sin imagen
        </div>
      )}

      {/* Nom i detalls */}
      <h3 className="text-md font-semibold text-center mb-1 line-clamp-2">
        {producto.nombre || "Nombre no disponible"}
      </h3>

      <p className="font-orienta text-gray-500 text-sm text-center mb-2 dark:text-darkNavText">
        {producto.categoria?.nombre || "Sin categoría"}
      </p>

      {/* Preu amb color optimitzat a modo obscur */}
      <p className="text-accent font-bold mb-3 dark:text-darkBg">
      {producto.precio ? `${producto.precio.toFixed(2)} €` : "Sin precio"}
      </p>

      {/* Botó */}
      <button className="mt-auto bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primaryHover transition-colors duration-300">
        Comprar
      </button>
    </div>
  );
}
