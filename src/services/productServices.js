
const PRODUCTS_API =
  "https://api.api-store.workers.dev/api/bazardor/products";

export async function getProducts() {
  const response = await fetch(PRODUCTS_API, {
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`Products fetch failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("Products API did not return JSON");
  }

  const result = await response.json();

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result.data)) {
    return result.data;
  }

  return [];
}
