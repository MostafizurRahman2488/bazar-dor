"use client";

import { useMemo, useState } from "react";

function formatPrice(value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    !Number.isFinite(Number(value))
  ) {
    return "—";
  }

  return Number(value).toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

const tabs = [
  { label: "আজকের দাম", key: "today" },
  { label: "গতকালের দাম", key: "yesterday" },
  { label: "গত সপ্তাহ", key: "lastWeek" },
  { label: "গত মাস", key: "lastMonth" },
];

export default function MarkerPrices({ markets = [], unit }) {
  const [activeTab, setActiveTab] = useState("today");

  const sortedMarkets = useMemo(() => {
    return [...markets].sort((a, b) => {
      const first = a[activeTab] == null ? NaN : Number(a[activeTab]);
      const second = b[activeTab] == null ? NaN : Number(b[activeTab]);

      if (!Number.isFinite(first)) return 1;
      if (!Number.isFinite(second)) return -1;

      return first - second;
    });
  }, [markets, activeTab]);

  return (
    <section className="rounded-3xl border border-[#e0e9e0] bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-xl font-extrabold text-[#202820] sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন বাজারে একই পণ্যের দাম তুলনা করুন।
          </p>
        </div>

        <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-800">
          {markets.length.toLocaleString("bn-BD")}টি বাজার
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4 ${activeTab === tab.key
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-800"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {markets.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded-xl border border-[#e5ebe5]">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-[#f2f7f2] text-[#303a30]">
              <tr>
                <th className="px-4 py-3 font-bold">বাজার</th>
                <th className="px-4 py-3 font-bold">অবস্থান</th>
                <th className="px-4 py-3 text-right font-bold">দাম</th>
                <th className="px-4 py-3 text-right font-bold">একক</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e5ebe5]">
              {sortedMarkets.map((market, index) => (
                <tr
                  key={
                    market.id ??
                    market.marketId ??
                    market.name ??
                    market.market ??
                    index
                  }
                  className={index % 2 ? "bg-[#f8faf8]" : "bg-white"}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {market.name ??
                      market.market ??
                      market.bazar ??
                      market.marketName ??
                      market.bazarName ??
                      `বাজার ${index + 1}`}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {market.area ??
                      market.location ??
                      market.district ??
                      market.city ??
                      "—"}
                  </td>

                  <td className="px-4 py-3 text-right font-bold text-[#202820]">
                    {formatPrice(market[activeTab])} টাকা
                  </td>

                  <td className="px-4 py-3 text-right text-gray-500">
                    {unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">
          <div className="text-4xl">🏪</div>

          <h3 className="mt-3 font-bold text-gray-800">
            বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
            API-তে বাজারের আলাদা দাম থাকলে এখানে দেখানো হবে।
            কোনো বাজারের দাম অনুমান করে দেখানো হচ্ছে না।
          </p>
        </div>
      )}
    </section>
  );
}