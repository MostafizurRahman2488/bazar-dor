import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"


const PriceTicker = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const products = await res.json();
    const unitBn = {
        kg: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        piece: "পিস",
    };

    return (

        <div>
            <MarqueeText direction="right">
                <div className="flex items-center gap-8 whitespace-nowrap bg-white py-3 leading-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex shrink-0 items-center gap-2 text-sm leading-6"
                        >
                            <span className="font-semibold text-gray-700">
                                {product.nameBn}
                            </span>

                            <span className="font-medium text-gray-600">
                                ৳{Number(product.today).toLocaleString("bn-BD")} /{" "}
                                {unitBn[product.unit] || product.unit}
                            </span>

                            <span
                                className={
                                    product.change.dir === "up"
                                        ? "text-red-500"
                                        : "text-green-500"
                                }
                            >
                                {product.change.dir === "up" ? "▲" : "▼"}{" "}
                                {Number(product.change.pct).toLocaleString("bn-BD")}%
                            </span>
                        </div>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default PriceTicker;