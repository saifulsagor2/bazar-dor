
import { getProducts } from "@/lib/api";
import {
  getPriceIncreasedProducts,
  getPriceDecreasedProducts,
} from "@/lib/utils";
import PriceChangeSection from "./PriceChangeSection";

export default async function MarketPrice() {
  const products = await getProducts();

  const increasedProducts =
    getPriceIncreasedProducts(products);

  const decreasedProducts =
    getPriceDecreasedProducts(products);

  return (
    <div className="bg-gray-50">
      <PriceChangeSection
        title="আজ দাম বেড়েছে"
        subtitle="যেসব পণ্যের দাম গত দিনের তুলনায় বেড়েছে"
        products={increasedProducts}
        direction="up"
      />

      <PriceChangeSection
        title="আজ দাম কমেছে"
        subtitle="যেসব পণ্যের দাম গত দিনের তুলনায় কমেছে"
        products={decreasedProducts}
        direction="down"
      />
    </div>
  );
}
