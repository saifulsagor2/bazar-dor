
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/api";

import {
  formatPrice,
  formatUnit,
  getPriceChangeLabel,
} from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const minimumPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maximumPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : product.today;

  const changeColor =
    product.change.dir === "up"
      ? "bg-red-50 text-red-600"
      : product.change.dir === "down"
        ? "bg-green-50 text-green-600"
        : "bg-gray-100 text-gray-600";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-green-700">
            {product.nameBn}
          </span>
        </div>

        {/* Product Information */}
        <section className="grid gap-6 lg:grid-cols-2">

          {/* Product Illustration */}
          <div className="flex min-h-64 items-center justify-center rounded-2xl bg-green-50 p-8 sm:min-h-96">
            <span className="text-8xl sm:text-9xl">
              {product.categoryIcon || "🛒"}
            </span>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">

            <p className="mb-3 text-sm font-semibold text-green-700">
              {product.categoryIcon} {product.categoryNameBn}
            </p>

            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {product.nameBn}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              বাজারের সর্বশেষ তথ্য অনুযায়ী এই পণ্যের বর্তমান দাম।
            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                আজকের বাজারদর
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-extrabold text-green-700">
                  {formatPrice(product.today)}
                </span>

                <span className="text-sm text-gray-500">
                  / {formatUnit(product.unit)}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}
                >
                  {getPriceChangeLabel(
                    product.change.dir,
                    product.change.pct
                  )}
                </span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mt-8 grid grid-cols-3 gap-3">

              <div className="rounded-xl bg-green-50 p-3">
                <p className="text-xs text-gray-600">
                  সর্বনিম্ন
                </p>

                <p className="mt-2 text-lg font-bold text-green-700">
                  {formatPrice(minimumPrice)}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3">
                <p className="text-xs text-gray-600">
                  গড় দাম
                </p>

                <p className="mt-2 text-lg font-bold text-blue-700">
                  {formatPrice(Math.round(averagePrice))}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3">
                <p className="text-xs text-gray-600">
                  সর্বোচ্চ
                </p>

                <p className="mt-2 text-lg font-bold text-red-700">
                  {formatPrice(maximumPrice)}
                </p>
              </div>

            </div>

            <p className="mt-5 text-xs text-gray-500">
              পণ্যের একক: {formatUnit(product.unit)}
            </p>

          </div>
        </section>

        {/* Market-wise Price */}
        <section className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              বিভিন্ন বাজারে {product.nameBn}-এর দাম
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              বাজার ও বিভাগ অনুযায়ী মূল্য তুলনা করুন।
            </p>
          </div>

          {markets.length === 0 ? (
            <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-left text-sm">

                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                    <th className="px-4 py-4 font-semibold">
                      বাজার
                    </th>

                    <th className="px-4 py-4 font-semibold">
                      বিভাগ
                    </th>

                    <th className="px-4 py-4 font-semibold">
                      সর্বনিম্ন দাম
                    </th>

                    <th className="px-4 py-4 font-semibold">
                      সর্বোচ্চ দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-b border-gray-100 transition hover:bg-green-50"
                    >
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {market.market}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-4 font-semibold text-green-700">
                        {formatPrice(market.min)}
                      </td>

                      <td className="px-4 py-4 font-semibold text-red-600">
                        {formatPrice(market.max)}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </section>

        {/* Back to Home */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
}
