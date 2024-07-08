import Hero from "@/components/blocks/Hero";
import Destination from "@/components/blocks/Destinations";
import Activity from "@/components/blocks/Activity";
import About from "@/components/blocks/About";

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
