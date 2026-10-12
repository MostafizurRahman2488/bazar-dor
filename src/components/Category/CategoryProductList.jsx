
"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import SortDropDown from "./SortDropDown";

export default function CategoryProductList({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "price-asc") {
      items.sort(
        (a, b) => Number(a.today ?? 0) - Number(b.today ?? 0)
      );
    } else if (sortBy === "price-desc") {
      items.sort(
        (a, b) => Number(b.today ?? 0) - Number(a.today ?? 0)
      );
    }

    return items;
  }, [products, sortBy]);

  return (
    <section className="space-y-4">
      {/* Sort Toolbar */}
      <div className="flex min-h-[68px] items-center justify-end rounded-2xl border border-[#e0e9e0] bg-[#fbfdfb] px-4 py-3 sm:px-6">
        <SortDropDown
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Product Count */}
      <p className="text-sm text-[#465046]">
        মোট{" "}
        <span className="font-semibold text-[#202820]">
          {products.length.toLocaleString("bn-BD")}
        </span>{" "}
        টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Grid */}
      {products.length > 0 ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        <div className="rounded-2xl border border-[#e0e9e0] bg-[#fbfdfb] px-4 py-12 text-center">
          <p className="font-medium text-[#303a30]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}
