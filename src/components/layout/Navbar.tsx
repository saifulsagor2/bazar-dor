
import Link from "next/link";

import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/lib/types";

import Container from "@/components/ui/Container";
import CategoryNavigation from "./CategoryNavigation";
import PriceTicker from "./PriceTicker";

export default async function Navbar() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch (error) {
    console.error("Failed to load navbar data:", error);
  }

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">

      {/* Main Navbar */}
      <Container>
        <div className="flex min-h-[76px] items-center justify-between gap-4 py-3">

          {/* Logo and Date */}
          <Link
            href="/"
            aria-label="বাজার দর হোমপেজ"
            className="shrink-0"
          >
            <h1 className="text-2xl font-extrabold tracking-tight text-green-800 sm:text-3xl">
              🛒 বাজার দর
            </h1>

            <p className="mt-1 text-xs font-medium text-gray-500">
              {today}
            </p>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/signin"
              className="rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-800 transition-colors hover:bg-green-50 sm:px-5 sm:text-sm"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-800 sm:px-5 sm:text-sm"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-100">
          <CategoryNavigation categories={categories} />
        </div>
      </Container>

      {/* Infinite Price Ticker */}
      {products.length > 0 && (
        <PriceTicker products={products} />
      )}
    </header>
  );
}
