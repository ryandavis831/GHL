import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Transformations from "@/components/Transformations";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Transformations />
        <Gallery />
        <WhyChooseUs />
        <Reviews />
        <About />
        <QuoteForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
