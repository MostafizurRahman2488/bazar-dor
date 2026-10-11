
import { notFound } from "next/navigation";

import { getProducts } from "@/services/productServices";
import { getCategories } from "@/services/categoryServices";

import CategoryHeader from "@/components/Category/CategoryHeader";
import ProductGrid from "@/components/Product/ProductGrid";

function normalize(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase();
}

export default async function CategoryDetailPage({ params }) {
    const { slug } = await params;

    // ১. API থেকে category ও product নিয়ে আসছি
    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ]);

    // ২. URL-এর slug অনুযায়ী category খুঁজছি
    const category = categories.find(
        (item) => normalize(item.slug) === normalize(slug)
    );

    // ৩. Category না পাওয়া গেলে 404 page দেখাবে
    if (!category) {
        notFound();
    }

    // ৪. শুধু নির্বাচিত category-এর product রাখছি
    const categoryProducts = products.filter((product) => {
        const productCategory = normalize(product.category);
        const productCategorySlug = normalize(product.categorySlug);
        const productCategoryName = normalize(product.categoryNameBn);

        return (
            productCategory === normalize(category.slug) ||
            productCategorySlug === normalize(category.slug) ||
            productCategory === normalize(category.name) ||
            productCategory === normalize(category.nameBn) ||
            productCategoryName === normalize(category.nameBn)
        );
    });

    // ৫. Category title ও product card দেখাচ্ছি
    return (
        <main className="mx-auto min-h-screen max-w-7xl px-5 py-10">
            <CategoryHeader category={category} />

            <section className="mt-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#202820]">
                        {category.nameBn ?? category.name} এর পণ্য
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        মোট {categoryProducts.length.toLocaleString("bn-BD")}টি
                        পণ্য পাওয়া গেছে
                    </p>
                </div>

                <ProductGrid products={categoryProducts} />
            </section>
        </main>
    );
}
