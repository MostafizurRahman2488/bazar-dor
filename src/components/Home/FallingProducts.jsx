"use cache";
import React from "react";

const FallingProducts = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const allProducts = await res.json();

    const fallingProducts = allProducts.filter(
        (product) => product.change.dir === "down"
    );

    console.log(fallingProducts);
    const unitBn = {
        kg: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        piece: "পিস",
    };


    return (
        <section className="px-5 py-10 max-w-7xl mx-auto">

            {/* Heading */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    সব পণ্য
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                    মোট {allProducts.length}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {fallingProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                        {/* Top */}
                        <div className="flex items-center gap-3">

                            {/* Image Placeholder */}
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

                        {/* Price */}
                        <div className="mt-5">
                            <p className="text-xs text-gray-500">
                                আজকের বাজার
                            </p>

                            <div className="flex items-center justify-between mt-1">
                                <p className="text-lg font-bold text-gray-800">
                                    {product.today} টাকা
                                </p>

                                {/* Price Change */}

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
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default FallingProducts;