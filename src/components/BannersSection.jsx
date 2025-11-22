import { useNavigate } from "react-router-dom";

export default function BannersSection({ categories = [] }) {
  const navigate = useNavigate();

  function irCategoriaPorNombre(nombreCategoria) {
    if (!categories || categories.length === 0) return;

    // Busquem la categoria actulitzan per a que ignore majuscules i espais
    const categoria = categories.find(
      c => c.nombre.trim().toLowerCase() === nombreCategoria.trim().toLowerCase()
    );

    if (categoria) {
      navigate(`/categoria/${categoria._id}`);
    } else {
      console.warn(
        `Categoría '${nombreCategoria}' no encontrada. Categorías disponibles:`,
        categories.map(c => c.nombre)
      );
    }
  }

  return (
    <section className="w-full my-10">
      {/* Banner intermedio */}
      <div className="mb-10">
        <img
          src="/img/medidas-personalizadas.jpg"
          alt="Banner intermedio"
          className="w-full h-[250px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Tres banners pequeños clicables */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div
          onClick={() => irCategoriaPorNombre("Fundas de Sofá")}
          className="cursor-pointer w-full h-[450px] rounded-lg shadow overflow-hidden"
          title="Ver productos de Fundas de Sofá"
        >
          <img
            src="/img/banner-fundas-sofa.jpg"
            alt="Banner Fundas de sofá"
            className="w-full h-full object-cover rounded-lg shadow"
          />
        </div>

        <div
          onClick={() => irCategoriaPorNombre("Cojines")}
          className="cursor-pointer w-full h-[450px] rounded-lg shadow overflow-hidden"
          title="Ver productos de Cojines"
        >
          <img
            src="/img/banner-cojines.jpg"
            alt="Banner Cojines"
            className="w-full h-full object-cover rounded-lg shadow"
          />
        </div>

        <div
          onClick={() => irCategoriaPorNombre("Ropa de Cama")}
          className="cursor-pointer w-full h-[450px] rounded-lg shadow overflow-hidden"
          title="Ver productos de Ropa de Cama"
        >
          <img
            src="/img/banner-ropa-cama.jpg"
            alt="Banner Ropa de cama"
            className="w-full h-full object-cover rounded-lg shadow"
          />
        </div>
      </div>

      {/* Banner final */}
      <div>
        <img
          src="/img/banner-envios.jpg"
          alt="Banner final"
          className="w-full h-[300px] object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
