import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/blocks/Header";
import Footer from "@/components/blocks/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safarii Njéma",
  description:
    "Safarii Njéma est une agence de voyage dédiée à vous offrir des expériences inoubliables aux Comores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-white text-black`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
