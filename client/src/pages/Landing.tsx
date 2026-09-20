import { AdaptiveCycleSection } from "@/components/landing/adaptive-cycle-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { HeroSection } from "@/components/landing/hero-section";
import { MultimodalSection } from "@/components/landing/multimodal-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { ToolsSection } from "@/components/landing/tools-section";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-body text-slate-800 antialiased">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <MultimodalSection />
        <AdaptiveCycleSection />
        <ToolsSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
