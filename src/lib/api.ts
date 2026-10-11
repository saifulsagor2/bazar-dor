
const API_BASE_URL = "https://openapi.programming-hero.com/api";

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/bazardor/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getProducts(category?: string) {
  const url = category
    ? `${API_BASE_URL}/bazardor/products?category=${category}`
    : `${API_BASE_URL}/bazardor/products`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`${API_BASE_URL}/bazardor/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
