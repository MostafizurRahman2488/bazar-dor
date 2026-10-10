
import { getProducts } from "@/services/productServices";
import ProductGrid from "@/components/Product/ProductGrid";

export default async function RisingProducts() {
    const allProducts = await getProducts();

    const risingProducts = allProducts
        .filter((product) => product.change?.dir === "up")
        .sort(
            (a, b) =>
                Math.abs(Number(b.change?.pct || 0)) -
                Math.abs(Number(a.change?.pct || 0))
        )
        .slice(0, 6);

    return (
        <section className="mx-auto max-w-7xl px-5 py-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    আজ দাম বেড়েছে ▲
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    আজ সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য
                </p>
            </div>

            <ProductGrid products={risingProducts} />
        </section>
    );
}