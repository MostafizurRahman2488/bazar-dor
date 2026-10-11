
const CATEGORIES_API =
  "https://api.api-store.workers.dev/api/bazardor/products";

export async function getCategories() {
  try {
    const res = await fetch(CATEGORIES_API, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();

    const categories = Array.isArray(result)
      ? result
      : result?.categories ?? result?.data ?? [];

    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("Category fetch error:", error);
    return [];
  }
}
