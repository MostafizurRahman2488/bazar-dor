
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

export default function MarkerPrices({
  markets = [],
  unit = "",
}) {
  const rows = markets.map((market, index) => {
    // API থেকে সরাসরি min ও max নেওয়া হচ্ছে
    const min = market.min;
    const max = market.max;

    // min ও max থাকলে গড় দাম হিসাব করা হচ্ছে
    const avg =
      min !== null &&
      min !== undefined &&
      max !== null &&
      max !== undefined
        ? (Number(min) + Number(max)) / 2
        : null;

    return {
      ...market,
      id: market.id ?? market.marketId ?? index,
      name:
        market.market ??
        market.marketName ??
        market.name ??
        `বাজার ${index + 1}`,
      min,
      max,
      avg,
    };
  });

  return (
    <section className="rounded-2xl border border-[#e0e9e0] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#202820] sm:text-xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            বিভিন্ন বাজারের দামের তুলনা
          </p>
        </div>

        <span className="rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">
          {rows.length.toLocaleString("bn-BD")}টি বাজার
        </span>
      </div>

      {rows.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-[#e0e9e0]">
          <table className="w-full min-w-[650px] border-collapse text-sm">
            <thead className="bg-[#f2f7f2] text-[#303a30]">
              <tr>
                <th className="px-4 py-3 text-left font-bold">
                  বাজার
                </th>

                <th className="px-4 py-3 text-left font-bold">
                  বিভাগ
                </th>

                <th className="px-4 py-3 text-right font-bold">
                  সর্বনিম্ন
                </th>

                <th className="px-4 py-3 text-right font-bold">
                  সর্বাধিক
                </th>

                <th className="px-4 py-3 text-right font-bold">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e0e9e0]">
              {rows.map((market, index) => (
                <tr
                  key={market.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-[#f7faf7]"
                  }
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {market.name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {market.division ?? "—"}
                  </td>

                  <td className="px-4 py-3 text-right text-green-700">
                    {formatPrice(market.min)} টাকা
                    <span className="block text-xs text-gray-500">
                      {unit}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right text-red-600">
                    {formatPrice(market.max)} টাকা
                    <span className="block text-xs text-gray-500">
                      {unit}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right font-bold text-gray-800">
                    {formatPrice(market.avg)} টাকা
                    <span className="block text-xs font-normal text-gray-500">
                      {unit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center">
          <p className="text-3xl">🏪</p>

          <h3 className="mt-3 font-bold text-gray-800">
            বাজারের তথ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            API-তে বাজারভিত্তিক দাম যুক্ত হলে এখানে দেখানো হবে।
          </p>
        </div>
      )}
    </section>
  );
}
