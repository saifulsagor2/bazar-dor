
import type { Product } from "@/lib/types";
import { formatPrice, getPriceChangeLabel } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  const tickerItems = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-gray-50 py-2">
      <div className="ticker-track flex w-max items-center">
        {tickerItems.map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="mx-5 flex shrink-0 items-center gap-2 text-sm"
            >
              <span>{product.categoryIcon}</span>

              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>

              <span className="font-semibold text-gray-900">
                {formatPrice(product.today)}/{product.unit}
              </span>

              <span
                className={
                  isUp
                    ? "font-semibold text-red-600"
                    : isDown
                      ? "font-semibold text-green-600"
                      : "font-semibold text-gray-500"
                }
              >
                {getPriceChangeLabel(
                  product.change.dir,
                  product.change.pct
                )}
              </span>

              <span className="ml-3 text-gray-300">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
