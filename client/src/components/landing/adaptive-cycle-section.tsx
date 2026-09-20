import {
  UserRound,
  BookOpen,
  Puzzle,
  Ear,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    tag: "01 • PROFILE",
    title: "Student",
    description:
      "Unique strengths, attention rhythms & individual sensory preferences.",
    footer: "Inputs",
    icon: UserRound,
    tone: "light" as const,
  },
  {
    tag: "02 • ABSORB",
    title: "Learn",
    description:
      "First-exposure concept presented via chosen primary sensory format.",
    footer: "Explore",
    icon: BookOpen,
    tone: "pale" as const,
  },
  {
    tag: "03 • INTERACT",
    title: "Practice",
    description:
      "Low-anxiety interactive tasks with clean balance and safe scaffolding.",
    footer: "Apply",
    icon: Puzzle,
    tone: "light" as const,
  },
  {
    tag: "04 • LISTEN",
    title: "Analyze",
    description:
      "Real-time detection of hesitation, engagement & cognitive comfort.",
    footer: "Diagnose need",
    icon: Ear,
    tone: "light" as const,
  },
  {
    tag: "05 • PIVOT",
    title: "Adapt",
    description:
      "On-the-fly strategy adjustment: analogies, chunking, or visuals.",
    footer: "Refine",
    icon: SlidersHorizontal,
    tone: "amber" as const,
  },
  {
    tag: "06 • MASTERY",
    title: "Personalized",
    description:
      "Lifelong confidence without frustration or punitive countdowns.",
    footer: "Sustained loop ↻",
    icon: Sparkles,
    tone: "dark" as const,
  },
];

const iconBg: Record<string, string> = {
  light: "bg-sky-100 text-sky-700",
  pale: "bg-sky-50 text-sky-700",
  amber: "bg-amber-100 text-amber-700",
  dark: "bg-white/20 text-white",
};

export function AdaptiveCycleSection() {
  return (
    <section
      id="how-it-works"
      className="bg-sky-50 px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex max-w-xl flex-col items-center gap-2 text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
            Continuous Cognitive Alignment
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            The Neura Adaptive Cycle
          </h2>
          <p className="font-body text-base text-slate-600">
            A calm feedback loop that listens to comfort and hesitation
            rather than imposing arbitrary grading speed.
          </p>
        </div>

        <div className="relative w-full">
          <div
            aria-hidden
            className="absolute left-8 right-8 top-[70px] hidden h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-700 lg:block"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step) => {
              const Icon = step.icon;
              const isDark = step.tone === "dark";
              return (
                <div
                  key={step.title}
                  className={`flex flex-col justify-between rounded-2xl border p-4 shadow-sm ${
                    isDark
                      ? "border-sky-500 bg-gradient-to-br from-sky-700 to-sky-900 text-white shadow-lg"
                      : "border-sky-100 bg-white"
                  }`}
                >
                  <div>
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl ${iconBg[step.tone]}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <p
                      className={`mt-2 font-heading text-[11px] font-bold uppercase tracking-wide ${
                        isDark ? "text-sky-200" : "text-sky-600"
                      } ${step.tone === "amber" ? "!text-amber-700" : ""}`}
                    >
                      {step.tag}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 font-body text-[13px] leading-snug ${
                        isDark ? "text-white/90" : "text-slate-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                  <p
                    className={`mt-4 font-heading text-xs font-medium ${
                      isDark
                        ? "text-sky-200"
                        : step.tone === "amber"
                          ? "text-amber-700"
                          : "text-sky-600"
                    }`}
                  >
                    {step.footer} {step.footer !== "Sustained loop ↻" && "›"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
