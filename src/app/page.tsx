import { HeroSection } from "@/components/home/HeroSection";
import { TrendingSection } from "@/components/home/TrendingSection";
import { AISection } from "@/components/home/AISection";
import { DuftDesMonats } from "@/components/home/DuftDesMonats";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TrendingSection />
      <DuftDesMonats />
      <AISection />
      <CTASection />
    </div>
  );
}
