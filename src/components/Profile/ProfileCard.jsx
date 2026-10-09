"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const ProfileCard = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="mx-auto max-w-lg animate-pulse rounded-2xl bg-base-200 p-6">
        <div className="mb-4 h-16 w-16 rounded-full bg-base-300" />
        <div className="mb-3 h-5 w-40 rounded bg-base-300" />
        <div className="h-4 w-56 rounded bg-base-300" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border p-6 text-center">
        <p className="mb-4">প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
        <Link href="/signin" className="btn btn-success">
          সাইন ইন
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <section className="mx-auto max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-4">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold">
            {user.name || "নাম দেওয়া হয়নি"}
          </h2>
          <p className="text-sm text-base-content/60">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3 border-t border-base-300 py-4">
        <p>
          <span className="font-semibold">নাম:</span>{" "}
          {user.name || "—"}
        </p>
        <p>
          <span className="font-semibold">ইমেইল:</span> {user.email}
        </p>
      </div>

      <Link
        href="/profile/update"
        className="btn btn-success mt-3 w-full"
      >
        Update Information
      </Link>
    </section>
  );
};

export default ProfileCard;