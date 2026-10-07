import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Bazar Dor",
  description: "বাংলাদেশের দৈনিক বাজার দর",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <h1>Navbar</h1>

        {children}

        <h1>Footer</h1>
      </body>
    </html>
  );
}