
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/services/productService";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();

  const product = products.find(
    (item) =>
      String(item.slug) === slug ||
      String(item.id) === slug
  );

  if (!product) {
    notFound();
  }

  const price = Number(product.today || 0).toLocaleString("bn-BD");

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 hover:underline"
      >
        ← হোমপেজে ফিরে যান
      </Link>

      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="text-6xl">🛒</div>

        <h1 className="mt-5 text-3xl font-bold text-gray-900">
          {product.nameBn || product.name}
        </h1>

        <p className="mt-3 text-gray-600">
          প্রতি {product.unit}
        </p>

        <p className="mt-6 text-sm text-gray-500">
          আজকের দাম
        </p>

        <p className="mt-1 text-3xl font-bold text-green-700">
          {price} টাকা
        </p>
      </section>
    </main>
  );
}