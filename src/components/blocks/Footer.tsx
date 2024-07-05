import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/assets/icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-16 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <ContactInfo />
        <CategoryList />
        <LatestGallery />
        <TravelList />
      </div>
      <div className="mt-8 text-center text-sm">
        <p>© 2024 Go Trip. All rights reserved | Designed by W3layouts</p>
      </div>
    </footer>
  );
}

function ContactInfo() {
  return (
    <div>
      <h3 className="text-xl font-bold">Contact Us</h3>
      <p className="mt-4">
        California, #32841 block, #221DRS 75 West Rock, Maple Building, UK
      </p>
      <p className="mt-2">+(21)-255-999-8888</p>
      <p className="mt-2">Exterior-mail@support.com</p>
      <div className="mt-4 flex space-x-4">
        <FacebookIcon className="h-5 w-5" />
        <InstagramIcon className="h-5 w-5" />
        <LinkedinIcon className="h-5 w-5" />
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
