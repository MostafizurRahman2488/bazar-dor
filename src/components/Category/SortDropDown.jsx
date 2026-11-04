
"use client";

export default function SortDropDown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="category-sort"
        className="text-sm font-medium text-[#303a30]"
      >
        সাজান
      </label>

      <div className="relative">
        <select
          id="category-sort"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="appearance-none cursor-pointer rounded-lg border border-[#d5dfd5] bg-transparent px-3 py-2 pr-10 text-sm text-[#202820] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">
            দাম: কম থেকে বেশি
          </option>
          <option value="price-desc">
            দাম: বেশি থেকে কম
          </option>
        </select>

        {/* Chevron Down Icon */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#303a30]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
