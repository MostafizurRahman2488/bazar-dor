import ProductGridSkeleton from "@/components/Skeleton/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8">
      <div className="mb-8 h-56 animate-pulse rounded-3xl bg-gray-200" />

      {["দাম বেড়েছে", "দাম কমেছে", "সব পণ্য"].map((title) => (
        <section key={title} className="mb-10">
          <div className="mb-6 h-7 w-40 animate-pulse rounded bg-gray-200" />
          <ProductGridSkeleton count={6} />
        </section>
      ))}
    </main>
  );
}