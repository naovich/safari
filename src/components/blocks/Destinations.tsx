import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Destination() {
  const destinations = [
    {
      title: "Balade en mer avec les dauphins",
      description:
        "Partez à la rencontre des dauphins dans leur habitat naturel.",
      image: {
        src: "/images/dauphins.jpg",
        alt: "Balade avec les dauphins",
      },
    },
    {
      title: "Ascension en groupe du Karthala",
      description: "Découvrez le plus grand volcan actif des Comores.",
      image: {
        src: "/images/cratere.jpg",
        alt: "Ascension du Karthala",
      },
    },
    {
      title: "Observation des tortues marines",
      description:
        "Venez observer les tortues marines sur la plage de sable blanc.",
      image: {
        src: "/images/tortue-plage.jpg",
        alt: "Observation des tortues marines",
      },
    },
    {
      title: "Découvrez les belles plages de sable blanc",
      description:
        "Profitez du soleil et de la mer sur les plages paradisiaques des Comores.",
      image: {
        src: "/images/plage-verdure-mer.jpg",
        alt: "Découvrez les belles plages de sable blanc",
      },
    },
  ];

  return (
    <section className="w-full bg-blue-200 px-4 py-16">
      <div className="container mx-auto grid w-full grid-cols-1 gap-4 px-2 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((dest, index) => (
          <Card key={index} className="rounded-lg shadow-lg">
            <div className="overflow-hidden rounded-t-lg">
              <Image
                src={dest.image.src}
                alt={dest.image.alt}
                className="h-48 w-full object-cover"
                width={400}
                height={200}
              />
            </div>
            <CardContent className="p-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {dest.title}
                </CardTitle>
              </CardHeader>
              <p className="mt-2">{dest.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
