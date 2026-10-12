
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

      <select
        id="category-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer rounded-lg border border-[#d5dfd5] bg-transparent px-3 py-2 text-sm text-[#202820] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">কম থেকে বেশি</option>
        <option value="price-desc">বেশি থেকে কম</option>
      </select>
    </div>
  );
}
