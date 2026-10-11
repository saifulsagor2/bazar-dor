
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { Product, ProductSortOption } from "@/lib/types";

import {
  formatPrice,
  formatUnit,
  getPriceChangeLabel,
  sortProducts,
} from "@/lib/utils";

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sortOption, setSortOption] =
    useState<ProductSortOption>("default");

  const sortedProducts = useMemo(
    () => sortProducts(products, sortOption),
    [products, sortOption]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Heading and Sorting */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            সকল পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length}টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="shrink-0 text-sm text-gray-600"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(
                event.target.value as ProductSortOption
              )
            }
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">
              দাম: কম থেকে বেশি
            </option>
            <option value="price-high">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center">
          <p className="text-lg font-semibold text-gray-800">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-4 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => {
            const changeColor =
              product.change.dir === "up"
                ? "bg-red-50 text-red-600"
                : product.change.dir === "down"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                {/* Product Illustration */}
                <div className="flex h-32 items-center justify-center bg-green-50 sm:h-44">
                  <span className="text-6xl transition duration-300 group-hover:scale-110">
                    {product.categoryIcon || "🛒"}
                  </span>
                </div>

                {/* Product Information */}
                <div className="p-3 sm:p-4">
                  <p className="mb-1 text-xs text-gray-500">
                    {product.categoryNameBn}
                  </p>

                  <h3 className="line-clamp-1 font-bold text-gray-900 group-hover:text-green-700">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {formatUnit(product.unit)}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg font-bold text-green-700">
                      {formatPrice(product.today)}
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${changeColor}`}
                    >
                      {getPriceChangeLabel(
                        product.change.dir,
                        product.change.pct
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
