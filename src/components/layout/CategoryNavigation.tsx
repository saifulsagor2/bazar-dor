
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

interface CategoryNavigationProps {
  categories: Category[];
}

export default function CategoryNavigation({
  categories,
}: CategoryNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 overflow-x-auto py-3">
      <Link
        href="/"
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
          pathname === "/"
            ? "bg-green-700 text-white"
            : "text-gray-700 hover:bg-green-50"
        }`}
      >
        সব পণ্য
      </Link>

      {categories.map((category) => {
        const isActive =
          pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-green-700 text-white"
                : "text-gray-700 hover:bg-green-50"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}
