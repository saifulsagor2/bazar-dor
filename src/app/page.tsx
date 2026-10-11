
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import ProductGrid from "@/components/home/ProductGrid";
import MarketPrice from "@/components/home/MarketPrice";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />

      <CategorySection />

      <MarketPrice />

      <ProductGrid />
    </main>
  );
}
