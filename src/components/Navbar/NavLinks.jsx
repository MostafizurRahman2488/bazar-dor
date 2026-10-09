
import Link from "next/link";

const NavLinks = async () => {
  let navCategories = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Categories API error:", res.status);
    } else {
      const contentType = res.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const data = await res.json();

        navCategories = Array.isArray(data)
          ? data
          : Array.isArray(data.categories)
            ? data.categories
            : [];
      }
    }
  } catch (error) {
    console.error("Categories API error:", error);
  }

  return (
    <div className="border-t border-[#edf1ee]">
      <nav
        aria-label="Product categories"
        className="mx-auto max-w-[1280px] overflow-x-auto px-4 sm:px-6"
      >
        <div className="flex h-[55px] min-w-max items-center gap-7 pl-2 sm:gap-9 sm:pl-6">
          {navCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#242b25] transition-colors hover:text-green-700"
            >
              {/* Icon directly from API */}
              {category.icon && (
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center"
                >
                  {category.icon}
                </span>
              )}

              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;
