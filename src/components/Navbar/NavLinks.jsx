
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
          throw new Error("Categories API থেকে valid JSON আসেনি");
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

  const linkClass = (active) =>
    `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${active
      ? "bg-[#07883f] text-white"
      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`;

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="border-t border-[#e5ece7]"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={linkClass(pathname === "/")}
        >
          সব পণ্য
        </Link>

        {categories.map((category) => {
          const href = `/category/${category.slug}`;

          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={category.id ?? category.slug}
              href={href}
              aria-current={active ? "page" : undefined}
              className={linkClass(active)}
            >
              {category.nameBn ?? category.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;

