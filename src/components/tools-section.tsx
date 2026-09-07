import { Anchor, BadgeCheck, MessageCircleHeart, MessageSquareText } from "lucide-react";

const tools = [
  {
    icon: Anchor,
    iconBg: "bg-amber-100 text-amber-700",
    tagBg: "bg-amber-100 text-amber-800",
    tag: "Zero Penalty Safety",
    title: `"I'm Stuck" Harbor`,
    description:
      "An anxiety-free escape route offering instant analogical breakdowns, hint ladders, or sensory breathers whenever comprehension hits a temporary roadblock.",
    footIcon: BadgeCheck,
    footNote: "Never docks points or resets your progression streak",
  },
  {
    icon: MessageCircleHeart,
    iconBg: "bg-sky-100 text-sky-700",
    tagBg: "bg-sky-100 text-sky-800",
    tag: "Compassionate AI",
    title: "Neura Guide Companion",
    description:
      "A non-judgmental AI thinking partner that scaffolds understanding through Socratic questioning rather than evaluating, praising effort and curious detours.",
    footIcon: MessageSquareText,
    footNote: "Gentle micro-prompts with zero corrective shame",
  },
];

export function ToolsSection() {
  return (
    <section
      id="features"
      className="border-t border-sky-100/60 bg-sky-50 px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
            Thoughtful Architecture
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Tools Designed for Peace of Mind
          </h2>
          <p className="font-body text-base text-slate-600">
            Built from the ground up to reduce cognitive friction, eliminate
            performance anxiety, and foster restorative independence.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const FootIcon = tool.footIcon;
            return (
              <div
                key={tool.title}
                className="flex flex-col justify-between rounded-2xl border border-sky-100 bg-white p-8 shadow-sm"
              >
                <div>
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${tool.iconBg}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span
                    className={`mt-4 inline-block rounded-full px-2.5 py-0.5 font-heading text-xs font-semibold ${tool.tagBg}`}
                  >
                    {tool.tag}
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-semibold text-slate-900">
                    {tool.title}
                  </h3>
                  <p className="mt-3 font-body text-base text-slate-600">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 border-t border-sky-100 pt-4">
                  <FootIcon className="size-5 text-sky-600" />
                  <span className="font-heading text-xs font-semibold text-sky-600">
                    {tool.footNote}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
