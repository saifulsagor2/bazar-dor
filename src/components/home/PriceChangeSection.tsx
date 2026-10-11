
import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  formatPrice,
  formatUnit,
  getPriceChangeLabel,
} from "@/lib/utils";

interface PriceChangeSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  direction: "up" | "down";
}

export default function PriceChangeSection({
  title,
  subtitle,
  products,
  direction,
}: PriceChangeSectionProps) {
  const isUp = direction === "up";

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <span className={isUp ? "text-red-600" : "text-green-600"}>
            {isUp ? "▲" : "▼"}
          </span>{" "}
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
          এই মুহূর্তে কোনো তথ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white p-4 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <div className="flex h-20 items-center justify-center rounded-xl bg-gray-50 text-4xl">
                {product.categoryIcon}
              </div>

              <p className="mt-3 text-xs text-gray-500">
                {product.categoryNameBn}
              </p>

              <h3 className="mt-1 truncate font-bold text-gray-900 group-hover:text-green-700">
                {product.nameBn}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                প্রতি {formatUnit(product.unit)}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-gray-900">
                  {formatPrice(product.today)}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    isUp
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {getPriceChangeLabel(
                    product.change.dir,
                    product.change.pct
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
