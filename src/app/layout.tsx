import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Navigation from "@/Components/layouts/navigation";

const inter = Inter({
  subsets: ['latin'], // include characters you need
  variable: '--font-inter', // optional if you want CSS variable
  display: 'swap', // improves font loading experience
});


export const metadata: Metadata = {
  title: "Chicago Wards - Find Your Ward & Connect with Your Alderman",
  description: "Connect with your Chicago ward, alderman, and local community. Submit requests, view events, and stay informed about local government.",
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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
