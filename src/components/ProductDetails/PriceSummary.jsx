
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

const priceCards = [
  {
    key: "min",
    label: "সর্বনিম্ন দাম",
    icon: "↓",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    key: "max",
    label: "সর্বোচ্চ দাম",
    icon: "↑",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    key: "avg",
    label: "গড় দাম",
    icon: "≈",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
];

export default function PriceSummary({ product }) {
  if (!product) {
    return null;
  }

  // API-এর markets array থেকে সব বাজারের min/max বের করা
  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const minPrices = markets
    .map((market) => Number(market.min))
    .filter(Number.isFinite);

  const maxPrices = markets
    .map((market) => Number(market.max))
    .filter(Number.isFinite);

  const min =
    minPrices.length > 0
      ? Math.min(...minPrices)
      : product.today ?? null;

  const max =
    maxPrices.length > 0
      ? Math.max(...maxPrices)
      : product.today ?? null;

  // প্রতিটি বাজারের min ও max-এর মধ্যবিন্দু থেকে আনুমানিক গড়
  const averages = markets
    .filter(
      (market) =>
        Number.isFinite(Number(market.min)) &&
        Number.isFinite(Number(market.max))
    )
    .map(
      (market) =>
        (Number(market.min) + Number(market.max)) / 2
    );

  const avg =
    averages.length > 0
      ? averages.reduce((total, price) => total + price, 0) /
        averages.length
      : product.today ?? null;

  const values = { min, max, avg };

  const unitNames = {
    kg: "প্রতি কেজি",
    kilogram: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    l: "প্রতি লিটার",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  const rawUnit = String(product.unit || "kg").toLowerCase();
  const unit = unitNames[rawUnit] || `প্রতি ${rawUnit}`;

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-[#202820] sm:text-2xl">
        দামের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {priceCards.map((card) => (
          <article
            key={card.key}
            className="rounded-2xl border border-[#e1e9e1] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-gray-600">
                {card.label}
              </p>

              
            </div>

            <p className={`mt-4 text-2xl font-extrabold ${card.color}`}>
              {formatPrice(values[card.key])}
              <span className="ml-1 text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {unit}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
