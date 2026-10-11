
import Link from "next/link";
import { getCategories } from "@/lib/api";

export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-green-700">
          বাজার দর
        </p>

        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          ক্যাটাগরি অনুযায়ী পণ্য খুঁজুন
        </h2>

        <p className="mt-2 text-sm text-gray-500 md:text-base">
          আপনার প্রয়োজনীয় পণ্যের বাজারদর সহজেই খুঁজে নিন।
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">
            ক্যাটাগরি লোড করা যাচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-3xl transition group-hover:bg-green-100">
                {category.icon}
              </span>

              <span className="text-sm font-semibold text-gray-700 transition group-hover:text-green-700">
                {category.nameBn}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
