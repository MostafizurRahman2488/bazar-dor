
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProducts } from "@/services/productServices";

import ProductSummary from "@/components/ProductDetails/ProductSummary";
import PriceSummary from "@/components/ProductDetails/PriceSummary";
import MarkerPrices from "@/components/ProductDetails/MarkerPrices";

function toNumber(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) && number >= 0
    ? number
    : null;
}

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");
}

function getMarketRows(product) {
  const rawMarkets =
    product.marketPrices ??
    product.market_prices ??
    product.markets ??
    product.bazarPrices ??
    product.bazars ??
    [];

  if (!Array.isArray(rawMarkets)) {
    return [];
  }

  return rawMarkets.map((market) => ({
    ...market,

    name:
      market.name ??
      market.marketName ??
      market.market_name ??
      market.bazarName ??
      market.bazar ??
      market.market,

    area:
      market.area ??
      market.location ??
      market.district ??
      market.city,

    today: toNumber(
      market.today ??
      market.priceToday ??
      market.todayPrice ??
      market.currentPrice ??
      market.price
    ),

    yesterday: toNumber(
      market.yesterday ??
      market.priceYesterday ??
      market.yesterdayPrice
    ),

    lastWeek: toNumber(
      market.lastWeek ??
      market.priceLastWeek ??
      market.lastWeekPrice
    ),

    lastMonth: toNumber(
      market.lastMonth ??
      market.priceLastMonth ??
      market.lastMonthPrice
    ),
  }));
}

function getPriceStats(product, markets) {
  const marketPrices = markets
    .map((market) => market.today)
    .filter((price) => price !== null);

  const minFromApi = toNumber(
    product.minPrice ??
    product.minimumPrice ??
    product.min_price
  );

  const maxFromApi = toNumber(
    product.maxPrice ??
    product.maximumPrice ??
    product.max_price
  );

  const avgFromApi = toNumber(
    product.averagePrice ??
    product.avgPrice ??
    product.average_price
  );

  return {
    min:
      minFromApi ??
      (marketPrices.length
        ? Math.min(...marketPrices)
        : null),

    max:
      maxFromApi ??
      (marketPrices.length
        ? Math.max(...marketPrices)
        : null),

    avg:
      avgFromApi ??
      (marketPrices.length
        ? marketPrices.reduce(
          (sum, price) => sum + price,
          0
        ) / marketPrices.length
        : toNumber(product.todayPrice)),
  };
}

export default async function ProductDetailsPage({
  params,
}) {
  const { slug } = await params;

  // Protected route: login required
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  let products;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Product API error:", error);

    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            API সংযোগে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const product = products.find((item) => {
    const identifiers = [
      item.slug,
      item.id,
      item._id,
      item.productId,
      item.productSlug,
    ];

    return identifiers.some(
      (value) =>
        value != null &&
        normalize(value) === normalize(slug)
    );
  });

  if (!product) {
    notFound();
  }

  const markets = getMarketRows(product);
  const prices = getPriceStats(product, markets);

  const rawUnit = String(
    product.unit ?? product.unitName ?? "পিস"
  ).toLowerCase();

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

  const unit =
    unitNames[rawUnit] ??
    (rawUnit.startsWith("প্রতি ")
      ? rawUnit
      : `প্রতি ${rawUnit}`);

  const title =
    product.nameBn ??
    product.name ??
    product.titleBn ??
    product.title ??
    "পণ্যের বিস্তারিত";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-600"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <span>
            {product.categoryNameBn ??
              product.categoryBn ??
              "পণ্য"}
          </span>

          <span>›</span>

          <span className="font-medium text-gray-800">
            {title}
          </span>
        </nav>

        <div className="space-y-5 sm:space-y-6">
          <ProductSummary product={product} />

          <PriceSummary product={product} />

          <MarkerPrices
            markets={markets}
            unit={unit}
          />
        </div>
      </div>
    </main>
  );
}
