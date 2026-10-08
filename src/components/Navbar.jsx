"use client";

import Image from "next/image";
import NavLinks from "./NavLinks";

const Navbar = () => {

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <nav className="container mx-auto">
            <div className="flex items-center justify-between">

                <div>
                    <Image
                        src="/images/logo-icon.png"
                        alt="Bazar Dor"
                        width={50}
                        height={50}
                    />

                    <p className="text-sm text-red-500">
                        {date}
                    </p>
                </div>

                <NavLinks />

            </div>
        </nav>
    );
};

export default Navbar;