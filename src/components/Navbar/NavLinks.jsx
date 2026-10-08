import Link from "next/link";

const NavLinks = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories",
        {
            cache: "no-store",
        }
    );

    console.log("Categories status:", res.status);
    console.log("Categories content-type:", res.headers.get("content-type"));

    if (!res.ok) {
        const errorText = await res.text();
        console.log("Categories API response:", errorText);

        return null;
    }

    const navCategories = await res.json();

    return (
        <div className="border-t border-gray-100">
            <div className="container mx-auto flex justify-center gap-4 px-4 py-3">
                {navCategories.map((c) => (
                    <Link
                        key={c.id}
                        href={`/${c.slug}`}
                        className="text-sm font-medium text-gray-700 hover:text-green-600"
                    >
                        {c.nameBn}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavLinks;