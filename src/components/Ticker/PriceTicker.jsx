
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceTicker = async () => {
    let products = [];

    try {
        const res = await fetch(
            "https://api.abcz.workers.dev/api/bazardor/products",
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            console.error("Products API error:", res.status);
            return null;
        }

        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
            console.error("Products API returned non-JSON response");
            return null;
        }

        const data = await res.json();

        products = Array.isArray(data)
            ? data
            : Array.isArray(data.products)
                ? data.products
                : [];
    } catch (error) {
        console.error("Products API error:", error);
        return null;
    }

    const unitBn = {
        kg: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        piece: "পিস",
        dozen: "ডজন",
        ton: "টন",
    };

    const formatBn = (value) =>
        Number(value ?? 0).toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });

    return (
        <section
            aria-label="আজকের বাজার দর"
            className="w-full overflow-hidden border-y border-[#e8eeea] bg-[#fafcfb]"
        >
            <MarqueeText direction="right">
                <div className="flex w-max items-stretch">
                    {products.map((product) => {
                        const isUp = product.change?.dir === "up";
                        const unit = unitBn[product.unit] || product.unit || "";

                        return (
                            <div
                                key={product.id}
                                className="flex min-h-[46px] shrink-0 items-center gap-2 border-r border-[#e8eeea] px-4 py-2 text-[14px] leading-6"
                            >
                                {/* Category icon from API */}
                                {product.categoryIcon && (
                                    <span className="shrink-0" aria-hidden="true">
                                        {product.categoryIcon}
                                    </span>
                                )}

                                {/* Product name */}
                                <span className="whitespace-nowrap font-semibold text-[#303830]">
                                    {product.nameBn}
                                </span>

                                {/* Current price */}
                                <span className="whitespace-nowrap text-[#454d46]">
                                    {formatBn(product.today)} টাকা/{unit}
                                </span>

                                {/* Price change */}
                                <span
                                    className={`whitespace-nowrap font-semibold ${isUp ? "text-red-500" : "text-emerald-600"
                                        }`}
                                >
                                    {isUp ? "▲" : "▼"}{" "}
                                    {formatBn(product.change?.pct)}%
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
