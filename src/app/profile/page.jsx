import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import ProfileCard from "@/components/Profile/ProfileCard";

export const metadata = {
  title: "My Profile | বাজার দর",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(
      "/signin?reason=auth-required&callbackURL=%2Fprofile"
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-[690px]">
        <h1 className="text-2xl font-extrabold text-[#263129]">
          আমার প্রোফাইল
        </h1>

        <p className="mt-1 text-sm text-[#687169]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
        </p>

        <div className="mt-6">
          <ProfileCard />
        </div>
      </div>
    </main>
  );
}