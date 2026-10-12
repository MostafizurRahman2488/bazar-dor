
"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/Product/ProductGrid";
import SortDropDown from "../SortDropDown";


export default function CategoryProductList({ products }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "price-asc") {
      return items.sort(
        (a, b) => Number(a.today ?? 0) - Number(b.today ?? 0)
      );
    }

    if (sortBy === "price-desc") {
      return items.sort(
        (a, b) => Number(b.today ?? 0) - Number(a.today ?? 0)
      );
    }

    return items;
  }, [products, sortBy]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
        </p>

        <SortDropDown value={sortBy} onChange={setSortBy} />
      </div>

      <ProductGrid products={sortedProducts} />
    </div>
  );
}
