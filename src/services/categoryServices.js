
const CATEGORIES_API =
  "https://api.api-store.workers.dev/api/bazardor/categories";

export async function getCategories() {
  const response = await fetch(CATEGORIES_API, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `Categories fetch failed: ${response.status}`
    );
  }

  const result = await response.json();

  const categories = Array.isArray(result)
    ? result
    : result?.categories ?? result?.data ?? [];

  if (!Array.isArray(categories)) {
    throw new Error("Invalid categories API response");
  }

  return categories;
}
