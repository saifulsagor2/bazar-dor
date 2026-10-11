
import type { Product, ProductSortOption } from "@/lib/types";

// Convert English numbers to Bengali numbers
export function toBengaliNumber(value: number | string): string {
  return new Intl.NumberFormat("bn-BD").format(Number(value));
}

// Format price in Bangladeshi Taka
export function formatPrice(price: number): string {
  return `৳${toBengaliNumber(price)}`;
}

// Convert API unit into Bengali
export function formatUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "টি",
  };

  return units[unit] ?? unit;
}

// Get price change label
export function getPriceChangeLabel(
  direction: "up" | "down" | "flat",
  percentage: number
): string {
  if (direction === "flat") {
    return "অপরিবর্তিত";
  }

  const symbol = direction === "up" ? "▲" : "▼";

  return `${symbol} ${toBengaliNumber(Math.abs(percentage))}%`;
}

// Sort products by price
export function sortProducts(
  products: Product[],
  sortOption: ProductSortOption
): Product[] {
  const sortedProducts = [...products];

  switch (sortOption) {
    case "price-low":
      return sortedProducts.sort((a, b) => a.today - b.today);

    case "price-high":
      return sortedProducts.sort((a, b) => b.today - a.today);

    default:
      return sortedProducts;
  }
}

// Get products with increased prices
export function getPriceIncreasedProducts(
  products: Product[]
): Product[] {
  return products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
}

// Get products with decreased prices
export function getPriceDecreasedProducts(
  products: Product[]
): Product[] {
  return products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
}
