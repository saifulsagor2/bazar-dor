
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        {/* Left Content */}
        <div className="relative z-10 text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
            <TrendingUp size={17} />
            <span>প্রতিদিনের বাজারদর, এক জায়গায়</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            বাজারের সঠিক দাম
            <span className="mt-2 block text-green-700">
              জানুন সবার আগে
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg lg:mx-0">
            চাল, ডাল, তেল, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের
            প্রতিদিনের বাজারদর জানুন। বিভিন্ন বাজারের দাম
            তুলনা করে কেনাকাটায় সিদ্ধান্ত নিন আরও সহজে।
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="#সব-পণ্য"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 sm:w-auto"
            >
              সব পণ্য দেখুন
              <ArrowRight size={19} />
            </Link>

            <span className="text-sm text-gray-500">
              প্রতিদিনের বাজারদর এক নজরে
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-green-100 blur-2xl" />
          <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-orange-100 blur-2xl" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/bazar-hero.png"
              alt="তাজা শাকসবজি ও নিত্যপ্রয়োজনীয় বাজারের পণ্য"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-4 left-4 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg sm:bottom-5 sm:left-5">
            <p className="text-sm font-bold text-gray-900">
              বাজারদর তুলনা করুন
            </p>
            <p className="mt-1 text-xs text-gray-500">
              সাশ্রয়ী কেনাকাটার সহজ উপায়
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
