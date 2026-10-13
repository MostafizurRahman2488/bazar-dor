
export default function AuthLoading() {
    return (
        <main className="min-h-screen animate-pulse bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto mb-6 max-w-sm space-y-3 text-center">
                <div className="mx-auto h-8 w-36 rounded bg-gray-200" />
                <div className="mx-auto h-4 w-64 max-w-full rounded bg-gray-200" />
            </div>

            <div className="mx-auto w-full max-w-sm space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-11 w-full rounded-lg bg-gray-200" />

                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-11 w-full rounded-lg bg-gray-200" />

                <div className="h-11 w-full rounded-lg bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />

                <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 rounded-lg bg-gray-200" />
                    <div className="h-10 rounded-lg bg-gray-200" />
                </div>
            </div>
        </main>
    );
}
