
import Link from "next/link";

const unitNames = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
};

function formatPrice(value) {
    return Number(value ?? 0).toLocaleString("bn-BD");
}

function getProductEmoji(product) {
    if (product.categoryIcon) {
        return product.categoryIcon;
    }

    const name = product.nameBn ?? "";

    if (name.includes("চাল")) return "🍚";
    if (name.includes("ডাল")) return "🫘";
    if (name.includes("তেল")) return "🫙";
    if (name.includes("আলু")) return "🥔";
    if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ")) {
        return "🧅";
    }
    if (name.includes("মরিচ")) return "🌶️";
    if (name.includes("মাছ")) return "🐟";
    if (name.includes("মুরগি") || name.includes("মাংস")) {
        return "🍗";
    }
    if (name.includes("ডিম")) return "🥚";
    if (name.includes("আদা")) return "🫚";
    if (name.includes("রসুন")) return "🧄";

    return "🛒";
}

function getChangeInfo(change) {
    const direction = change?.dir;
    const percentage = Number(change?.pct ?? 0);

    if (direction === "up") {
        return {
            icon: "▲",
            color: "text-green-600",
            label: `${formatPrice(percentage)}%`,
        };
    }

    if (direction === "down") {
        return {
            icon: "▼",
            color: "text-red-600",
            label: `${formatPrice(percentage)}%`,
        };
    }

    return {
        icon: "—",
        color: "text-gray-700",
        label: "০.০%",
    };
}

export default function ProductCard({ product }) {
    const change = getChangeInfo(product.change);

    const unit =
        unitNames[product.unit] ??
        `প্রতি ${product.unit || "পিস"}`;

    return (
        <Link
            href={`/product/${product.slug ?? product.id}`}
            aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
            className="group block rounded-[21px] border border-[#dfe7e0] bg-[#fbfdfb] p-5 transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-green-600"
        >
            {/* Product information */}
            <div className="flex items-center gap-4">
                <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[17px] bg-[#f0f5f0] text-[30px]">
                    {getProductEmoji(product)}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold text-[#202820] transition group-hover:text-green-700">
                        {product.nameBn}
                    </h3>

                    <p className="mt-1 text-sm text-[#586158]">
                        {unit}
                    </p>
                </div>
            </div>

            {/* Today's price */}
            <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                    <p className="text-sm text-[#596159]">
                        আজকের দাম
                    </p>

                    <p className="mt-1 text-[22px] font-extrabold leading-tight text-[#202820]">
                        {formatPrice(product.today)}
                        <span className="ml-1 text-base font-medium">
                            টাকা
                        </span>
                    </p>
                </div>

                {/* Price change badge */}
                <span
                    className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#f0f5f0] px-3 py-2 text-sm font-bold ${change.color}`}
                >
                    {change.icon} {change.label}
                </span>
            </div>
        </Link>
    );
}
