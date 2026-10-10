
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
        এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id ?? product.slug}
          product={product}
        />
      ))}
    </div>
  );
}