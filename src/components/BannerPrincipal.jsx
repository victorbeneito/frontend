export default function BannerPrincipal() {
  return (
    <section className="w-full mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0">
      {/* Primer banner */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src="/img/banner-estores-digitales.jpg"
          alt="Estores Digitales"
          className="w-full h-64 md:h-[400px] object-cover"
          style={{ objectPosition: "left center" }}
        />
      </div>

      {/* Segundo banner */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src="/img/banner-estores-lisos.jpg"  // Cambia por la ruta real de tu segundo banner
          alt="Banner Complementario"
          className="w-full h-64 md:h-[400px] object-cover"
        />
      </div>
    </section>
  );
}
