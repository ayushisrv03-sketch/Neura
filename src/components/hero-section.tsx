import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles, Check } from "lucide-react";

const trustPoints = [
  "Untimed & Self-Paced",
  "Zero Clinical Diagnoses Required",
  "Multimodal by Default",
];

const floatingCards = [
  {
    eyebrow: "ADAPTIVE HELP",
    value: "4 levels",
    accent: "bg-sky-200",
    className: "left-1/2 -translate-x-[380px] rotate-[-12deg] top-6",
  },
  {
    eyebrow: "INSIGHTS",
    value: "24/7",
    caption: "zero pressure",
    className: "left-1/2 translate-x-[172px] rotate-[12deg] top-0",
  },
  {
    eyebrow: "SMART SIGNALS",
    value: "92%",
    caption: "comfort index",
    className: "left-1/2 -translate-x-[196px] rotate-[-6deg] top-4",
  },
  {
    eyebrow: "NEURA ENGINE",
    value: "Learn\nyour way",
    accent: "bg-sky-300",
    className: "left-1/2 translate-x-[8px] rotate-[6deg] top-2",
  },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-b from-white via-sky-50/60 to-sky-100 px-4 sm:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-181px] h-[544px] w-[1088px] -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-12 sm:px-8">
        <div className="flex max-w-3xl flex-col items-center pb-8 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-sm font-medium text-sky-800">
            <Sparkles className="size-4" aria-hidden />
            Adaptive Education for Neurodivergent Minds
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 drop-shadow-sm sm:text-6xl">
            Learning that adapts to you.
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg text-slate-600 sm:text-xl">
            An AI-powered learning environment that personalizes explanation
            styles, pacing, and visual scaffolding in real-time. No timers,
            no red marks, no cognitive overwhelm.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#start"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 font-heading text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-transform hover:scale-[1.02]"
            >
              Start Learning
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-8 py-3.5 font-heading text-base font-semibold text-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <PlayCircle className="size-5 text-sky-600" aria-hidden />
              How Neura Works
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-heading text-sm font-medium text-slate-600">
            {trustPoints.map((point, i) => (
              <li key={point} className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-sky-600" aria-hidden />
                  {point}
                </span>
                {i < trustPoints.length - 1 && (
                  <span className="text-slate-300">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating stat cards */}
        <div className="relative hidden h-56 w-full max-w-3xl md:block">
          {floatingCards.map((card) => (
            <div
              key={card.eyebrow}
              className={`absolute w-44 rounded-2xl border border-sky-100 bg-white p-4 shadow-2xl ${card.className}`}
            >
              <p className="font-heading text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {card.eyebrow}
              </p>
              <p className="mt-4 whitespace-pre-line font-heading text-2xl font-bold leading-tight text-slate-900">
                {card.value}
              </p>
              {card.caption && (
                <p className="mt-1 font-body text-xs text-slate-500">
                  {card.caption}
                </p>
              )}
              {card.accent && (
                <div
                  className={`mt-4 h-1.5 w-12 rounded-full ${card.accent}`}
                />
              )}
            </div>
          ))}
          {/* Center dark spotlight card */}
          <div className="absolute left-1/2 top-2 w-56 -translate-x-1/2 rounded-2xl border border-slate-700/60 bg-slate-950 p-5 shadow-2xl">
            <div className="flex items-center gap-1.5">
              <span className="flex size-5 items-center justify-center rounded-full bg-sky-400 text-[11px] text-slate-900">
                ✦
              </span>
              <span className="font-heading text-[11px] font-bold uppercase tracking-widest text-slate-300">
                Neura
              </span>
            </div>
            <p className="mt-4 font-heading text-xl font-bold leading-snug text-white">
              Visual
              <br />
              explanation
            </p>
            <p className="mt-4 flex items-center gap-1 font-body text-xs text-sky-300">
              <Sparkles className="size-3.5" aria-hidden />
              Active mode
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
