
import Link from "next/link";
import ProductPrice from "./ProductPrice";

const getEmoji = (product) => {
    const name = `${product.nameBn || ""} ${product.name || ""}`.toLowerCase();

    if (name.includes("চাল") || name.includes("rice")) return "🍚";
    if (name.includes("ডাল") || name.includes("bean")) return "🫘";
    if (name.includes("তেল") || name.includes("oil")) return "🫙";
    if (name.includes("আলু") || name.includes("potato")) return "🥔";
    if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ") || name.includes("onion")) return "🧅";
    if (name.includes("মরিচ") || name.includes("chili")) return "🌶️";
    if (name.includes("মাছ") || name.includes("fish")) return "🐟";
    if (name.includes("মুরগি") || name.includes("মাংস") || name.includes("chicken")) return "🍗";
    if (name.includes("ডিম") || name.includes("egg")) return "🥚";
    if (name.includes("আদা") || name.includes("ginger")) return "🫚";
    if (name.includes("রসুন") || name.includes("garlic")) return "🧄";

    return "🛒";
};

const getUnitBn = (unit = "") => {
    const units = {
        kg: "কেজি",
        kilogram: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
        pcs: "পিস",
    };

    return units[String(unit).toLowerCase()] || unit;
};

export default function ProductCard({ product }) {
    const slug = product.slug ?? product.id;

    return (
        <Link
            href={`/product/${encodeURIComponent(String(slug))}`}
            className="group block h-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {getEmoji(product)}
                </div>

                <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 transition group-hover:text-green-700">
                        {product.nameBn || product.name || "নাম পাওয়া যায়নি"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        প্রতি {getUnitBn(product.unit)}
                    </p>
                </div>
            </div>

            <ProductPrice product={product} />
        </Link>
    );
}