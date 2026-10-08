import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import PriceTicker from "@/components/Ticker/PriceTicker";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
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
      className={`${notoSansBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <PriceTicker />
        {children}
      </body>
    </html>
  );
}