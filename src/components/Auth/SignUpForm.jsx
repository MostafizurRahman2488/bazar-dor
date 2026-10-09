import Link from 'next/link';
import React from 'react';
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUpForm = () => {
      const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })
        if(data){
            console.log(data);
            redirect("/")
        }
        if(error){
            console.log(error);
            
        }

    }
    return (
        <div>
            <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            {/* Page Heading */}
            <div className="mx-auto mb-5 max-w-md text-center">
                <h2 className="text-2xl font-bold text-[#26352b]">
                    অ্যাকাউন্ট তৈরি করুন
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    বিনা খরচে সাইন আপ করে সব বিচিত্র দামের দেখুন
                </p>
            </div>

            {/* Signup Card */}
            <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm sm:p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            autoComplete="name"
                            required
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
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
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="আবার লিখুন"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 active:scale-[0.99]"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 py-1">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="text-sm text-gray-500">
                            অথবা
                        </span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    {/* Social Signup Buttons */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <span className="font-bold text-base text-blue-600">
                                G
                            </span>
                            Google দিয়ে সাইন আপ
                        </button>

                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.66.12 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.22-5.08 5.49.4.35.75 1.02.75 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>
                            GitHub দিয়ে সাইন আপ
                        </button>
                    </div>

                    {/* Sign In Link */}
                    <p className="pt-1 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-medium text-green-700 hover:text-green-800 hover:underline"
                        >
                            সাইন ইন করুন
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
        </div>
    );
};

export default SignUpForm;