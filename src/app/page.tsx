import Hero from "@/components/Hero";
import HeroLogoStrip from "@/components/HeroLogoStrip";
import ServicesPreview from "@/components/ServicesPreview";
import AboutTeam from "@/components/AboutTeam";
import ClientsHighlight from "@/components/ClientsHighlight";
import ClientsSlider from "@/components/ClientsSlider";
import ServiceAreasPreview from "@/components/ServiceAreasPreview";
import QuoteForm from "@/components/QuoteForm";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroLogoStrip />
      <ServicesPreview />
      <ClientsSlider />
      <AboutTeam />
      <ClientsHighlight />
      <ServiceAreasPreview />
      <QuoteForm />
      <FinalCTA />
    </>
  );
}
