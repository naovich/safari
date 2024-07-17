import Hero from "@/components/blocks/Hero";
import Destination from "@/components/blocks/Destinations";
import Activity from "@/components/blocks/Activity";
import About from "@/components/blocks/About";
import { AccueilResponse, getAccueil } from "./api/graphQL";

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
        buttonText={accueilData.accueil.heroHaut.liens.label}
        image={accueilData.accueil.heroHaut.image}
      />
      <About
        title={accueilData.accueil.presentation.titre}
        description={accueilData.accueil.presentation.description}
      />
      <Destination Items={accueilData.accueil.lieu} />
      <Activity
        titre={accueilData.accueil.titreActivite}
        description={accueilData.accueil.descriptionActivite}
        Items={accueilData.accueil.activite}
      />
      <Hero
        nom={accueilData.accueil.heroBas.compagnie}
        title={accueilData.accueil.heroBas.titre}
        description={accueilData.accueil.heroBas.sousTitre}
        buttonText={accueilData.accueil.heroBas.liens.label}
        image={accueilData.accueil.heroBas.image}
      />
    </div>
  );
}
