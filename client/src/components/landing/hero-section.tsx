import { Link } from "wouter";
import { ArrowRight, PlayCircle, Sparkles, Check } from "lucide-react";
import type { CSSProperties } from "react";

const trustPoints = [
  "Untimed & Self-Paced",
  "Zero Clinical Diagnoses Required",
  "Multimodal by Default",
];

const floatingCards: Array<{
  eyebrow: string;
  value: string;
  caption?: string;
  accent?: boolean;
  align?: "left" | "right";
  style: CSSProperties;
}> = [
    {
      eyebrow: "ADAPTIVE HELP",
      value: "4 levels",
      accent: true,
      style: {
        left: "calc(50% - 308px)",
        top: "40px",
        transform: "translateX(-50%) rotate(-12deg)",
        zIndex: 10,
      },
    },
    {
      eyebrow: "SMART SIGNALS",
      value: "92%",
      caption: "comfort index",
      style: {
        left: "calc(50% - 156px)",
        top: "14px",
        transform: "translateX(-50%) rotate(-5deg)",
        zIndex: 20,
      },
    },
    {
      eyebrow: "NEURA ENGINE",
      value: "Learn\nyour way",
      accent: true,
      align: "right",
      style: {
        left: "calc(50% + 156px)",
        top: "14px",
        transform: "translateX(-50%) rotate(5deg)",
        zIndex: 20,
      },
    },
    {
      eyebrow: "INSIGHTS",
      value: "24/7",
      caption: "zero pressure",
      align: "right",
      style: {
        left: "calc(50% + 308px)",
        top: "40px",
        transform: "translateX(-50%) rotate(12deg)",
        zIndex: 10,
      },
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
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 font-heading text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition-transform hover:scale-[1.02]"
            >
              Start Learning
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-8 py-3.5 font-heading text-base font-semibold text-slate-800 shadow-sm transition-transform hover:scale-[1.02]"
            >
              <PlayCircle className="size-5 text-sky-600" aria-hidden />
              How Neura Works
            </a>
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
        <div className="relative hidden h-56 w-full max-w-4xl select-none md:block scale-[0.9] lg:scale-100 origin-top">
          {floatingCards.map((card) => {
            const isRight = card.align === "right";
            return (
              <div
                key={card.eyebrow}
                style={card.style}
                className="absolute flex h-[175px] w-[208px] flex-col justify-between rounded-[24px] border border-sky-100/70 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.04)]"
              >
                <p
                  className={`w-full font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400 ${isRight ? "text-right" : "text-left"
                    }`}
                >
                  {card.eyebrow}
                </p>

                <div className={`my-auto w-full ${isRight ? "text-right" : "text-left"}`}>
                  {card.eyebrow === "SMART SIGNALS" || card.eyebrow === "INSIGHTS" ? (
                    <p className="font-heading text-[38px] font-extrabold tracking-tight text-slate-900">
                      {card.value}
                    </p>
                  ) : card.eyebrow === "NEURA ENGINE" ? (
                    <p className="inline-block text-left font-heading text-[24px] font-bold leading-tight tracking-tight text-slate-900">
                      <span className="block">Learn</span>
                      <span className="block">your way</span>
                    </p>
                  ) : (
                    <p className="font-heading text-[26px] font-bold tracking-tight text-slate-900">
                      {card.value}
                    </p>
                  )}
                </div>

                <div
                  className={`flex h-5 w-full items-center ${isRight ? "justify-end text-right" : "justify-start text-left"
                    }`}
                >
                  {card.caption ? (
                    <p className="font-body text-xs font-normal text-slate-400">
                      {card.caption}
                    </p>
                  ) : card.accent ? (
                    <div
                      className={`h-1.5 w-12 rounded-full bg-sky-300/90 ${isRight ? "-translate-x-14" : ""
                        }`}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}

          {/* Center dark spotlight card */}
          <div
            style={{
              left: "50%",
              top: "0px",
              transform: "translateX(-50%)",
              zIndex: 30,
            }}
            className="absolute flex h-[205px] w-[234px] flex-col justify-between rounded-[26px] border border-slate-800/80 bg-[#040812] p-5 shadow-[0_22px_45px_rgba(0,0,0,0.5),0_8px_18px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-4 items-center justify-center rounded-full bg-sky-400 shadow-sm">
                <div className="h-3 w-1 rounded-full bg-[#040812]" />
              </div>

              <span className="font-heading text-[11px] font-bold tracking-[0.2em] text-white">
                NEURA
              </span>
            </div>

            <p className="my-auto font-heading text-[27px] font-bold leading-[1.14] tracking-tight text-white">
              Visual
              <br />
              explanation
            </p>

            <div className="flex items-center gap-2 font-body text-xs font-medium text-sky-300">
              <Sparkles className="size-3.5 text-sky-400" aria-hidden />
              <span>Active mode</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
