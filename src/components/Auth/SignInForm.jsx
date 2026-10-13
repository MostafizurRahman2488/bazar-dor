"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";


const SignInForm = () => {
    const router = useRouter();


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(
            new FormData(e.currentTarget)
        );

        const { email, password } = formData;

        const { data, error } = await authClient.signIn.email({
            email: email.trim(),
            password,
        });


        if (error) {
            toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
            return;
        }

        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push("/");
        router.refresh();

        console.log("Sign in successful:", data);

        router.push("/signin");
    };


    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto mb-6 text-center">
                <h2 className="text-2xl font-bold text-[#26352b]">
                    সাইন ইন
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
                    অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="mx-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm sm:p-6">
                <form onSubmit={onSubmit} className="space-y-4">
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

                    <button type="submit" disabled={loading}>
                        {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
                    </button>

                    <div className="flex items-center gap-3 py-1">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="text-sm text-gray-500">
                            অথবা
                        </span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() =>
                                authClient.signIn.social({
                                    provider: "google",
                                    callbackURL: "/",
                                })
                            }
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                authClient.signIn.social({
                                    provider: "github",
                                    callbackURL: "/",
                                })
                            }
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="pt-1 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-green-700 hover:text-green-800 hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </p>
                </form>
            </div>

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

export default SignInForm;