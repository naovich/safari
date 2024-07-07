import Image from "next/image";

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
    <section className="bg-blue-200 p-16">
      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((dest, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <Image
              src={dest.image.src}
              alt={dest.image.alt}
              className="h-full w-full object-cover"
              width={400}
              height={200}
            />
            <div className="absolute inset-0 flex flex-col justify-end rounded-lg bg-black bg-opacity-40 p-4">
              <h3 className="text-xl font-bold text-white">{dest.title}</h3>
              <p className="mt-2 text-white">{dest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
