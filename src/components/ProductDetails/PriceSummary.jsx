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

// Requirement 4B: price summary cards.
export default function PriceSummary({ min, max, avg, unit }) {
  const values = { min, max, avg };

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

              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xl font-bold ${card.bg} ${card.color}`}
              >
                {card.icon}
              </span>
            </div>

            <p className={`mt-4 text-2xl font-extrabold ${card.color}`}>
              {formatPrice(values[card.key])}
              <span className="ml-1 text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-2 text-xs text-gray-500">{unit}</p>
          </article>
        ))}
      </div>
    </section>
  );
}