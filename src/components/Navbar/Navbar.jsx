import Image from "next/image";
import { connection } from "next/server";
import NavLinks from "./NavLinks";

const Navbar = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header>
      <nav className="flex justify-between items-center container mx-auto">
        <div className="flex">
          <Image
            src="/images/logo-icon.png"
            alt="Bazar Dor"
            width={50}
            height={50}
          />

          <div>
            <h1>বাজার দর</h1>
            <p>{date}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="btn">সাইন ইন</div>
          <div className="btn">সাইন আপ</div>
        </div>
      </nav>

      <NavLinks />
    </header>
  );
};

export default Navbar;