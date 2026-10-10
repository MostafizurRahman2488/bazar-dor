
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const toBanglaNumber = (value) => {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    return String(value).replace(/\d/g, (digit) =>
        "০১২৩৪৫৬৭৮৯"[Number(digit)]
    );
};

const toBanglaUnit = (unit) => {
    const units = {
        kg: "কেজি",
        kilogram: "কেজি",
        kilograms: "কেজি",
        gm: "গ্রাম",
        g: "গ্রাম",
        gram: "গ্রাম",
        grams: "গ্রাম",
        liter: "লিটার",
        litre: "লিটার",
        liters: "লিটার",
        litres: "লিটার",
        l: "লিটার",
        ml: "মিলিলিটার",
        piece: "টি",
        pieces: "টি",
        pc: "টি",
        pcs: "টি",
        dozen: "ডজন",
        maund: "মণ",
        mon: "মণ",
        bottle: "বোতল",
        packet: "প্যাকেট",
        pack: "প্যাকেট",
        bunch: "আঁটি",
        pair: "জোড়া",
    };

    if (!unit) return "একক";

    const normalized = String(unit).trim().toLowerCase();

    return units[normalized] ?? unit;
};

const PriceTicker = async () => {
    let products = [];

    try {
        const res = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/products",
            {
                next: { revalidate: 120 },
            }
        );

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok || !contentType.includes("application/json")) {
            console.error("Products API error:", res.status);
            return null;
        }

        const result = await res.json();

        products = Array.isArray(result)
            ? result
            : result.products ?? result.data ?? [];

        if (!Array.isArray(products) || products.length === 0) {
            return null;
        }
    } catch (error) {
        console.error("Price ticker error:", error);
        return null;
    }

    return (
        <section
            aria-label="আজকের বাজার দর"
            className="w-full overflow-hidden border border-[#e5ece7] bg-[#fafcfb]"
        >
            <MarqueeText direction="right">
                <div className="flex w-max items-center">
                    {products.map((product, index) => {
                        const direction = product.change?.dir;
                        const isUp = direction === "up";
                        const isDown = direction === "down";

                        const name =
                            product.nameBn ?? product.name ?? "পণ্য";

                        const price = toBanglaNumber(
                            product.today ?? product.price ?? "—"
                        );

                        const unit = toBanglaUnit(product.unit);

                        const percentage = toBanglaNumber(
                            product.change?.pct ?? 0
                        );

                        return (
                            <div
                                key={`${product.id ?? product.slug ?? name}-${index}`}
                                className="flex shrink-0 items-center gap-2 border-r border-[#e5ece7] px-4 py-3 text-sm"
                            >
                                <span aria-hidden="true">
                                    {product.categoryIcon ?? product.icon ?? "▪"}
                                </span>

                                <span className="whitespace-nowrap font-medium text-[#252d27]">
                                    {name}
                                </span>

                                <span className="whitespace-nowrap text-[#454d47]">
                                    {price} টাকা/{unit}
                                </span>

                                <span
                                    className={`whitespace-nowrap font-semibold ${isUp
                                        ? "text-[#e53935]"
                                        : isDown
                                            ? "text-[#079447]"
                                            : "text-gray-500"
                                        }`}
                                >
                                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                    {percentage}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            </MarqueeText>
        </section>
    );
};

export default PriceTicker;
