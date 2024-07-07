import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/assets/icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-16 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <ContactInfo />
      </div>
      <div className="mt-8 text-center text-sm">
        <p>© 2024 Safari Ndjéma</p>
      </div>
    </footer>
  );
}

function ContactInfo() {
  return (
    <div>
      <h3 className="text-xl font-bold">Contact Us</h3>
      <p className="mt-4">Safari Ndjéma</p>
      <p className="mt-2">+33 6 12 87 79 86</p>
      <div className="mt-4 flex space-x-4">
        <a href="https://www.instagram.com/safarii_njema/" target="_blank">
          <InstagramIcon className="h-5 w-5" />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100071291511325"
          target="_blank"
        >
          <FacebookIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

function CategoryList() {
  const categories = [
    "Event Travel",
    "Holiday Trip",
    "Group Tour",
    "Package Holiday",
    "Gap Year",
  ];
  return (
    <div>
      <h3 className="text-xl font-bold">Category</h3>
      <ul className="mt-4 space-y-2">
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

function LatestGallery() {
  return (
    <div>
      <h3 className="text-xl font-bold">Latest Gallery</h3>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, index) => (
          <Image
            key={index}
            src=""
            alt={`Gallery ${index + 1}`}
            className="h-full w-full object-cover"
          />
        ))}
      </div>
    </div>
  );
}

function TravelList() {
  const destinations = ["Bahamas", "Cambodia", "Dominica", "Egypt", "Germany"];
  return (
    <div>
      <h3 className="text-xl font-bold">Travel & Trip</h3>
      <ul className="mt-4 space-y-2">
        {destinations.map((destination, index) => (
          <li key={index}>{destination}</li>
        ))}
      </ul>
    </div>
  );
}
