import { ProfilResponse } from "@/app/api/graphQL";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/assets/icons";

interface FooterProps {
  profilData: ProfilResponse;
}

export default function Footer({ profilData }: FooterProps) {
  return (
    <footer className="bg-black py-16 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <ContactInfo
          nom={profilData.profil.nom}
          phone={profilData.profil.phone}
          instagram={profilData.profil.instagram}
          facebook={profilData.profil.facebook}
        />
      </div>
      <div className="mt-8 text-center text-sm">
        <p>
          © {new Date().getFullYear()} {profilData.profil.nom}
        </p>
      </div>
    </footer>
  );
}

function ContactInfo({
  nom,
  phone,
  instagram,
  facebook,
}: {
  nom: string;
  phone: string;
  instagram: string;
  facebook: string;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold">Contact</h3>
      <p className="mt-4">{nom}</p>
      <p className="mt-2">{phone}</p>
      <div className="mt-4 flex space-x-4">
        <a href={`https://www.instagram.com/${instagram}`} target="_blank">
          <InstagramIcon className="h-5 w-5" />
        </a>
        <a
          href={`https://www.facebook.com/profile.php?id=${facebook}`}
          target="_blank"
        >
          <FacebookIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
