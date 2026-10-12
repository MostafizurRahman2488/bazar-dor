
import Link from "next/link";

import { getProducts } from "@/services/productServices";
import { getCategories } from "@/services/categoryServices";

import CategoryHeader from "@/components/Category/CategoryHeader";
import CategoryProductList from "@/components/Category/CategoryProductList";


function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
}

function getCategoryValues(category) {
  return [
    category?.slug,
    category?.id,
    category?.name,
    category?.nameBn,
    category?.category,
    category?.categorySlug,
  ]
    .filter((value) => value !== undefined && value !== null)
    .map(normalize);
}

function productMatchesCategory(product, category) {
  const categoryValues = getCategoryValues(category);

  const productValues = [
    product?.categorySlug,
    product?.categoryNameBn,
    product?.categoryName,
    product?.categoryId,
    typeof product?.category === "object"
      ? product.category?.slug
      : product?.category,
    typeof product?.category === "object"
      ? product.category?.nameBn
      : null,
    typeof product?.category === "object"
      ? product.category?.name
      : null,
  ]
    .filter((value) => value !== undefined && value !== null)
    .map(normalize);

  return productValues.some((value) =>
    categoryValues.includes(value)
  );
}

function EmptyCategory({ title = "এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি" }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
      <div className="text-5xl" aria-hidden="true">🛒</div>

      <h2 className="mt-4 text-xl font-bold text-[#202820]">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find(
    (item) => normalize(item.slug) === normalize(slug)
  );

  // Invalid category slug: show a helpful empty state.
  if (!category) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-5 py-10">
        <EmptyCategory title="ক্যাটাগরিটি খুঁজে পাওয়া যায়নি" />
      </main>
    );
  }

  const categoryProducts = products.filter((product) =>
    productMatchesCategory(product, category)
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 sm:py-10">
      <CategoryHeader
        category={category}
        productCount={categoryProducts.length}
      />

      <section className="mt-8">
        {categoryProducts.length > 0 ? (
          <>

            <CategoryProductList products={categoryProducts} />
          </>
        ) : (
          <EmptyCategory />
        )}
      </section>
    </main>
  );
}
