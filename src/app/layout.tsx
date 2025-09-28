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
  title: "PoliTalk - Your Ward Information Hub",
  description: "Get informed about your Chicago ward, connect with your alderman, and stay engaged with local government. Find ward information, submit requests, and discover local events.",
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
