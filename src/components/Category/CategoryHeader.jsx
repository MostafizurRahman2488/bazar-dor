
export default function CategoryHeader({ category, productCount }) {
  return (
    <header className="rounded-2xl border border-[#e0e9e0] bg-[#f1f7f1] p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
          {category?.icon ?? category?.categoryIcon ?? "🛒"}
        </div>

        <div>
          <p className="text-sm font-semibold text-green-700">
            বাজার দর ক্যাটাগরি
          </p>

          <h1 className="mt-1 text-2xl font-extrabold text-[#202820] sm:text-3xl">
            {category?.nameBn ?? category?.name ?? "ক্যাটাগরি"}
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {productCount.toLocaleString("bn-BD")}টি পণ্যের
            আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
    </header>
  );
}
