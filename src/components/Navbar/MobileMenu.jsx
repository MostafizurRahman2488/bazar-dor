
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function AuthButtons() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);


    const handleSignOut = async () => {
        try {
            const { error } = await signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            setIsOpen(false);
            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out failed:", error);
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        }
    };


    if (isPending) {
        return (
            <div className="text-sm text-gray-500">
                লোড হচ্ছে...
            </div>
        );
    }

    // Login successful হলে
    if (session?.user) {
        const user = session.user;

        return (
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-gray-100"
                    aria-expanded={isOpen}
                >
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "User"}
                            width={52}
                            height={52}
                            className="h-12 w-12 rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl font-bold text-green-700">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    )}

                    <span className="max-w-32 truncate text-xl font-semibold text-gray-900">
                        {user.name || "User"}
                    </span>

                    <span className="text-gray-500">
                        {isOpen ? "▴" : "▾"}
                    </span>
                </button>


                {isOpen && (
                    <div className="absolute right-0 top-full z-50 mt-3 w-80 max-w-[90vw] rounded-2xl border border-gray-200 bg-[#fbfdfb] p-5 shadow-xl">

                        {/* User Information */}
                        <div className="mb-4">
                            <p className="truncate text-base font-bold text-gray-800">
                                {user.name || "User"}
                            </p>

                            <p className="mt-1 truncate text-sm text-gray-500">
                                {user.email || ""}
                            </p>
                        </div>

                        {/* Profile Link */}
                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="mb-2 flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50"
                        >
                            <span>👤</span>
                            <span>আমার প্রোফাইল</span>
                        </Link>

                        {/* Sign Out */}
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                        >
                            <span>↩</span>
                            <span>সাইন আউট</span>
                        </button>
                    </div>
                )}

            </div>
        );
    }

    // Login না করলে আগের ডিজাইন
    return (
        <div className="flex items-center gap-1 sm:gap-2">
            <Link
                href="/signin"
                className="whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-green-50 sm:px-3"
            >
                সাইন ইন
            </Link>

            <Link
                href="/signup"
                className="whitespace-nowrap rounded-lg bg-[#07883f] px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
                সাইন আপ
            </Link>
        </div>
    );
}

export default function MobileMenu() {
    const { data: session, isPending } = useSession();

    if (isPending) return null;

    return (
        <div className="md:hidden">
            <Link
                href={session?.user ? "/profile" : "/signin"}
                className="text-sm font-semibold text-green-700"
            >
                {session?.user ? "আমার প্রোফাইল" : "সাইন ইন"}
            </Link>
        </div>
    );
}
