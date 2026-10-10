
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";
import { AuthButtons } from "./MobileMenu";
import PriceTicker from "../Ticker/PriceTicker";

const Navbar = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8eee9] bg-[#fafcfb]">
      {/* First Row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#07883f]">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={48}
              height={48}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold leading-tight text-[#202820] sm:text-2xl">
              বাজার দর
            </h1>
            <p className="mt-1 text-xs text-[#454d47] sm:text-sm">
              {date}
            </p>
          </div>
        </Link>

        <AuthButtons />
      </div>

      {/* Second Row */}
      <NavLinks />
      <PriceTicker />
    </header>
  );
};

export default Navbar;
