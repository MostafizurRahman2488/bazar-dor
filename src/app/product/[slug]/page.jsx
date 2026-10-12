import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getProducts } from "@/services/productServices";

import ProductSummary from "@/components/ProductDetails/ProductSummary";
import PriceSummary from "@/components/ProductDetails/PriceSummary";
import MarkerPrices from "@/components/ProductDetails/MarkerPrices";

// Requirement 4: safely convert price values to numbers.
function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

// Requirement 4C: collect price information from different markets.
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

// Requirement 4B: calculate minimum, maximum and average price.
function getPriceStats(product, markets) {
  const todayPrices = markets
    .map((market) => market.today)
    .filter((price) => price !== null);

  const min = toNumber(product.minPrice ?? product.minimumPrice);
  const max = toNumber(product.maxPrice ?? product.maximumPrice);
  const avg = toNumber(product.averagePrice ?? product.avgPrice);

  return {
    min: min ?? (
      todayPrices.length ? Math.min(...todayPrices) : null
    ),
    max: max ?? (
      todayPrices.length ? Math.max(...todayPrices) : null
    ),
    avg: avg ?? (
      todayPrices.length
        ? todayPrices.reduce((sum, price) => sum + price, 0) /
          todayPrices.length
        : toNumber(product.today)
    ),
  };
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  // Requirement 4: protect this page; login is required.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  // Fetch product data from the existing service.
  const products = await getProducts();

  const product = products.find(
    (item) =>
      String(item.slug) === String(slug) ||
      String(item.id) === String(slug)
  );

  // Invalid product slug -> 404 page.
  if (!product) {
    notFound();
  }

  const markets = getMarketRows(product);
  const prices = getPriceStats(product, markets);

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

  const rawUnit = String(product.unit || "পিস").toLowerCase();
  const unit = unitNames[rawUnit] || `প্রতি ${product.unit || "পিস"}`;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-gray-600">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span className="mx-2">›</span>
          <span>পণ্যের বিস্তারিত</span>
        </nav>

        <div className="space-y-6">
          {/* Requirement 4A: emoji, title, summary, category and unit. */}
          <ProductSummary product={product} />

          {/* Requirement 4B: minimum, maximum and average prices. */}
          <PriceSummary
            min={prices.min}
            max={prices.max}
            avg={prices.avg}
            unit={unit}
          />

          {/* Requirement 4C: market-by-market prices. */}
          <MarkerPrices markets={markets} unit={unit} />
        </div>

       
      </div>
    </main>
  );
}