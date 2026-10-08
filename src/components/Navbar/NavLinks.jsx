
import Link from "next/link";

const NavLinks = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        console.log("Categories API error:", await res.text());
        return null;
    }

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        console.log("Categories API returned HTML:");
        console.log(await res.text());
        return null;
    }

    const navCategories = await res.json();

    return (
        <div className="flex items-center gap-4">
            {navCategories.map((category) => (
                <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                >
                    {category.nameBn}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;

