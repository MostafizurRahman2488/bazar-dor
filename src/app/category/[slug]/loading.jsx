export default function CategoryLoading() {
  return (
    <main
      aria-label="ক্যাটাগরি লোড হচ্ছে"
      aria-busy="true"
      className="mx-auto min-h-screen max-w-7xl px-5 py-8 sm:py-10"
    >
      <p className="mb-4 text-sm font-medium text-green-700">
        পণ্য লোড হচ্ছে...
      </p>

      {/* Category header skeleton */}
      <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="h-3 w-56 max-w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Sort control skeleton */}
      <div className="mt-8 flex justify-end">
        <div className="h-11 w-48 animate-pulse rounded-xl bg-gray-200" />
      </div>

      {/* Product card skeletons */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[21px] border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center gap-4">
              <div className="h-[62px] w-[62px] rounded-[17px] bg-gray-200" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-24 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>
            <div className="mt-5 h-3 w-20 rounded bg-gray-200" />
            <div className="mt-3 h-7 w-32 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}