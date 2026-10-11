
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategories,
  getProductsByCategory,
} from "@/lib/api";

import CategoryProducts from "@/components/category/CategoryProducts";
import Container from "@/components/ui/Container";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const categories = await getCategories();

  const category = categories.find(
    (item) => item.slug === slug
  );

  // Invalid category
  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <Container>
        <section className="py-10 sm:py-14">
          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/"
              className="transition hover:text-green-700"
            >
              হোম
            </Link>

            <span>/</span>

            <span className="font-medium text-green-700">
              {category.nameBn}
            </span>
          </div>

          {/* Category Information */}
          <div className="rounded-2xl bg-green-50 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                {category.icon}
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {category.nameBn}
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                  {category.nameBn} ক্যাটাগরির সকল পণ্যের
                  বর্তমান বাজারদর দেখুন।
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* Category Products */}
      <CategoryProducts products={products} />
    </main>
  );
}
