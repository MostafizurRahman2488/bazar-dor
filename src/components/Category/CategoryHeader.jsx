
"use client";

export default function CategoryHeader({ category, productCount = 0 }) {
  const categoryName =
    category?.nameBn ?? category?.name ?? "ক্যাটাগরি";

  const categoryIcon =
    category?.icon ?? category?.categoryIcon ?? "🛒";

  return (
    <header className="rounded-2xl border border-[#e0e9e0] bg-[#fbfdfb] px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl">
          {categoryIcon}
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold leading-tight text-[#202820]">
            {categoryName}
          </h1>

          <p className="mt-1 text-sm text-[#596359]">
            {Number(productCount).toLocaleString("bn-BD")}টি পণ্যের
            আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
    </header>
  );
}
