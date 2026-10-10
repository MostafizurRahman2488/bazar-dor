
const PRODUCTS_API =
    "https://api-store-indol.vercel.app/api/bazardor/products";

export async function getProducts() {
    try {
        const res = await fetch(PRODUCTS_API, {
            next: { revalidate: 300 },
        });

        if (!res.ok) {
            console.error("Products API error:", res.status);
            return [];
        }

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
            console.error("Products API did not return JSON");
            return [];
        }

        const result = await res.json();

        const products = Array.isArray(result)
            ? result
            : result?.data ?? result?.products ?? [];

        return Array.isArray(products) ? products : [];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}
