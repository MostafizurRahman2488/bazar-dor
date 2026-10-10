
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export function AuthButtons() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    if (isPending) {
        return (
            <div className="text-sm text-gray-500">
                লোড হচ্ছে...
            </div>
        );
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-2">
                <Link
                    href="/profile"
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                    প্রোফাইল
                </Link>

                <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                    সাইন আউট
                </button>
            </div>
        );
    }

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

    return (
        <div className="md:hidden">
            {!isPending && (
                <Link
                    href={session?.user ? "/profile" : "/signin"}
                    className="text-sm font-semibold text-green-700"
                >
                    {session?.user ? "আমার প্রোফাইল" : "সাইন ইন"}
                </Link>
            )}
        </div>
    );
}

