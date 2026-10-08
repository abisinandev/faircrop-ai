import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/nav";
import { HeroSection } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { AIAgentSection } from "@/components/landing/ai-agent-section";
import { FarmerSection } from "@/components/landing/farmer-section";
import { BuyerSection } from "@/components/landing/buyer-section";
import { TrustSection } from "@/components/landing/trust-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "FairCrop — Connect Farmers Directly With Buyers",
  description:
    "FairCrop is an agricultural marketplace that connects farmers directly with verified buyers. Understand market pricing, evaluate offers, and negotiate with the help of an intelligent AI representative.",
  openGraph: {
    title: "FairCrop — Connect Farmers Directly With Buyers",
    description:
      "An agricultural marketplace with AI-assisted negotiation. Direct buyer access for farmers. Direct supply access for buyers.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <AIAgentSection />
        <FarmerSection />
        <BuyerSection />
        <TrustSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </>
  );
}
