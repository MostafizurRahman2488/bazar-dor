
const unitNames = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
};

function getEmoji(product) {
  if (product.categoryIcon) return product.categoryIcon;

  const name = product.nameBn || "";

  if (name.includes("চাল")) return "🍚";
  if (name.includes("আলু")) return "🥔";
  if (name.includes("পেঁয়াজ") || name.includes("পেঁয়াজ")) return "🧅";
  if (name.includes("মাছ")) return "🐟";
  if (name.includes("ডাল")) return "🫘";
  if (name.includes("ডিম")) return "🥚";
  if (name.includes("তেল")) return "🫙";

  return "🛒";
}

export default function ProductSummary({ product }) {
  const unit = unitNames[product.unit] ||
    `প্রতি ${product.unit || "পিস"}`;

  const categories = [
    product.categoryNameBn,
    product.category && !product.categoryNameBn
      ? product.category
      : null,
  ].filter(Boolean);

  return (
    <section className="rounded-3xl border border-[#e0e9e0] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#eef6ee] text-6xl">
          {getEmoji(product)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-green-700">
            পণ্যের বিস্তারিত
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#202820] sm:text-4xl">
            {product.nameBn || product.name}
          </h1>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            {product.description ||
              `${product.nameBn || product.name} এর আজকের বাজারদর ও বিভিন্ন বাজারের দাম তুলনা করুন।`}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {categories.map((category, index) => (
              <span
                key={`${category}-${index}`}
                className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800"
              >
                {category}
              </span>
            ))}

            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
              {unit}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
