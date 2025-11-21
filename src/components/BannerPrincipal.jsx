// export default function BannerPrincipal() {
//   return (
//     <section className="w-full mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
//       {/* Primer banner */}
//       <div className="overflow-hidden rounded-lg shadow-lg">
//         <img
//           src="/img/banner-estores-digitales.jpg"
//           alt="Estores Digitales"
//           className="w-full h-64 md:h-[400px] object-cover"
//           style={{ objectPosition: "left center" }}
//         />
//       </div>

//       {/* Segundo banner */}
//       <div className="overflow-hidden rounded-lg shadow-lg">
//         <img
//           src="/img/banner-estores-lisos.jpg"  // Cambia por la ruta real de tu segundo banner
//           alt="Banner Complementario"
//           className="w-full h-64 md:h-[400px] object-cover"
//         />
//       </div>
//     </section>
//   );
// }

import { useNavigate } from "react-router-dom";

export default function BannerPrincipal({ categories = [] }) {
  const navigate = useNavigate();

  function irCategoriaPorNombre(nombreCategoria) {
    if (!categories || categories.length === 0) return;

    const categoria = categories.find(c => c.nombre === nombreCategoria);
    if (categoria) {
      navigate(`/categoria/${categoria._id}`);
    } else {
      console.warn(`Categoría '${nombreCategoria}' no encontrada`);
    }
  }

  return (
    <section className="w-full mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
      {/* Banner Estores Digitales */}
      <div
        className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={() => irCategoriaPorNombre("Estores Digitales")}
        title="Ver productos de Estores Digitales"
      >
        <img
          src="/img/banner-estores-digitales.jpg"
          alt="Estores Digitales"
          className="w-full h-64 md:h-[400px] object-cover"
          style={{ objectPosition: "left center" }}
        />
      </div>

      {/* Banner Estores Lisos */}
      <div
        className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onClick={() => irCategoriaPorNombre("Estores Lisos")}
        title="Ver productos de Estores Lisos"
      >
        <img
          src="/img/banner-estores-lisos.jpg"
          alt="Estores Lisos"
          className="w-full h-64 md:h-[400px] object-cover"
        />
      </div>

      {/* Más banners... */}
    </section>
  );
}
