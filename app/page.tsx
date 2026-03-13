import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MethodSection from "@/components/MethodSection";
import ServicesSection from "@/components/ServicesSection";
import StudioSection from "@/components/StudioSection";
import SoldiersSection from "@/components/SoldiersSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import LeadMagnet from "@/components/LeadMagnet";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MethodSection />
      <ServicesSection />
      <StudioSection />
      <SoldiersSection />
      <ProcessSection />
      <ContactSection />
      <LeadMagnet />
      <Footer />
    </>
  );
}
