export default function BannersSection() {
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

      {/* Tres banners pequeños */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <img
          src="/img/banner-fundas-sofa.jpg"
          alt="Banner 1"
          className="w-full h-[450px] object-cover rounded-lg shadow"
        />
        <img
          src="/img/banner-cojines.jpg"
          alt="Banner 2"
          className="w-full h-[450px] object-cover rounded-lg shadow"
        />
        <img
          src="/img/banner-ropa-cama.jpg"
          alt="Banner 3"
          className="w-full h-[450px] object-cover rounded-lg shadow"
        />
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
