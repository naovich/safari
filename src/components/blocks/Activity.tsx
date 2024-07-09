import Image from "next/image";
export interface Items {
  id: string;
  titre: string;
  description?: string;
  image: {
    url: string;
    alt?: string;
  };
}

export interface DestinationProps {
  titre: string;
  description: string;
  Items: Items[];
}
export default function Activity({
  titre,
  description,
  Items,
}: DestinationProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">{titre}</h2>
        <p className="mx-auto mt-4 max-w-2xl">{description}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {Items.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg bg-sky-100">
              <Image
                src={item.image.url}
                alt={item.image.alt ?? ""}
                className="h-48 w-full rounded-t-lg object-cover"
                height={200}
                width={400}
              />
              <div className="p-4">
                <h3 className="text-center text-xl font-bold">{item.titre}</h3>
                <p className="mt-2 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
