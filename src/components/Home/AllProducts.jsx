import ProductGrid from "../Product/ProductGrid";
import { getProducts } from "@/services/productServices";



export default async function AllProducts() {
  const allProducts = await getProducts();

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          সব পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          বাজারের সব পণ্যের আজকের দাম এক নজরে দেখুন।
          মোট {allProducts.length.toLocaleString("bn-BD")}টি পণ্য।
        </p>
      </div>

      <ProductGrid products={allProducts} />
    </section>
  );
}
