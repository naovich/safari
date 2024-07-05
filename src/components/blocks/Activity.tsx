import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export default function Activity() {
  const destinations = [
    {
      name: "Voyage avec les dauphins",
      description: "Venez découvrir les dauphins dans leur milieu naturel.",
      hours: 3,
      image: {
        src: "/images/dauphins.jpg",
        alt: "Aaler à la mer",
      },
    },
    {
      name: "Prendre de la hauteur",
      description:
        "Partez à l'aventure et montez jusqu'au sommet du Khartala, un volcan actif.",
      hours: 7,
      image: {
        src: "/images/cratere.jpg",
        alt: "Monter pour voir le Khartala",
      },
    },
    {
      name: "Observer les makis",
      description: "Observez les makis, des lémuriens endémiques de l'île.",
      hours: 4,
      image: {
        src: "https://images.unsplash.com/photo-1656163157884-cb525d0ca62c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Observer les makis",
      },
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Top Travelling Destinations</h2>
        <p className="mx-auto mt-4 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic fuga sit
          illo modi aut aspernatur tempore laboriosam saepe dolores eveniet.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {destinations.map((dest, index) => (
            <Card key={index} className="bg-sky-100">
              <Image
                src={dest.image.src}
                alt={dest.name}
                className="h-48 w-full object-cover"
                height={200}
                width={400}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-bold">{dest.name}</h3>
                <p className="mt-2 text-sm">{dest.hours} heures</p>
                <p className="mt-2 text-sm">{dest.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
