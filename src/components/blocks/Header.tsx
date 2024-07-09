import Image from "next/image";
import { dancingFont, patuaFont } from "@/assets/fonts";
import { FacebookIcon, InstagramIcon } from "@/assets/icons";
import MobileMenu from "./MenuMobile";
import Link from "next/link";

export const menuItems = [
  { label: "Accueil", link: "/" },
  { label: "Devis", link: "/devis" },
  { label: "Contact", link: "/contact" },
];

interface HeaderProps {
  nom: string;
  instagram?: string;
  facebook?: string;
}

export default function Header({ nom, instagram, facebook }: HeaderProps) {
  return (
    <header>
      <div className="container mx-auto flex items-center justify-between px-6 pt-2">
        <div className="flex items-center space-x-4">
          <div className="grid columns-2 items-center gap-1 overflow-hidden">
            <Link href="/">
              {" "}
              <Image
                src="/images/icons/logo.jpg"
                alt="logo"
                width={60}
                height={60}
                className="mx-auto hidden rounded-full lg:block"
              />
            </Link>
            <div className="flex flex-row gap-4 pb-2">
              <MobileMenu />
              <span
                className={`${dancingFont.className} text-center text-xl font-bold`}
              >
                {nom ?? ""}
              </span>
            </div>
          </div>
        </div>
        <nav className="hidden space-x-6 lg:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={`${patuaFont.className} hover:text-gray-400"`}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {instagram ? (
            <a href={`https://www.instagram.com/${instagram}`} target="_blank">
              <InstagramIcon className="h-5 w-5" />
            </a>
          ) : null}
          {facebook ? (
            <a
              href={`https://www.facebook.com/profile.php?id=${facebook}`}
              target="_blank"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
