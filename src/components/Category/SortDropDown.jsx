
"use client";

export default function SortDropDown({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="category-sort"
        className="shrink-0 text-sm font-medium text-gray-600"
      >
        সাজান:
      </label>

      <select
        id="category-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-xl border border-[#dce5dc] bg-white px-3 py-2.5 text-sm font-medium text-[#202820] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
      >
        <option value="default">ডিফল্ট</option>
        <option value="price-asc">দাম: কম থেকে বেশি</option>
        <option value="price-desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}
