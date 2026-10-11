
import ProductGrid from "../Product/ProductGrid";
import { getProducts } from "@/services/productServices";

export default async function AllProducts() {
  const allProducts = await getProducts();

  return (

    <section
      id="সব-পণ্য"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 "
    >
      <div className="mb-6 ml-4">
        <h2 className="text-2xl font-bold text-[#202820]">
          সব পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          মোট {allProducts.length.toLocaleString("bn-BD")}
          টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <ProductGrid products={allProducts} />
    </section>

  );
}
