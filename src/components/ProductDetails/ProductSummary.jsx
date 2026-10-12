
const unitNames = {
  kg: "কেজি",
  kilogram: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
};

function getEmoji(product) {
  if (product.categoryIcon || product.emoji) {
    return product.categoryIcon || product.emoji;
  }

  const name = `${product.nameBn || ""} ${product.name || ""}`;

  if (name.includes("চাল")) return "🍚";
  if (name.includes("আলু")) return "🥔";
  if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ")) return "🧅";
  if (name.includes("মাছ")) return "🐟";
  if (name.includes("ডাল")) return "🫘";
  if (name.includes("ডিম")) return "🥚";
  if (name.includes("তেল")) return "🫙";
  if (name.includes("মুরগি") || name.includes("মাংস")) return "🍗";
  if (name.includes("টমেটো")) return "🍅";

  return "🛒";
}

export default function ProductSummary({ product }) {
  const title =
    product.nameBn ||
    product.name ||
    product.titleBn ||
    product.title ||
    "পণ্যের নাম";

  const rawUnit = String(product.unit || "kg")
    .trim()
    .toLowerCase();

  const unit = unitNames[rawUnit] || product.unit || "পিস";

  const today = Number(
    product.today ?? product.currentPrice ?? product.current_price ?? product.minPrice ?? 0
  );

  const yesterday = Number(
    product.yesterday ?? product.previousPrice ?? product.previous_price ?? today
  );

  // গতকাল ও আজকের দামের পার্থক্য
  const difference = today - yesterday;

  // API-তে percentage থাকলে সেটি ব্যবহার, নাহলে নিজে হিসাব
  const change =
    product.change?.pct ??
    product.changePercent ??
    product.changePercentage ??
    (yesterday !== 0 ? (difference / yesterday) * 100 : 0);

  const direction =
    product.change?.dir ??
    (difference < 0 ? "down" : difference > 0 ? "up" : "same");

  const isDown = direction === "down";
  const isUp = direction === "up";

  const summary =
    difference > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে ${difference.toLocaleString("bn-BD")} টাকা।`
      : difference < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে ${Math.abs(difference).toLocaleString("bn-BD")} টাকা।`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত।";

  return (
    <section className="w-full rounded-2xl border border-[#e5ebe5] bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* পণ্যের ইমোজি */}
        <div className="flex shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] p-3 text-3xl sm:text-4xl">
          {getEmoji(product)}
        </div>

        {/* পণ্যের নাম ও বিবরণ */}
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-extrabold leading-snug text-[#263129] sm:text-xl">
            {title}
          </h1>

          <p className="mt-1 text-xs text-[#7a827b]">
            প্রতি {unit} · {product.categoryNameBn}
          </p>

          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#727a73] sm:text-xs">
            {summary}
          </p>
        </div>

        {/* আজকের দাম */}
        <div className="flex min-w-[76px] shrink-0 flex-col items-center justify-center self-stretch rounded-xl bg-[#f0f5f0] px-2 py-2 sm:min-w-[90px] sm:px-3">
          <span className="text-[10px] font-medium text-[#747c75]">
            আজকের দাম
          </span>

          <strong className="mt-0.5 text-2xl font-extrabold leading-tight text-[#263129] sm:text-3xl">
            {today.toLocaleString("bn-BD")}
          </strong>

          <span className="mt-1 text-[10px] text-[#606961]">
            টাকা / {unit}
          </span>

          <span
            className={`mt-1 text-[10px] font-bold ${isDown
                ? "text-green-600"
                : isUp
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
          >
            {isDown ? "▼" : isUp ? "▲" : "—"}{" "}
            {Math.abs(Number(change)).toLocaleString("bn-BD", {
              maximumFractionDigits: 2,
            })}
            %
          </span>
        </div>
      </div>
    </section>
  );
}
