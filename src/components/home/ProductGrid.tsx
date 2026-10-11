
import Image from "next/image";
import { ShoppingBasket, TrendingDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Fresh Potato",
    category: "Vegetables",
    price: 35,
    unit: "kg",
    previousPrice: 40,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600",
    market: "Karwan Bazar",
  },
  {
    id: 2,
    name: "Fresh Tomato",
    category: "Vegetables",
    price: 50,
    unit: "kg",
    previousPrice: 60,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
    market: "Mohammadpur Krishi Market",
  },
  {
    id: 3,
    name: "Red Onion",
    category: "Vegetables",
    price: 60,
    unit: "kg",
    previousPrice: 65,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600",
    market: "Mirpur Market",
  },
  {
    id: 4,
    name: "Fresh Carrot",
    category: "Vegetables",
    price: 45,
    unit: "kg",
    previousPrice: 50,
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600",
    market: "Karwan Bazar",
  },
];

export default function ProductGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-green-700">
            DAILY ESSENTIALS
          </p>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Popular Products
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Explore popular products and compare their prices.
          </p>
        </div>

        <button className="text-sm font-semibold text-green-700 hover:text-green-800">
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                unoptimized
              />

              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <TrendingDown size={13} />
                Price Down
              </span>
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-400">{product.category}</p>

              <h3 className="mt-1 text-lg font-bold text-gray-900">
                {product.name}
              </h3>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xl font-extrabold text-green-700">
                    ৳{product.price}
                    <span className="text-xs font-normal text-gray-500">
                      /{product.unit}
                    </span>
                  </p>

                  <p className="text-xs text-gray-400 line-through">
                    ৳{product.previousPrice}/{product.unit}
                  </p>
                </div>

                <button
                  aria-label={`Add ${product.name} to basket`}
                  className="rounded-xl bg-green-50 p-3 text-green-700 transition hover:bg-green-700 hover:text-white"
                >
                  <ShoppingBasket size={21} />
                </button>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">
                    Market:
                  </span>{" "}
                  {product.market}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
