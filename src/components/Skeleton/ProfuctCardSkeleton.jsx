export default function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-[21px] border border-gray-200 bg-white p-5"
    >
      <div className="flex items-center gap-4">
        <div className="h-[62px] w-[62px] rounded-[17px] bg-gray-200" />

        <div className="flex-1 space-y-3">
          <div className="h-5 w-28 rounded bg-gray-200" />
          <div className="h-3 w-20 rounded bg-gray-200" />
        </div>
      </div>

      <div className="mt-5 h-3 w-20 rounded bg-gray-200" />

      <div className="mt-3 h-7 w-32 rounded bg-gray-200" />

      <div className="mt-5 h-9 w-full rounded-xl bg-gray-200" />
    </div>
  );
}