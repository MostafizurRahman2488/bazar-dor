
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UpdateProfileForm = () => {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    if (isPending) {
        return (
            <div className="mx-auto max-w-lg animate-pulse rounded-2xl bg-base-200 p-6">
                <div className="mb-4 h-6 w-48 rounded bg-base-300" />
                <div className="mb-4 h-12 rounded bg-base-300" />
                <div className="h-12 rounded bg-base-300" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="mx-auto max-w-lg rounded-2xl border p-6 text-center">
                <p className="mb-4">এই পেজ ব্যবহার করতে সাইন ইন করুন।</p>
                <button
                    onClick={() => router.push("/signin")}
                    className="btn btn-success"
                >
                    সাইন ইন
                </button>
            </div>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        if (trimmedName === session.user.name) {
            toast.error("নামে কোনো পরিবর্তন করা হয়নি");
            return;
        }

        setIsUpdating(true);

        try {
            const { error } = await authClient.updateUser({
                name: trimmedName,
            });

            if (error) {
                toast.error(error.message || "নাম আপডেট করা যায়নি");
                return;
            }

            toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে");

            router.push("/profile");
            router.refresh();
        } catch {
            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <section className="mx-auto max-w-lg rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
            <h1 className="mb-2 text-2xl font-bold">
                Update Information
            </h1>

            <p className="mb-6 text-sm text-base-content/60">
                আপনার প্রোফাইলের নাম পরিবর্তন করুন।
            </p>

            <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                    <label htmlFor="name" className="mb-2 block font-medium">
                        আপনার নাম
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="input input-bordered w-full"
                        required
                        maxLength={100}
                        disabled={isUpdating}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success w-full"
                    disabled={isUpdating}
                >
                    {isUpdating ? "আপডেট হচ্ছে..." : "Update Information"}
                </button>

                <button
                    type="button"
                    onClick={() => router.push("/profile")}
                    className="btn btn-outline w-full"
                    disabled={isUpdating}
                >
                    বাতিল
                </button>
            </form>
        </section>
    );
};

export default UpdateProfileForm;

