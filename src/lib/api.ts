
import type { Category, Product } from "@/lib/types";

const API_BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

// Extract an array from different API response formats
function extractArray<T>(
  response: unknown,
  possibleKeys: string[]
): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (
    typeof response === "object" &&
    response !== null
  ) {
    const data = response as Record<string, unknown>;

    for (const key of possibleKeys) {
      const value = data[key];

      if (Array.isArray(value)) {
        return value as T[];
      }
    }

    if (
      typeof data.data === "object" &&
      data.data !== null
    ) {
      return extractArray<T>(data.data, possibleKeys);
    }
  }

  return [];
}

// Common API request helper
async function fetchAPI<T>(
  endpoint: string
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return (await response.json()) as T;
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetchAPI<unknown>("/categories");

  return extractArray<Category>(response, [
    "categories",
    "data",
  ]);
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetchAPI<unknown>("/products");

  return extractArray<Product>(response, [
    "products",
    "data",
  ]);
}

// Get products by category
export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const endpoint = `/products?category=${encodeURIComponent(
    categorySlug
  )}`;

  const response = await fetchAPI<unknown>(endpoint);

  return extractArray<Product>(response, [
    "products",
    "data",
  ]);
}

// Get a single product by ID
export async function getProductById(
  id: number
): Promise<Product | null> {
  try {
    const response = await fetchAPI<unknown>(
      `/products/${id}`
    );

    if (
      typeof response !== "object" ||
      response === null
    ) {
      return null;
    }

    const data = response as Record<string, unknown>;

    // API response may contain the product inside data
    if (
      typeof data.data === "object" &&
      data.data !== null
    ) {
      return data.data as unknown as Product;
    }

    // API may return the product directly
    if ("id" in data) {
      return data as unknown as Product;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Find a product by its slug
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const products = await getProducts();

    return (
      products.find((product) => product.slug === slug) ??
      null
    );
  } catch (error) {
    console.error("Failed to find product:", error);
    return null;
  }
}
