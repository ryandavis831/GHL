import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MeetSummer from "@/components/MeetSummer";
import TrustGrid from "@/components/TrustGrid";
import ServicesGrid from "@/components/ServicesGrid";
import PetFriendly from "@/components/PetFriendly";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import CommercialSection from "@/components/CommercialSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import Reviews from "@/components/Reviews";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import SchemaOrg from "@/components/SchemaOrg";

export default function Page() {
  return (
    <>
      <SchemaOrg />
      <Header />
      <main>
        <Hero />
        <MeetSummer />
        <TrustGrid />
        <ServicesGrid />
        <PetFriendly />
        <BeforeAfterGallery />
        <CommercialSection />
        <ServiceAreaSection />
        <Reviews />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
