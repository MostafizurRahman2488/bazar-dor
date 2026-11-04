
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfileCard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [isSigningOut, setIsSigningOut] = useState(false);

  // Loading state
  if (isPending) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-28 rounded-2xl border border-[#e2eae2] bg-white" />
        <div className="h-56 rounded-2xl border border-[#e2eae2] bg-white" />
      </div>
    );
  }

  // If user is not logged in
  if (!session?.user) {
    return (
      <section className="rounded-2xl border border-[#e2eae2] bg-white p-6 text-center">
        <p className="text-[#465047]">
          প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>

        <button
          onClick={() => router.push("/signin")}
          className="mt-4 rounded-lg bg-[#07883e] px-6 py-2 font-semibold text-white"
        >
          সাইন ইন
        </button>
      </section>
    );
  }

  const user = session.user;

  // Sign Out
  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Navigate to Update Profile Page
  const handleUpdate = () => {
    router.push("/profile/update");
  };

  return (
    <div className="space-y-5">

      {/* Profile Information */}
      <section className="flex min-h-[112px] items-center gap-3 rounded-2xl border border-[#e1e9e1] bg-white p-4 sm:gap-4 sm:px-6">

        {/* Profile Image */}
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile"}
            width={76}
            height={76}
            className="h-16 w-16 shrink-0 rounded-2xl border border-[#d6e7d8] object-cover sm:h-[68px] sm:w-[68px]"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d6e7d8] bg-[#eff6ef] text-2xl font-bold text-[#07883e] sm:h-[68px] sm:w-[68px]">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        {/* Name and Email */}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-bold text-[#29332b] sm:text-lg">
            {user.name || "নাম দেওয়া হয়নি"}
          </h2>

          <p className="break-all text-sm text-[#414a42]">
            {user.email}
          </p>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="shrink-0 rounded-lg border border-[#ff5555] px-3 py-2 text-xs font-semibold text-[#f04444] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
        >
          {isSigningOut ? "অপেক্ষা করুন..." : "↩ সাইন আউট"}
        </button>
      </section>

      {/* Profile Details */}
      <section className="rounded-2xl border border-[#e1e9e1] bg-white p-5 sm:p-6">

        <h2 className="mb-5 text-base font-bold text-[#303a31]">
          আমার তথ্য
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-[#687169]">
              নাম
            </p>

            <p className="mt-1 font-semibold text-[#29332b]">
              {user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#687169]">
              ইমেইল
            </p>

            <p className="mt-1 break-all font-semibold text-[#29332b]">
              {user.email}
            </p>
          </div>

        </div>

        {/* Update Button */}
        <button
          type="button"
          onClick={handleUpdate}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-lg bg-[#07883e] text-sm font-bold text-white shadow-[0_3px_0_#b9d9c3] transition hover:bg-[#067735]"
        >
          তথ্য আপডেট করুন
        </button>

      </section>
    </div>
  );
}
