
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavLinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok || !contentType.includes("application/json")) {
          throw new Error("Categories API response is invalid");
        }

        const result = await res.json();

        const list = Array.isArray(result)
          ? result
          : result.categories ?? result.data ?? [];

        setCategories(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="border-t border-[#edf1ed]"
    >
      <div className="mx-auto flex min-h-[60px] max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:gap-5 sm:px-6">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;

          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={category.id ?? category.slug}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition ${active
                ? "bg-[#e8f5ec] text-[#07883f]"
                : "text-[#252d27] hover:bg-[#f0f6f1]"
                }`}
            >
              <span aria-hidden="true">
                {category.icon ?? category.categoryIcon ?? "▪"}
              </span>

              <span>{category.nameBn ?? category.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;
