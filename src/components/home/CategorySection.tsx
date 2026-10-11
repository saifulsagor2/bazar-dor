
import {
  Apple,
  Beef,
  Fish,
  Milk,
  Wheat,
  Carrot,
  Coffee,
  ShoppingBasket,
} from "lucide-react";

const categories = [
  { name: "Fruits", icon: Apple, color: "bg-red-50 text-red-600" },
  { name: "Vegetables", icon: Carrot, color: "bg-green-50 text-green-600" },
  { name: "Meat", icon: Beef, color: "bg-orange-50 text-orange-600" },
  { name: "Fish", icon: Fish, color: "bg-blue-50 text-blue-600" },
  { name: "Dairy", icon: Milk, color: "bg-yellow-50 text-yellow-600" },
  { name: "Grains", icon: Wheat, color: "bg-amber-50 text-amber-600" },
  { name: "Beverages", icon: Coffee, color: "bg-purple-50 text-purple-600" },
  { name: "Groceries", icon: ShoppingBasket, color: "bg-pink-50 text-pink-600" },
];

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Explore everyday essentials in one place.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${category.color}`}
              >
                <Icon size={27} />
              </div>

              <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
