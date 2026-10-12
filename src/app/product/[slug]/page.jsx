
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProducts } from "@/services/productServices";

import ProductSummary from "@/components/ProductDetails/ProductSummary";
import PriceSummary from "@/components/ProductDetails/PriceSummary";
import MarkerPrices from "@/components/ProductDetails/MarkerPrices";

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function getMarketRows(product) {
  const rawMarkets =
    product.marketPrices ??
    product.markets ??
    product.bazarPrices ??
    product.market_prices ??
    [];

  if (!Array.isArray(rawMarkets)) return [];

  return rawMarkets.map((market) => ({
    ...market,
    today: toNumber(
      market.today ?? market.priceToday ?? market.price
    ),
    yesterday: toNumber(
      market.yesterday ?? market.priceYesterday
    ),
    lastWeek: toNumber(
      market.lastWeek ?? market.priceLastWeek
    ),
    lastMonth: toNumber(
      market.lastMonth ?? market.priceLastMonth
    ),
  }));
}

function getPriceStats(product, markets) {
  const todayPrices = markets
    .map((market) => market.today)
    .filter((price) => price !== null);

  const min = toNumber(product.minPrice ?? product.minimumPrice);
  const max = toNumber(product.maxPrice ?? product.maximumPrice);
  const avg = toNumber(product.averagePrice ?? product.avgPrice);

  return {
    min: min ?? (todayPrices.length
      ? Math.min(...todayPrices)
      : null),

    max: max ?? (todayPrices.length
      ? Math.max(...todayPrices)
      : null),

    avg: avg ?? (todayPrices.length
      ? todayPrices.reduce((sum, price) => sum + price, 0) /
        todayPrices.length
      : toNumber(product.today)),
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  // Protect this route on the server.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const products = await getProducts();

  const product = products.find(
    (item) =>
      String(item.slug) === String(slug) ||
      String(item.id) === String(slug)
  );

  if (!product) {
    notFound();
  }

  const markets = getMarketRows(product);
  const prices = getPriceStats(product, markets);

  const unitNames = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    liter: "প্রতি লিটার",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
  };

  const unit =
    unitNames[product.unit] ||
    `প্রতি ${product.unit || "পিস"}`;

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-green-800 transition hover:text-green-600"
        >
          <span aria-hidden="true">←</span>
          হোমপেজে ফিরে যান
        </Link>

        <div className="mt-5 space-y-8">
          <ProductSummary product={product} />

          <PriceSummary
            min={prices.min}
            max={prices.max}
            avg={prices.avg}
            unit={unit}
          />

          <MarkerPrices
            markets={markets}
            unit={unit}
          />
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          প্রদর্শিত দাম API-তে পাওয়া তথ্যের ওপর নির্ভরশীল।
        </p>
      </div>
    </main>
  );
}
