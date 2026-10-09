
import ProfileCard from "@/components/Profile/ProfileCard";

export const metadata = {
  title: "My Profile | বাজার দর",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-base-200 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">
          আমার প্রোফাইল
        </h1>

        <ProfileCard />
      </div>
    </main>
  );
}

