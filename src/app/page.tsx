import Hero from "@/components/blocks/Hero";
import Booking from "@/components/blocks/Booking";
import Destination from "@/components/blocks/Destinations";
import Activity from "@/components/blocks/Activity";

export default function App() {
  return (
    <div className="w-full">
      <Hero
        title="Explorez les destinations de vos rêves"
        description="Découvrez des lieux extraordinaires et créez des souvenirs inoubliables avec SAFARI, votre agence de voyage ultime."
        buttonText="Réservez votre voyage"
        image="images/plage-midi-cocotiers-upscale-crop.jpg"
      />
      <Booking />
      <Destination />
      <Activity />
      <Hero
        title="Nous sommes là à chaque étape de votre voyage"
        description="Profitez d'un accompagnement personnalisé tout au long de votre aventure avec SAFARI. Nous nous occupons de tout pour que vous puissiez vous détendre et profiter pleinement."
        buttonText="Réservez votre voyage"
        image="images/plage-coucher-soleil.jpg"
      />
    </div>
  );
}
