import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import MeetSummer from "@/components/MeetSummer";
import TrustGrid from "@/components/TrustGrid";
import ServicesGrid from "@/components/ServicesGrid";
import PetFriendly from "@/components/PetFriendly";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import Reviews from "@/components/Reviews";
import FollowFacebook from "@/components/FollowFacebook";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import SchemaOrg from "@/components/SchemaOrg";

export default function Page() {
  return (
    <>
      <SchemaOrg />
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <MeetSummer />
        <TrustGrid />
        <ServicesGrid />
        <PetFriendly />
        <BeforeAfterGallery />
        <ServiceAreaSection />
        <Reviews />
        <FollowFacebook />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
