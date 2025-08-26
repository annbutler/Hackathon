import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'], // include characters you need
  variable: '--font-inter', // optional if you want CSS variable
  display: 'swap', // improves font loading experience
});


export const metadata: Metadata = {
  title: "Starter Kit",
  description: "The Next Generation of MVP Starters",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
