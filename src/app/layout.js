import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: "300",
  display: "swap",
});

export const metadata = {
  title: "Bazar Dor",
  description: "বাংলাদেশের দৈনিক বাজার দর",
};

export const instant = false;

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} min-h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#F0F5F0]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}