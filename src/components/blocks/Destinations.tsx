import Image from "next/image";

export default function Destination() {
  const destinations = [
    {
      title: "The City of Lights",
      description: "Mollitia placeat modi voluptatum corporis.",
      image: {
        src: "/images/dauphins.jpg",
        alt: "The City of Lights",
      },
    },
    {
      title: "French-Polynesia",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: {
        src: "/images/cratere.jpg",
        alt: "French-Polynesia",
      },
    },
    {
      title: "Buckingham Palace",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: {
        src: "/images/tortue-plage.jpg",
        alt: "Buckingham Palace",
      },
    },
    {
      title: "Australia Nature's",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: {
        src: "/images/plage-verdure-mer.jpg",
        alt: "Australia Nature's",
      },
    },
  ];

  return (
    <section className="bg-blue-200 p-16">
      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((dest, index) => (
          <div key={index} className="relative">
            <Image
              src={dest.image.src}
              alt={dest.image.alt}
              className="h-full w-full object-cover"
              width={400}
              height={200}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-4">
              <h3 className="text-xl font-bold text-white">{dest.title}</h3>
              <p className="mt-2 text-white">{dest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
