export default function ProductCard({ producto }) {
  if (!producto) return null;

  // Obtenemos la primera imagen del array, si existe
  const urlImagen = producto.imagenes && producto.imagenes.length > 0
    ? producto.imagenes[0]
    : null;

    

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center border border-gray-100">
      {urlImagen ? (
        <img src={urlImagen} alt={producto.nombre} className="h-36 object-cover mb-2 rounded" />
      ) : (
        <div className="h-36 w-full bg-gray-200 mb-2 rounded flex items-center justify-center text-gray-500">
          Sin Imagen
        </div>
      )}
      <h3 className="text-lg font-semibold">{producto.nombre || "Nombre no disponible"}</h3>
      <p className="text-primary font-bold mb-2">{producto.precio ? `${producto.precio} €` : "Precio no disponible"}</p>
      <button className="bg-primary text-white px-6 py-1.5 rounded font-semibold hover:bg-primaryHover transition-colors duration-300" disabled>
        Comprar
      </button>
    </div>
  );
}

