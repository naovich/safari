import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Remerciment() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center justify-center p-4 text-center sm:p-6 md:p-8">
      <div className="max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold">
          Merci pour votre réservation
        </h2>
        <p className="mb-4">
          Nous vous remercions d&apos;avoir choisi safari njéma. Votre
          réservation a été reçue et est en cours de traitement.
        </p>
        <p className="mb-4">
          Si vous avez des questions ou des préoccupations, n&apos;hésitez pas à
          nous contacter. Notre équipe est là pour vous aider et s&apos;assurer
          que vous avez la meilleure expérience possible.
        </p>
        <p className="mb-4">
          En attendant, vous pouvez retourner à notre page d&apos;accueil pour
          explorer plus de services et d&apos;offres.
        </p>
        <Link href="/">
          <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
            Accueil
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Remerciment;
