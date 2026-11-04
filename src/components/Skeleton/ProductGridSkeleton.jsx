import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton({
  count = 6,
}) {
  return (
    <div
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}