
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";
import { AuthButtons } from "./MobileMenu";

const Navbar = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full border-b border-[#e5ece7] bg-[#fafcfb]">
      {/* Row 1: Logo, date and Auth Buttons */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="bg-green-900 rounded">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={48}
              height={48}
              priority
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#202820] sm:text-2xl">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500 sm:text-sm">
              {date}
            </p>
          </div>
        </Link>

        <AuthButtons />
      </div>

      {/* Row 2: Category Navigation */}
      <NavLinks />
    </header>
  );
};

export default Navbar;

