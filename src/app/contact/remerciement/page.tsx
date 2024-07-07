import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Remerciment() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center justify-center p-4 text-center sm:p-6 md:p-8">
      <div className="max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold">Merci pour votre message !</h1>
        <p className="mb-6">
          Nous avons bien reçu votre demande et nous vous remercions pour votre
          intérêt. Notre équipe reviendra vers vous dans les plus brefs délais
          afin de répondre à toutes vos questions et vous fournir les
          informations nécessaires.
          <br />
          En attendant, n&rsquo;hésitez pas à explorer notre site web pour
          découvrir toutes les activités et services que nous proposons.
        </p>
        <Link href="/">
          <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
            Retour à l&rsquo;accueil
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Remerciment;
