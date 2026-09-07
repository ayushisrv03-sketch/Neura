import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { MultimodalSection } from "@/components/multimodal-section";
import { AdaptiveCycleSection } from "@/components/adaptive-cycle-section";
import { ToolsSection } from "@/components/tools-section";
import { CtaBanner } from "@/components/cta-banner";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <MultimodalSection />
        <AdaptiveCycleSection />
        <ToolsSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
