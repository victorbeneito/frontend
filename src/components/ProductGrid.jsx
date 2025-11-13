import ProductCard from './ProductCard';

export default function ProductGrid({ productos = [] }) {
  return (
    <section>
      <br></br>
      <h2 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map(producto => (
          <ProductCard key={producto._id || producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}
