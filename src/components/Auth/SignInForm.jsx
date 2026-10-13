
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInForm = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    // Email and password sign in
    const onSubmit = async (e) => {
        e.preventDefault();

        if (loading || socialLoading) return;

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();

        if (!email || !password) {
            toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                console.error("Email sign in error:", error);
                toast.error(
                    error.message ||
                    "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                );
                return;
            }

            if (!data) {
                toast.error("সাইন ইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে!");

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign in error:", error);
            toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    // Google and GitHub sign in
    const handleSocialSignIn = async (provider) => {
        if (loading || socialLoading) return;

        setSocialLoading(provider);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: `${window.location.origin}/`,
                errorCallbackURL: `${window.location.origin}/signin`,
            });

            if (result?.error) {
                console.error(
                    `${provider} sign in error:`,
                    result.error
                );

                toast.error(
                    result.error.message ||
                    `${provider === "google" ? "Google" : "GitHub"} দিয়ে লগইন করা যায়নি।`
                );

                setSocialLoading("");
            }

            // Successful OAuth normally redirects the browser.
            // Do not clear loading before the redirect starts.
        } catch (error) {
            console.error("Social sign in error:", error);

            toast.error(
                "Social login ব্যর্থ হয়েছে। Console-এর error দেখুন।"
            );

            setSocialLoading("");
        }
    };

    const isBusy = loading || Boolean(socialLoading);

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto mb-6 text-center">
                <h1 className="text-2xl font-bold text-[#26352b]">
                    সাইন ইন
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    বাজারদর ও আপনার প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="mx-auto w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="signin-email"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="signin-email"
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
                            htmlFor="signin-password"
                            className="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="signin-password"
                            name="password"
                            type="password"
                            placeholder="আপনার পাসওয়ার্ড"
                            autoComplete="current-password"
                            required
                            disabled={isBusy}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isBusy}
                        className="flex w-full items-center justify-center rounded-lg bg-green-700 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
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
                            onClick={() => handleSocialSignIn("google")}
                            className="rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                        >
                            {socialLoading === "google"
                                ? "Google-এ সংযোগ হচ্ছে..."
                                : "Google দিয়ে চালিয়ে যান"}
                        </button>

                        <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleSocialSignIn("github")}
                            className="rounded-lg border border-gray-200 px-2 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                        >
                            {socialLoading === "github"
                                ? "GitHub-এ সংযোগ হচ্ছে..."
                                : "GitHub দিয়ে চালিয়ে যান"}
                        </button>
                    </div>

                    <p className="pt-1 text-center text-sm text-gray-600">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-green-700 hover:underline"
                        >
                            সাইন আপ করুন
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

export default SignInForm;
