
import { getProducts } from "@/services/productServices";
import ProductGrid from "@/components/Product/ProductGrid";

export default async function FallingProducts() {
    const allProducts = await getProducts();

    const fallingProducts = allProducts
        .filter((product) => product.change?.dir === "down")
        .sort(
            (a, b) =>
                Math.abs(Number(b.change?.pct || 0)) -
                Math.abs(Number(a.change?.pct || 0))
        )
        .slice(0, 6);

    return (
        <section className="mx-auto max-w-7xl px-5 py-10">
            <div className="mb-6 ml-4">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    <span className="text-green-600">▼</span>
                    আজ দাম কমেছে
                </h2>
            </div>

            <ProductGrid products={fallingProducts} />
        </section>
    );
}
