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

function getCategories(product) {
  const categories = [
    product.categoryNameBn,
    product.categoryBn,
    typeof product.category === "string" ? product.category : null,
    product.category?.nameBn,
    product.category?.name,
    ...(Array.isArray(product.categories) ? product.categories : []),
    ...(Array.isArray(product.tags) ? product.tags : []),
  ];

  return [
    ...new Set(
      categories.filter(
        (category) =>
          typeof category === "string" && category.trim()
      )
    ),
  ];
}

// Requirement 4A: product summary section.
export default function ProductSummary({ product }) {
  const title =
    product.nameBn ||
    product.name ||
    product.titleBn ||
    product.title ||
    "পণ্যের নাম";

  const rawUnit = String(product.unit || "পিস").toLowerCase();

  const unit = unitNames[rawUnit] ||
    (rawUnit.startsWith("প্রতি ")
      ? rawUnit
      : `প্রতি ${product.unit || "পিস"}`);

  const categories = getCategories(product);

  const summary =
    product.marketSummary ||
    product.summaryBn ||
    product.descriptionBn ||
    product.description ||
    `${title} এর আজকের বাজারদর ও বিভিন্ন বাজারের দাম তুলনা করুন।`;

  return (
    <section
      aria-labelledby="product-title"
      className="rounded-3xl border border-[#e0e9e0] bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eef6ee] text-5xl sm:h-24 sm:w-24 sm:text-6xl"
        >
          {getEmoji(product)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-green-700">
            পণ্যের বিস্তারিত
          </p>

          <h1
            id="product-title"
            className="mt-1 text-2xl font-extrabold text-[#202820] sm:text-3xl"
          >
            {title}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
            {summary}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {categories.map((category, index) => (
              <span
                key={`${category}-${index}`}
                className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-semibold text-green-800"
              >
                {category}
              </span>
            ))}

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {unit}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}