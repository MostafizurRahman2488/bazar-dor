import Link from "next/link";
import React from "react";

const NavLinks = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    const data = await res.json();

    const navCategories = data;

    return (
        <div>
            <div className="flex justify-center gap-4 container mx-auto">
                {navCategories.map((c) => (
                    <Link key={c.id} href={`/${c.slug}`}>
                        {c.nameBn}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavLinks;