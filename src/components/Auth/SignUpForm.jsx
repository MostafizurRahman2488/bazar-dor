
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUpForm = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    // Email and password signup
    const onSubmit = async (e) => {
        e.preventDefault();

        if (loading || socialLoading) return;

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData
            .get("confirmPassword")
            ?.toString();

        if (!name || !email || !password || !confirmPassword) {
            toast.error("সবগুলো ফিল্ড পূরণ করুন।");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("দুটি পাসওয়ার্ড একই নয়!");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                console.error("Signup error:", error);

                const errorMessage = String(
                    error.message || ""
                ).toLowerCase();

                const errorCode = String(
                    error.code || ""
                ).toUpperCase();

                if (
                    errorCode.includes("USER_ALREADY_EXISTS") ||
                    errorMessage.includes("already exists") ||
                    errorMessage.includes("already registered")
                ) {
                    toast.error(
                        "এই ইমেইল দিয়ে আগে থেকেই অ্যাকাউন্ট আছে।"
                    );
                } else {
                    toast.error(
                        error.message ||
                        "সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
                    );
                }

                return;
            }

            if (!data) {
                toast.error(
                    "অ্যাকাউন্ট তৈরি হয়নি। আবার চেষ্টা করুন।"
                );
                return;
            }

            toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    // Google and GitHub OAuth

    // Google and GitHub OAuth
    const handleSocialSignIn = async (provider) => {
        if (loading || socialLoading) return;

        setSocialLoading(provider);

        try {
            const { data, error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
                errorCallbackURL: "/signup",
            });

            if (error) {
                console.error(`${provider} OAuth error: `, error);

                toast.error(
                    error.message ||
                    `${provider} দিয়ে লগইন করা যায়নি।`
                );

                setSocialLoading("");
                return;
            }

            // OAuth redirect শুরু হলে ব্রাউজার provider-এর
            // login page-এ চলে যাবে।
            console.log(`${provider} OAuth initiated: `, data);
        } catch (error) {
            console.error(`${provider} OAuth exception: `, error);

            toast.error(
                `${provider} login ব্যর্থ হয়েছে। আবার চেষ্টা করুন।`
            );

            setSocialLoading("");
        }
    };


    const isBusy = loading || Boolean(socialLoading);

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto mb-5 max-w-md text-center">
                <h1 className="text-2xl font-bold text-[#26352b]">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    সাইন আপ করে বাজারদরের বিস্তারিত তথ্য দেখুন।
                </p>
            </div>

            <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="signup-name"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="signup-name"
                            name="name"
                            type="text"
                            placeholder="আপনার নাম"
                            autoComplete="name"
                            required
                            disabled={isBusy}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signup-email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            disabled={isBusy}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signup-password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            disabled={isBusy}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="signup-confirm-password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="signup-confirm-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="আবার পাসওয়ার্ড লিখুন"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            disabled={isBusy}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isBusy}
                        className="w-full rounded-lg bg-green-700 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                            : "অ্যাকাউন্ট তৈরি করুন"}
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
                            disabled={isBusy}
                            onClick={() =>
                                handleSocialSignIn("google")
                            }
                            className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                        >
                            {socialLoading === "google"
                                ? "Google-এ সংযোগ হচ্ছে..."
                                : "Google দিয়ে সাইন আপ"}
                        </button>

                        <button
                            type="button"
                            disabled={isBusy}
                            onClick={() =>
                                handleSocialSignIn("github")
                            }
                            className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                        >
                            {socialLoading === "github"
                                ? "GitHub-এ সংযোগ হচ্ছে..."
                                : "GitHub দিয়ে সাইন আপ"}
                        </button>
                    </div>

                    <p className="pt-1 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/signin"
                            className="font-medium text-green-700 hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </form>
            </div>

            <div className="mt-5 text-center">
                <Link
                    href="/"
                    className="text-sm text-gray-600 hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default SignUpForm;
