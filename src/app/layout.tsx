import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/blocks/Header";
import Footer from "@/components/blocks/Footer";
import { getProfil, ProfilResponse } from "./api/graphQL";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safarii Njéma",
  description:
    "Safarii Njéma est une agence de voyage dédiée à vous offrir des expériences inoubliables aux Comores",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let profilData: ProfilResponse | null = null;
  try {
    profilData = await getProfil();
  } catch (error) {
    console.error("Error fetching accueil data:", error);
  }

  if (!profilData) {
    return <div>Erreur lors du chargement des données</div>;
  }
  return (
    <html lang="fr">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-white text-black`}
      >
        <Header
          nom={profilData.profil.nom}
          instagram={profilData.profil.instagram}
          facebook={profilData.profil.facebook}
        />
        <main className="flex-grow">{children}</main>
        <Footer profilData={profilData} />
      </body>
    </html>
  );
}
