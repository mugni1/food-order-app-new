"use client";
// import { Geist, Geist_Mono, Poppins } from "next/font/google";
import TextHeader from "@/components/TextHeader";
import "./globals.css";
import { usePathname } from "next/navigation";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"], // Pilih subset (Latin untuk teks umum)
  weight: ["300", "400", "600", "700"], // Pilih bobot font yang dibutuhkan
  variable: "--font-poppins", // Simpan dalam variabel CSS
});

const enableNavbar = ["/", "/meals", "/seafoods", "/appetizers", "/drinks"];

export default function RootLayout({ children }) {
  const path = usePathname();
  return (
    <html lang="en">
      <body className="font-poppins">
        {enableNavbar.includes(path) == true && <TextHeader />}
        {children}
      </body>
    </html>
  );
}
