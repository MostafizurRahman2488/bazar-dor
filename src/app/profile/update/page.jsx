
import UpdateProfileForm from "@/components/Profile/UpdateProfileForm";

export const metadata = {
    title: "Update Profile | বাজার দর",
};

export default function UpdateProfilePage() {
    return (
        <main className="min-h-screen bg-base-200 px-4 py-12">
            <div className="mx-auto max-w-6xl">
                <UpdateProfileForm />
            </div>
        </main>
    );
}

