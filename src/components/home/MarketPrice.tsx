
import { TrendingUp, TrendingDown } from "lucide-react";

const marketPrices = [
  { name: "Potato", market1: 35, market2: 38, market3: 40 },
  { name: "Onion", market1: 60, market2: 65, market3: 62 },
  { name: "Tomato", market1: 50, market2: 55, market3: 58 },
  { name: "Green Chili", market1: 80, market2: 75, market3: 90 },
  { name: "Carrot", market1: 45, market2: 48, market3: 50 },
];

export default function MarketPrice() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-green-700">
          SMART SHOPPING
        </p>

        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Compare Market Prices
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Compare product prices across different markets.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-green-50 text-sm text-gray-700">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Karwan Bazar</th>
              <th className="px-6 py-4">Mirpur Market</th>
              <th className="px-6 py-4">Mohammadpur</th>
              <th className="px-6 py-4">Best Price</th>
            </tr>
          </thead>

          <tbody>
            {marketPrices.map((item) => {
              const bestPrice = Math.min(
                item.market1,
                item.market2,
                item.market3
              );

              return (
                <tr
                  key={item.name}
                  className="border-t border-gray-100 text-sm hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.name}
                  </td>

                  {[item.market1, item.market2, item.market3].map(
                    (price, index) => (
                      <td key={index} className="px-6 py-4 text-gray-600">
                        ৳{price}
                      </td>
                    )
                  )}

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 font-bold text-green-700">
                      <TrendingDown size={14} />
                      ৳{bestPrice}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <TrendingUp size={14} />
        Sample demonstration data. Actual market prices will be integrated later.
      </p>
    </section>
  );
}
