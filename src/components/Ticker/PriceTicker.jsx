
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceTicker = async () => {
    let products = [];

    try {
        const res = await fetch(
            "https://api.api-store.workers.dev/api/bazardor/products",
            { next: { revalidate: 120 } }
        );

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok || !contentType.includes("application/json")) {
            console.error("Products API response invalid:", res.status);
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
            className="flex w-full overflow-hidden border-b border-gray-200 bg-white"
        >
            <div className="flex shrink-0 items-center bg-green-700 px-3 text-sm font-bold text-white sm:px-4">
                বাজার দর
            </div>

            <div className="min-w-0 flex-1 overflow-hidden">
                <MarqueeText direction="left">
                    <div className="flex w-max items-center">
                        {products.map((product) => {
                            const direction = product.change?.dir;
                            const isUp = direction === "up";
                            const isDown = direction === "down";

                            const name =
                                product.nameBn ?? product.name ?? "পণ্য";

                            const price =
                                product.today ?? product.price ?? "—";

                            const unit = product.unit ?? "একক";
                            const percentage = product.change?.pct ?? 0;

                            return (
                                <div
                                    key={product.id ?? product.slug ?? name}
                                    className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-4 py-3 text-sm"
                                >
                                    <span>{product.emoji ?? "🛒"}</span>

                                    <span className="font-semibold text-gray-800">
                                        {name}
                                    </span>

                                    <span className="whitespace-nowrap text-gray-600">
                                        {price} টাকা/{unit}
                                    </span>

                                    <span
                                        className={
                                            isUp
                                                ? "font-semibold text-red-600"
                                                : isDown
                                                    ? "font-semibold text-green-700"
                                                    : "text-gray-500"
                                        }
                                    >
                                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                        {percentage}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </MarqueeText>
            </div>
        </section>
    );
};

export default PriceTicker;

