import { ReactNode } from "react";
import AboutSection from "./AboutSection";
import CtaSection from "./CtaSection";
import FeatureSection from "./Feature";
import FooterSection from "./FooterSection";
import Header from "./Header";
import HeroSection from "./Hero";
import HowItsWorkSection from "./HowItsWorkSection";
import './LandingPage.module.css';
import PricingSection from "./PricingSection";
import TestimonialSection from "./TestimonialSection";

interface LandingPageProps {
  children: ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
  return (
    <>
      <div className="bg-gray-50">
        {children}
        <Header></Header>
        <HeroSection></HeroSection>
        <FeatureSection></FeatureSection>
        <AboutSection></AboutSection>
        <HowItsWorkSection></HowItsWorkSection>
        <TestimonialSection></TestimonialSection>
        <PricingSection></PricingSection>
        <CtaSection></CtaSection>
        <FooterSection></FooterSection>
      </div>
    </>
  );
}

export default LandingPage;
