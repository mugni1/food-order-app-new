"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TextHeader() {
  const path = usePathname();
  return (
    <>
      <div className="flex flex-wrap flex-col my-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Find Your Best Food
        </h1>
        <h1 className="text-4xl font-normal text-slate-900">Order & Eat.</h1>
      </div>

      <div className="w-full overflow-x-scroll flex gap-5 mb-5 scrollbar-none font-semibold">
        <Link
          href="/"
          className={`py-2 px-3 border border-slate-400 rounded-full text-nowrap ${
            path == "/" ? "bg-emerald-600 text-white" : "text-slate-600"
          }`}
        >
          All Foods
        </Link>
        <Link
          href="/meals"
          className={`py-2 px-3 border border-slate-400 rounded-full text-nowrap ${
            path == "/meals" ? "bg-emerald-600 text-white" : "text-slate-600"
          }`}
        >
          🍛 Heavy meals
        </Link>
        <Link
          href="/seafoods"
          className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600"
        >
          🦞 Seafoods
        </Link>
        <Link
          href="/appetizers"
          className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600"
        >
          🍟 Appetizers
        </Link>
        <Link
          href="/drinks"
          className="py-2 px-3 border border-slate-400 rounded-full text-nowrap text-slate-600"
        >
          ☕ Drink
        </Link>
      </div>

      <h1 className="text-xl font-semibold mb-5 text-slate-900">Terbaru</h1>
    </>
  );
}
