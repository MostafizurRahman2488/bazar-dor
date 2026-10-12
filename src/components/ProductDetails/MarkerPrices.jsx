
"use client";

import { useMemo, useState } from "react";

function formatPrice(value) {
  if (value === null || value === undefined ||
      value === "" || !Number.isFinite(Number(value))) {
    return "—";
  }

  return Number(value).toLocaleString("bn-BD");
}

const tabs = [
  { label: "আজকের দাম", key: "today" },
  { label: "গতকাল", key: "yesterday" },
  { label: "গত সপ্তাহ", key: "lastWeek" },
  { label: "গত মাস", key: "lastMonth" },
];

export default function MarkerPrices({ markets = [], unit }) {
  const [activeTab, setActiveTab] = useState("today");

  const sortedMarkets = useMemo(() => {
    return [...markets].sort((a, b) => {
      const first = Number(a[activeTab]);
      const second = Number(b[activeTab]);

      if (!Number.isFinite(first)) return 1;
      if (!Number.isFinite(second)) return -1;

      return first - second;
    });
  }, [markets, activeTab]);

  return (
    <section className="rounded-3xl border border-[#e0e9e0] bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-extrabold text-[#202820] sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন বাজারে পণ্যের দাম তুলনা করুন।
          </p>
        </div>

        <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800">
          {markets.length.toLocaleString("bn-BD")}টি বাজার
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-green-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {markets.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full min-w-[540px] text-left text-sm">
            <thead className="bg-[#f2f7f2] text-gray-600">
              <tr>
                <th className="px-4 py-4 font-semibold">বাজারের নাম</th>
                <th className="px-4 py-4 text-right font-semibold">
                  দাম (টাকা)
                </th>
                <th className="px-4 py-4 text-right font-semibold">
                  একক
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sortedMarkets.map((market, index) => {
                const price = market[activeTab];

                return (
                  <tr
                    key={market.id ?? market.marketId ?? market.name ?? market.market ?? index}
                    className="transition hover:bg-green-50/50"
                  >
                    <td className="px-4 py-4 font-medium text-gray-800">
                      <span className="mr-2 text-green-700">⌖</span>
                      {market.name ??
                        market.market ??
                        market.bazar ??
                        market.marketName ??
                        `বাজার ${index + 1}`}
                    </td>

                    <td className="px-4 py-4 text-right font-bold text-[#202820]">
                      {formatPrice(price)}
                    </td>

                    <td className="px-4 py-4 text-right text-gray-500">
                      {unit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center">
          <div className="text-4xl">🏪</div>

          <h3 className="mt-3 font-bold text-gray-800">
            বাজারের আলাদা দামের তথ্য পাওয়া যায়নি
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            API থেকে বাজারভিত্তিক দামের তালিকা এলে এখানে প্রতিটি বাজারের
            দাম দেখা যাবে। বর্তমানে কোনো বাজারের দাম অনুমান করে দেখানো হচ্ছে না।
          </p>
        </div>
      )}
    </section>
  );
}
