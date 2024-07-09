import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface Items {
  id: string;
  titre: string;
  description?: string; // ajout de description si nécessaire
  image: {
    url: string;
  };
}

export interface DestinationProps {
  Items: Items[];
}
export default function Destination({ Items }: DestinationProps) {
  return (
    <section className="w-full bg-blue-200 px-4 py-16">
      <div className="container mx-auto grid w-full grid-cols-1 gap-4 px-2 md:grid-cols-2 lg:grid-cols-4">
        {Items.map((item, index) => (
          <Card key={index} className="rounded-lg shadow-lg">
            <div className="overflow-hidden rounded-t-lg">
              <Image
                src={item.image.url}
                alt={item.titre}
                className="h-48 w-full object-cover"
                width={400}
                height={200}
              />
            </div>
            <CardContent className="p-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  {item.titre}
                </CardTitle>
              </CardHeader>
              <p className="mt-2">
                {item.description || "Pas de description disponible."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
