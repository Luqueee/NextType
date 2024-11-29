import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import { NavBar } from "@/components/NavBar";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextType",
  description: "Typing speed test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${roboto.className} antialiased w-full h-screen flex flex-col items-center`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
