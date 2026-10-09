
import Link from "next/link";

const SIgnInPage = () => {
    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            {/* Heading */}
            <div className="mx-auto mb-6 text-center">
                <h2 className="text-2xl font-bold text-[#26352b]">
                    সাইন ইন
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Login Card */}
            <div className="mx-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm sm:p-6">
                <form className="space-y-4">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="current-password"
                            required
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 active:scale-[0.99]"
                    >
                        সাইন ইন
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                        <div className="h-0.5 flex-1 bg-gray-300" />

                        <span className="text-sm text-gray-500">
                            অথবা
                        </span>

                        <div className="h-0.5 flex-1 bg-gray-300" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <svg
                                viewBox="0 0 48 48"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.7 6.1-14.9Z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.8a20 20 0 0 0 0 18Z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M24 11.8c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.8 15l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
                                />
                            </svg>

                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.66.12 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.22-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>

                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    {/* Signup Link */}
                    <p className="pt-1 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/sign-up"
                            className="font-medium text-green-700 hover:text-green-800 hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </form>
            </div>

            {/* Back to Home */}
            <div className="mt-5 text-center">
                <Link
                    href="/"
                    className="text-sm text-gray-600 transition hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default SIgnInPage;

