import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-green-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">

        <div className="text-6xl" aria-hidden="true">
          🔎
        </div>

        <p className="mt-5 text-sm font-bold tracking-[0.2em] text-green-700">
          ERROR 404
        </p>

        <h1 className="mt-3 text-2xl font-extrabold text-[#202820] sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-600">
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
          ঠিকানা পরিবর্তন হয়েছে অথবা পেজটি বর্তমানে
          পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
}