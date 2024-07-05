import { dancingFont } from "@/assets/fonts";
import { Button } from "../ui/button";

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  image?: string;
}

export default function Hero({
  title,
  description,
  buttonText,
  image,
}: HeroProps) {
  return (
    <section
      className="relative h-[600px] w-full bg-cover bg-bottom"
      style={{
        backgroundImage: `url(${image}?height=600&width=1920)`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-center text-white">
        <h1
          className={`${dancingFont.className} pb-6 text-center text-7xl font-bold`}
        >
          Safari njema
        </h1>
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="mt-4 max-w-xl">{description}</p>
        <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
