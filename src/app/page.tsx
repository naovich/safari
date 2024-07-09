// src/app/page.tsx
import Hero from "@/components/blocks/Hero";
import Destination from "@/components/blocks/Destinations";
import Activity from "@/components/blocks/Activity";
import About from "@/components/blocks/About";
import { AccueilResponse, getAccueil } from "./api/graphQL";
// Assurez-vous que l'interface est correctement exportée

export default async function App() {
  let accueilData: AccueilResponse | null = null;
  try {
    accueilData = await getAccueil();
  } catch (error) {
    console.error("Error fetching accueil data:", error);
  }

  if (!accueilData) {
    return <div>Erreur lors du chargement des données</div>;
  }

  return (
    <div className="w-full">
      <Hero
        nom={accueilData.accueil.heroHaut.compagnie}
        title={accueilData.accueil.heroHaut.titre}
        description={accueilData.accueil.heroHaut.sousTitre}
        buttonText="Réservez votre voyage"
        image="/images/plage-midi-cocotiers-upscale-crop.jpg"
      />
      <About />+
      <Destination />
      <Activity />
      <Hero
        nom={accueilData.accueil.heroBas.compagnie}
        title={accueilData.accueil.heroBas.titre}
        description={accueilData.accueil.heroBas.sousTitre}
        buttonText="Réservez votre voyage"
        image="/images/plage-coucher-soleil.jpg"
      />
    </div>
  );
}

/*import Hero from "@/components/blocks/Hero";
import Destination from "@/components/blocks/Destinations";
import Activity from "@/components/blocks/Activity";
import About from "@/components/blocks/About";
import { getAccueil } from "./api/graphQL";

export default function App() {

  return (
    <div className="w-full">
      <Hero
        title="Explorez les destinations de vos rêves"
        description="Découvrez des lieux extraordinaires et créez des souvenirs inoubliables avec Safarii."
        buttonText="Réservez votre voyage"
        image="/images/plage-midi-cocotiers-upscale-crop.jpg"
      />
      <About />
      <Destination />
      <Activity />
      <Hero
        title="Nous sommes là à chaque étape de votre voyage"
        description="Profitez d'un accompagnement personnalisé tout au long de votre aventure avec SAFARII NJEMA. Nous nous occupons de tout pour que vous puissiez vous détendre et profiter pleinement."
        buttonText="Réservez votre voyage"
        image="/images/plage-coucher-soleil.jpg"
      />
    </div>
  );
}
*/
