export type MLTeachingStrategy =
  | "step-by-step"
  | "visual"
  | "textual"
  | "example-based"
  | "socratic";

export interface StrategyMeta {
  key: MLTeachingStrategy;
  title: string;
  badgeLabel: string;
  description: string;
  uiMode: "steps" | "visual" | "example" | "simple" | "tutor";
  iconName: string;
}

export const STRATEGY_DEFINITIONS: Record<MLTeachingStrategy, StrategyMeta> = {
  "step-by-step": {
    key: "step-by-step",
    title: "Step-by-Step Breakdown",
    badgeLabel: "Step-by-step",
    description: "Breaking this concept down into clear, numbered sequential steps.",
    uiMode: "steps",
    iconName: "Sparkles",
  },
  visual: {
    key: "visual",
    title: "Visual & Interactive Exploration",
    badgeLabel: "Visual Diagram",
    description: "Exploring this concept through dynamic models, flows, and interactive visual diagrams.",
    uiMode: "visual",
    iconName: "Eye",
  },
  textual: {
    key: "textual",
    title: "Direct Structured Explanation",
    badgeLabel: "Clear Explanation",
    description: "Explaining the core principles directly in clear, simple terms.",
    uiMode: "simple",
    iconName: "BookOpen",
  },
  "example-based": {
    key: "example-based",
    title: "Real-World Worked Example",
    badgeLabel: "Worked Example",
    description: "Leading with relatable everyday examples before formal rules.",
    uiMode: "example",
    iconName: "Lightbulb",
  },
  socratic: {
    key: "socratic",
    title: "Guided Socratic Discovery",
    badgeLabel: "Guided Questions",
    description: "Guiding you step-by-step with thoughtful questions to help you arrive at the answer.",
    uiMode: "tutor",
    iconName: "Bot",
  },
};

export function mapUIModeToStrategy(mode?: string | null): MLTeachingStrategy {
  if (!mode) return "step-by-step";
  const m = mode.toLowerCase();
  if (m === "steps" || m === "step-by-step") return "step-by-step";
  if (m === "visual" || m === "diagram") return "visual";
  if (m === "example" || m === "examples" || m === "example-based") return "example-based";
  if (m === "simple" || m === "textual" || m === "text") return "textual";
  if (m === "tutor" || m === "socratic") return "socratic";
  return "step-by-step";
}

export function mapStrategyToUIMode(
  strategy?: string | null
): "steps" | "visual" | "example" | "simple" | "tutor" {
  if (!strategy) return "steps";
  const s = strategy.toLowerCase().trim();
  if (s in STRATEGY_DEFINITIONS) {
    return STRATEGY_DEFINITIONS[s as MLTeachingStrategy].uiMode;
  }
  if (s === "visual") return "visual";
  if (s === "example-based" || s === "example") return "example";
  if (s === "textual" || s === "simple") return "simple";
  if (s === "socratic") return "tutor";
  return "steps";
}
