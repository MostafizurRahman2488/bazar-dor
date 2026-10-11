
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f7faf7] px-4 py-10">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 h-5 w-40 rounded bg-gray-200" />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-72 rounded-2xl bg-gray-200" />

          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
            <div className="h-24 rounded-xl bg-gray-200" />
            <div className="h-12 w-40 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
