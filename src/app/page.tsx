
import Navbar from "@/components/layout/Navbar";
import CategorySection from "@/components/home/CategorySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="rounded-3xl bg-green-700 px-6 py-16 text-center text-white md:px-16">
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Know Your Bazar Price
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-green-100 md:text-lg">
            Compare daily market prices, discover fresh products,
            and make smarter shopping decisions.
          </p>

          <button className="mt-8 rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600">
            Explore Products
          </button>
        </div>
      </section>

      <CategorySection />
    </main>
  );
}
