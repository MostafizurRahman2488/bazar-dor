
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";

const Navbar = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full border-b border-[#e9eeea] bg-[#fafcfb]">
      {/* Top Row */}
      <nav className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-4 sm:px-6">
        {/* Logo + Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[15px] bg-[#07883f]">
            <Image
              src="/images/logo-icon.png"
              alt="বাজার দর"
              width={36}
              height={36}
              priority
              className="object-contain"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-[22px] font-bold leading-[27px] text-[#202820]">
              বাজার দর
            </h1>

            <p className="whitespace-nowrap text-[12px] leading-[18px] text-[#353b36]">
              {date}
            </p>
          </div>
        </Link>

        {/* Sign In / Sign Up */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <Link
            href="/sign-in"
            className="whitespace-nowrap rounded-md px-2 py-2 text-[14px] font-semibold text-[#202820] transition hover:text-green-700 sm:px-3"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="whitespace-nowrap rounded-[11px] bg-[#07883f] px-4 py-[13px] text-[14px] font-semibold text-white shadow-[0_3px_5px_rgba(0,100,40,0.28)] transition hover:bg-[#067535] sm:px-5"
          >
            সাইন আপ
          </Link>
        </div>
      </nav>

      {/* Bottom Category Row */}
      <NavLinks />
    </header>
  );
};

export default Navbar;
