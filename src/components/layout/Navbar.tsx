
"use client";

import Link from "next/link";
import { Search, ShoppingCart, MapPin, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-green-700">
          Bazar<span className="text-orange-500">Dor</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden max-w-xl flex-1 items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2 md:flex">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products, markets..."
            className="ml-3 w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          <button className="hidden items-center gap-2 text-sm font-medium text-gray-700 sm:flex">
            <MapPin size={19} className="text-green-700" />
            <span>Dhaka, Bangladesh</span>
          </button>

          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <ShoppingCart size={22} className="text-gray-700" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
              0
            </span>
          </button>

          <button className="rounded-lg p-2 hover:bg-gray-100 md:hidden">
            <Menu size={23} />
          </button>

        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="ml-3 w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>
    </header>
  );
}
