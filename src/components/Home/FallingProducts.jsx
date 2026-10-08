async function getProducts() {
    "use cache";

    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    if (!res.ok) {
        console.log("Products API error:", res.status);
        return null;
    }

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        console.log("Products API returned HTML instead of JSON");
        return null;
    }

    return res.json();
}

const FallingProducts = async () => {
    const allProducts = await getProducts();

    if (!allProducts) {
        return null;
    }

    const fallingProducts = allProducts.filter(
        (product) => product.change?.dir === "down"
    );

    return (
        <section className="px-5 py-10 max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    কমছে এমন পণ্য
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                    মোট {fallingProducts.length}টি পণ্য
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fallingProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <div className="w-5 h-5 bg-gray-800"></div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {product.nameBn}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    প্রতি {product.unit}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-xs text-gray-500">
                                আজকের বাজার
                            </p>

                            <div className="flex items-center justify-between mt-1">
                                <p className="text-lg font-bold text-gray-800">
                                    {product.today} টাকা
                                </p>

                                <span className="text-green-500">
                                    ▼{" "}
                                    {Number(
                                        product.change?.pct || 0
                                    ).toLocaleString("bn-BD")}
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FallingProducts;