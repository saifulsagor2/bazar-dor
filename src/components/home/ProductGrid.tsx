
import Link from "next/link";
import { getProducts } from "@/lib/api";
import {
  formatPrice,
  formatUnit,
  getPriceChangeLabel,
} from "@/lib/utils";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto max-w-7xl px-4 py-12"
    >
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold text-green-700">
            বাজারের সর্বশেষ তথ্য
          </p>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।
          </p>
        </div>

        <span className="text-sm text-gray-500">
          মোট {products.length}টি পণ্য
        </span>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">
            পণ্যের তথ্য পাওয়া যাচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const changeColor =
              product.change.dir === "up"
                ? "text-red-600 bg-red-50"
                : product.change.dir === "down"
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 bg-gray-100";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center bg-green-50 sm:h-44">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.nameBn}
                      className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-6xl">
                      {product.categoryIcon}
                    </span>
                  )}
                </div>

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
