import { dancingFont } from "@/assets/fonts";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

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
    <section className="relative h-[600px] w-full">
      {image && (
        <Image
          src={image}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          priority
          className="z-[-1]"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-2 text-center text-white">
        <h1
          className={`${dancingFont.className} pb-6 text-center text-5xl font-bold md:text-7xl`}
        >
          Safarii Njéma
        </h1>
        <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl">{description}</p>
        <Button asChild className="mt-6 bg-blue-500 hover:bg-blue-600">
          <Link href="/devis">{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
