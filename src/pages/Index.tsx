import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ScrollingChips from "@/components/landing/ScrollingChips";
import StatsRow from "@/components/landing/StatsRow";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ScrollingChips />
        <StatsRow />
        <HowItWorks />
        <UseCases />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
