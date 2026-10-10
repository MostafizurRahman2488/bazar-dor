
const formatBn = (value) =>
  Number(value || 0).toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

export default function ChangeBadge({ change }) {
  const dir = change?.dir;
  const pct = Number(change?.pct ?? 0);

  if (dir === "up") {
    return (
      <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-700">
        ▲ {formatBn(Math.abs(pct))}%
      </span>
    );
  }

  if (dir === "down") {
    return (
      <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-sm font-semibold text-red-700">
        ▼ {formatBn(Math.abs(pct))}%
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-sm font-semibold text-gray-600">
      — {formatBn(0)}%
    </span>
  );
}