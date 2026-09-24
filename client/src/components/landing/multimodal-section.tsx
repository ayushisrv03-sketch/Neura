"use client";

import { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  List,
  Lightbulb,
  Ear,
  Repeat2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sun,
  Droplets,
  Wind,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  Volume2,
  Sliders,
  Eye,
  Layers,
} from "lucide-react";

type ModeKey = "visual" | "steps" | "analogy" | "audio";

const modes: {
  key: ModeKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "visual", label: "Visual Models", icon: ImageIcon },
  { key: "steps", label: "Step-by-Step Logic", icon: List },
  { key: "analogy", label: "Real-World Analogy", icon: Lightbulb },
  { key: "audio", label: "Audio & Read-Aloud", icon: Ear },
];

const panels: Record<
  ModeKey,
  { badge: string; meta: string; takeawayLabel: string; takeaway: string }
> = {
  visual: {
    badge: "Interactive Dynamic Schematic",
    meta: "Concept: Photosynthesis Inputs & Outputs",
    takeawayLabel: "Visual Takeaway:",
    takeaway:
      "Sunlight photons strike chloroplast thylakoids, powering the conversion of absorbed water (H₂O) and atmospheric carbon dioxide (CO₂) into chemical glucose fuel and breathable oxygen.",
  },
  steps: {
    badge: "4-Stage Sequential Pathway",
    meta: "Concept: Biochemical Reaction Chain",
    takeawayLabel: "Step Takeaway:",
    takeaway:
      "1) Light capture excites electrons. 2) Water splitting generates protons & O₂. 3) ATP & NADPH batteries charge. 4) The Calvin cycle fixes CO₂ into glucose sugar.",
  },
  analogy: {
    badge: "The Solar Kitchen Metaphor",
    meta: "Concept: Everyday Intuition Mapping",
    takeawayLabel: "Analogy Takeaway:",
    takeaway:
      "The chloroplast acts as a master bakery kitchen: sunlight is the solar stove, water & CO₂ are raw ingredients, glucose is fresh baked bread, and oxygen is the clean aroma drifting out the window.",
  },
  audio: {
    badge: "Dyslexia-Friendly Narration",
    meta: "Concept: Calm Sensory Audio Stream",
    takeawayLabel: "Listen Takeaway:",
    takeaway:
      "Listen to a calm, paced read-aloud with an animated equalizer visualizer and highlighted sentence karaoke that reduces visual crowding.",
  },
};

export function MultimodalSection() {
  const [active, setActive] = useState<ModeKey>("visual");
  const panel = panels[active];

  return (
    <section
      id="multimodal-learning"
      className="flex flex-col items-center gap-8 px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="flex max-w-xl flex-col items-center gap-2 text-center">
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-sky-600">
          Transformative Cognition
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Multimodal Learning in Action
        </h2>
        <p className="font-body text-base text-slate-600">
          Every single concept in Neura can instantly morph across 4 foundational
          modes. Try switching below to see how Photosynthesis transforms into an
          engaging, complete visual model.
        </p>
      </div>

      {/* Mode switcher tabs */}
      <div className="flex max-w-3xl flex-wrap items-center justify-center gap-3 pt-2">
        {modes.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.03]"
                  : "bg-white text-slate-700 shadow-xs hover:bg-sky-50/80 hover:text-sky-700"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Main visualization container */}
      <div className="w-full max-w-3xl rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-100/70 pb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100/80 px-3.5 py-1 font-heading text-xs font-bold text-sky-800">
            <Sparkles className="size-3 text-sky-600" />
            {panel.badge}
          </span>
          <span className="font-heading text-xs font-semibold text-slate-500">
            {panel.meta}
          </span>
        </div>

        {/* Dynamic Visual Stage */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-sky-100/80 bg-gradient-to-b from-[#f7fcfe] to-[#edf7fa] p-4 sm:p-6 transition-all duration-300">
          {active === "visual" && <PhotosynthesisVisualInteractive />}
          {active === "steps" && <StepByStepLogicVisual />}
          {active === "analogy" && <RealWorldAnalogyVisual />}
          {active === "audio" && <AudioReadAloudVisual />}
        </div>

        {/* Takeaway footer */}
        <div className="mt-6 rounded-2xl bg-sky-50/60 p-4 border border-sky-100/60">
          <p className="font-body text-sm leading-relaxed text-slate-700">
            <span className="font-bold text-slate-900">{panel.takeawayLabel}</span>{" "}
            {panel.takeaway}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 pt-4">
          <span className="flex items-center gap-1.5 font-heading text-xs font-medium text-slate-600">
            <Repeat2 className="size-4 text-sky-600" />
            You can switch styles at any point during any active lesson.
          </span>
          <a
            href="#features"
            className="font-heading text-xs font-semibold text-sky-600 transition hover:text-sky-700 hover:underline"
          >
            Explore full multimodal curriculum →
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   1. VISUAL MODELS: Interactive Animated Photosynthesis Model
   ========================================================================= */
function PhotosynthesisVisualInteractive() {
  const [sunIntensity, setSunIntensity] = useState<"low" | "medium" | "high">("high");
  const [inspected, setInspected] = useState<string | null>(null);

  const photonSpeed = sunIntensity === "high" ? "1.5s" : sunIntensity === "medium" ? "2.5s" : "4s";
  const photonCount = sunIntensity === "high" ? 6 : sunIntensity === "medium" ? 4 : 2;

  const getInspectInfo = () => {
    switch (inspected) {
      case "sun":
        return {
          title: "☀️ Sunlight (Solar Radiation)",
          desc: "Photons carry discrete packets of energy that energize chlorophyll electrons inside leaf thylakoid membranes.",
          tag: "Input Energy",
        };
      case "water":
        return {
          title: "💧 Water (H₂O) & Soil Minerals",
          desc: "Root hairs absorb water through osmosis. Water is split (photolysis) to provide hydrogen protons and electrons, releasing O₂.",
          tag: "Liquid Input",
        };
      case "co2":
        return {
          title: "💨 Carbon Dioxide (CO₂)",
          desc: "Atmospheric CO₂ enters leaf undersides through tiny guard-cell stomata pores to supply carbon atoms for glucose assembly.",
          tag: "Atmospheric Input",
        };
      case "chloroplast":
        return {
          title: "🌿 Chloroplast & Thylakoids",
          desc: "The double-membraned organelle hosting chlorophyll grana stacks and stroma fluid, synthesizing chemical energy.",
          tag: "Reaction Engine",
        };
      case "glucose":
        return {
          title: "🍞 Glucose Sugar (C₆H₁₂O₆)",
          desc: "The primary chemical fuel synthesized by the Calvin cycle. Stored as insoluble starch in stems, roots, and fruits.",
          tag: "Primary Output",
        };
      case "oxygen":
        return {
          title: "🫧 Oxygen Gas (O₂)",
          desc: "Vital atmospheric gas released as a byproduct when water molecules are split, supporting aerobic life on Earth.",
          tag: "Vital Output",
        };
      default:
        return null;
    }
  };

  const inspect = getInspectInfo();

  return (
    <div className="flex flex-col items-center">
      {/* Simulation Controls Bar */}
      <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-slate-700 flex items-center gap-1.5">
            <Sun className="size-4 text-amber-500" />
            Solar Intensity:
          </span>
          <div className="inline-flex rounded-xl bg-white p-1 border border-sky-100 shadow-xs">
            {(["low", "medium", "high"] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSunIntensity(lvl)}
                className={`rounded-lg px-2.5 py-1 font-heading text-[11px] font-bold capitalize transition ${
                  sunIntensity === lvl
                    ? "bg-amber-400 text-slate-900 shadow-xs"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <Eye className="size-3.5 text-sky-600" />
          Click any element to inspect details
        </span>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white p-3 sm:p-5 border border-sky-100 shadow-xs">
        <svg
          viewBox="0 0 540 220"
          className="h-auto w-full select-none"
          role="img"
          aria-label="Interactive Diagram of Photosynthesis Inputs and Outputs"
        >
          <defs>
            <linearGradient id="chloroplastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="50%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
            <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Animated Sunlight Photon Beams */}
          <path
            d="M 75,55 Q 160,50 215,95"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            className="opacity-80"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="20"
              to="0"
              dur={photonSpeed}
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M 85,75 Q 160,85 210,110"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-70"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="20"
              to="0"
              dur={photonSpeed}
              repeatCount="indefinite"
            />
          </path>

          {/* Water Inflow Stream */}
          <path
            d="M 65,185 C 120,185 160,170 210,145"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="20"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* CO2 Inflow Stream */}
          <path
            d="M 270,18 C 270,50 270,70 270,85"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="3 3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="18"
              to="0"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Glucose Outflow Stream */}
          <path
            d="M 325,120 C 375,120 400,90 435,75"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="20"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Oxygen Outflow Stream */}
          <path
            d="M 325,140 C 375,140 400,165 435,165"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="20"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </path>

          {/* --- 1. Sun Node --- */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setInspected("sun")}
          >
            <circle
              cx="55"
              cy="55"
              r={sunIntensity === "high" ? 28 : sunIntensity === "medium" ? 25 : 22}
              fill="url(#sunGlow)"
              filter="url(#softGlow)"
            />
            {/* Sun Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const r1 = 30;
              const r2 = sunIntensity === "high" ? 42 : 38;
              return (
                <line
                  key={angle}
                  x1={55 + r1 * Math.cos(rad)}
                  y1={55 + r1 * Math.sin(rad)}
                  x2={55 + r2 * Math.cos(rad)}
                  y2={55 + r2 * Math.sin(rad)}
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
            <text x="55" y="59" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="800">
              SUN
            </text>
            <text x="55" y="102" textAnchor="middle" fill="#b45309" fontSize="10.5" fontWeight="700">
              Photons (Light)
            </text>
          </g>

          {/* --- 2. Water / Minerals Pill --- */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setInspected("water")}
          >
            <rect
              x="12"
              y="168"
              width="95"
              height="34"
              rx="17"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="2"
            />
            <circle cx="28" cy="185" r="7" fill="#38bdf8" />
            <text x="28" y="188" textAnchor="middle" fill="white" fontSize="9" fontWeight="900">
              💧
            </text>
            <text x="65" y="189" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="700">
              Water (H₂O)
            </text>
          </g>

          {/* --- 3. CO2 Gas Top Badge --- */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setInspected("co2")}
          >
            <rect
              x="220"
              y="8"
              width="100"
              height="28"
              rx="14"
              fill="#f1f5f9"
              stroke="#64748b"
              strokeWidth="1.8"
            />
            <text x="270" y="26" textAnchor="middle" fill="#334155" fontSize="11.5" fontWeight="700">
              CO₂ from Air
            </text>
          </g>

          {/* --- 4. Central Chloroplast Organelle --- */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setInspected("chloroplast")}
          >
            {/* Outer Chloroplast Envelope */}
            <ellipse
              cx="270"
              cy="130"
              rx="65"
              ry="46"
              fill="url(#chloroplastGrad)"
              stroke="#059669"
              strokeWidth="3"
              filter="url(#softGlow)"
            />

            {/* Inner Thylakoid Grana Discs (Stack 1) */}
            <g fill="#047857">
              <ellipse cx="245" cy="118" rx="14" ry="4" />
              <ellipse cx="245" cy="125" rx="14" ry="4" />
              <ellipse cx="245" cy="132" rx="14" ry="4" />
              <ellipse cx="245" cy="139" rx="14" ry="4" />
            </g>

            {/* Inner Thylakoid Grana Discs (Stack 2) */}
            <g fill="#047857">
              <ellipse cx="285" cy="120" rx="13" ry="4" />
              <ellipse cx="285" cy="127" rx="13" ry="4" />
              <ellipse cx="285" cy="134" rx="13" ry="4" />
            </g>

            {/* Chloroplast Label & Formula */}
            <rect x="230" y="148" width="80" height="18" rx="9" fill="#065f46" opacity="0.9" />
            <text x="270" y="161" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">
              CHLOROPLAST
            </text>
          </g>

          {/* --- 5. Glucose Output Pill --- */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setInspected("glucose")}
          >
            <rect
              x="425"
              y="58"
              width="105"
              height="36"
              rx="18"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="2"
            />
            <circle cx="442" cy="76" r="8" fill="#f59e0b" />
            <text x="442" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">
              ⚡
            </text>
            <text x="480" y="75" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="800">
              Glucose Sugar
            </text>
            <text x="480" y="86" textAnchor="middle" fill="#b45309" fontSize="9.5" fontWeight="600">
              C₆H₁₂O₆ (Fuel)
            </text>
          </g>

          {/* --- 6. Oxygen Output Pill --- */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setInspected("oxygen")}
          >
            <rect
              x="425"
              y="148"
              width="105"
              height="36"
              rx="18"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="2"
            />
            <circle cx="442" cy="166" r="8" fill="#0ea5e9" />
            <text x="442" y="170" textAnchor="middle" fill="white" fontSize="10" fontWeight="900">
              🫧
            </text>
            <text x="480" y="165" textAnchor="middle" fill="#075985" fontSize="11" fontWeight="800">
              Oxygen Gas
            </text>
            <text x="480" y="176" textAnchor="middle" fill="#0284c7" fontSize="9.5" fontWeight="600">
              6 O₂ (Breathable)
            </text>
          </g>
        </svg>

        {/* Chemical Equation Bar */}
        <div className="mt-2 flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-white">
          <span className="font-heading text-xs font-bold tracking-wide text-emerald-400">
            6 CO₂ <span className="text-slate-400">+</span> 6 H₂O <span className="text-slate-400">+</span> Light Energy{" "}
            <span className="text-amber-400">→</span> C₆H₁₂O₆ <span className="text-slate-400">+</span> 6 O₂
          </span>
        </div>
      </div>

      {/* Dynamic Inspector Box */}
      {inspect && (
        <div className="mt-4 w-full max-w-xl rounded-xl border border-sky-200 bg-white p-3.5 shadow-sm transition-all animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xs font-bold text-slate-900">{inspect.title}</span>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800">
              {inspect.tag}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">{inspect.desc}</p>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   2. STEP-BY-STEP LOGIC: 4-Stage Reaction Pipeline Visualizer
   ========================================================================= */
function StepByStepLogicVisual() {
  const [currentStep, setCurrentStep] = useState(0);

  const stepsData = [
    {
      step: 1,
      badge: "Stage 1: Light Absorption",
      title: "Chlorophyll Traps Solar Photons",
      summary:
        "Photons of sunlight hit thylakoid membranes inside the chloroplast. Pigment electrons are energized into high-energy states.",
      formula: "Photons (Light) + Chlorophyll → Excited Electrons (e⁻)",
      location: "Thylakoid Membrane",
      icon: Sun,
      color: "amber",
      inputs: ["Sunlight (hν)", "Chlorophyll"],
      outputs: ["High-energy e⁻"],
    },
    {
      step: 2,
      badge: "Stage 2: Photolysis",
      title: "Water Molecules Are Split",
      summary:
        "Enzymes split absorbed H₂O molecules to replace excited electrons. Oxygen gas is released as a vital byproduct into the air.",
      formula: "2 H₂O → 4 H⁺ + 4 e⁻ + O₂ (Oxygen Gas Released)",
      location: "Thylakoid Lumen",
      icon: Droplets,
      color: "sky",
      inputs: ["Liquid H₂O from roots"],
      outputs: ["Protons (H⁺)", "O₂ Gas"],
    },
    {
      step: 3,
      badge: "Stage 3: Chemical Batteries",
      title: "ATP & NADPH Energy Synthesis",
      summary:
        "The flow of protons and excited electrons drives ATP synthase motors, charging chemical energy batteries (ATP & NADPH).",
      formula: "ADP + Pᵢ + NADP⁺ → ATP + NADPH",
      location: "Thylakoid ATP Synthase",
      icon: Zap,
      color: "emerald",
      inputs: ["Proton Gradient (H⁺)", "Low-energy ADP"],
      outputs: ["High-energy ATP", "NADPH"],
    },
    {
      step: 4,
      badge: "Stage 4: Calvin Cycle",
      title: "Carbon Fixation Assembles Glucose",
      summary:
        "In the fluid stroma, atmospheric CO₂ is captured by rubisco enzymes and energized by ATP/NADPH to assemble stable C₆H₁₂O₆ glucose.",
      formula: "6 CO₂ + ATP + NADPH → C₆H₁₂O₆ (Stored Glucose Sugar)",
      location: "Chloroplast Stroma",
      icon: Sparkles,
      color: "indigo",
      inputs: ["Atmospheric CO₂", "ATP & NADPH"],
      outputs: ["Glucose Fuel (C₆H₁₂O₆)"],
    },
  ];

  const activeData = stepsData[currentStep];
  const StepIcon = activeData.icon;

  return (
    <div className="flex flex-col items-center">
      {/* 4-Step Progress Connector */}
      <div className="mb-6 flex w-full max-w-lg items-center justify-between relative px-2">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-sky-200 z-0" />
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-sky-500 z-0 transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 88}%` }}
        />

        {stepsData.map((s, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentStep(idx)}
              className={`relative z-10 flex size-9 items-center justify-center rounded-full font-heading text-xs font-bold transition-all ${
                isCurrent
                  ? "bg-sky-500 text-white ring-4 ring-sky-200 shadow-md scale-110"
                  : isDone
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "bg-white text-slate-500 border-2 border-sky-200 hover:border-sky-400"
              }`}
            >
              {isDone ? <CheckCircle2 className="size-4" /> : s.step}
            </button>
          );
        })}
      </div>

      {/* Step Detail Card */}
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <StepIcon className="size-4" />
            </div>
            <div>
              <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-sky-600">
                {activeData.badge}
              </span>
              <h4 className="font-heading text-base font-bold text-slate-900 leading-snug">
                {activeData.title}
              </h4>
            </div>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-heading text-[10px] font-bold text-slate-600">
            {activeData.location}
          </span>
        </div>

        <p className="mt-3 font-body text-xs text-slate-600 leading-relaxed">
          {activeData.summary}
        </p>

        {/* Reaction Equation Box */}
        <div className="mt-3 rounded-xl bg-slate-900 p-3 text-center">
          <span className="font-heading text-xs font-bold text-amber-300">
            {activeData.formula}
          </span>
        </div>

        {/* Inputs vs Outputs Tags */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-xl bg-sky-50 p-2 border border-sky-100">
            <span className="font-bold text-sky-800">Inputs:</span>
            <p className="mt-0.5 text-slate-600 truncate">{activeData.inputs.join(", ")}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2 border border-emerald-100">
            <span className="font-bold text-emerald-800">Outputs:</span>
            <p className="mt-0.5 text-slate-600 truncate">{activeData.outputs.join(", ")}</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="size-3.5" /> Previous Stage
          </button>
          <span className="text-[11px] font-bold text-slate-400">
            Stage {currentStep + 1} of 4
          </span>
          <button
            type="button"
            disabled={currentStep === 3}
            onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
            className="flex items-center gap-1 rounded-xl bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-sky-600 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next Stage <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. REAL-WORLD ANALOGY: The Solar Kitchen Metaphor Visualizer
   ========================================================================= */
function RealWorldAnalogyVisual() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const analogies = [
    {
      title: "1. The Stove vs. Sunlight",
      metaphor: "Solar Induction Stove",
      metaphorDesc: "Supplies the thermal energy needed to cook the raw ingredients.",
      reality: "Sunlight Photons (hν)",
      realityDesc: "Photons energize chlorophyll electrons to drive synthesis.",
      icon: Sun,
    },
    {
      title: "2. Flour & Water vs. H₂O & CO₂",
      metaphor: "Pantry Flour & Tap Water",
      metaphorDesc: "Basic raw building blocks drawn from the surrounding environment.",
      reality: "Soil Water + Atmospheric CO₂",
      realityDesc: "Roots drink water; leaves breathe in CO₂ gas for raw carbon atoms.",
      icon: Droplets,
    },
    {
      title: "3. The Bakery vs. Chloroplast",
      metaphor: "Master Chef's Kitchen",
      metaphorDesc: "The dedicated workspace where mixing, heating, and baking occur.",
      reality: "Plant Chloroplast (Thylakoids)",
      realityDesc: "Membranous organelle where pigments convert light into sugar bonds.",
      icon: ChefHat,
    },
    {
      title: "4. Baked Bread vs. Glucose",
      metaphor: "Fresh Loaf of Sliced Bread",
      metaphorDesc: "Nutritious, calorie-dense fuel ready for storage or immediate eating.",
      reality: "Glucose Sugar (C₆H₁₂O₆)",
      realityDesc: "High-energy carbohydrates stored in plant cells and roots as starch.",
      icon: Sparkles,
    },
    {
      title: "5. Kitchen Aroma vs. Oxygen",
      metaphor: "Fresh Steam Out the Window",
      metaphorDesc: "Clean byproduct wafting outside, refreshing everyone in the house.",
      reality: "Oxygen Gas (O₂ Released)",
      realityDesc: "Pure breathable oxygen diffuses through stomata into the atmosphere.",
      icon: Wind,
    },
  ];

  const current = analogies[selectedIdx];

  return (
    <div className="flex flex-col items-center">
      {/* Analogy Selector Pills */}
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {analogies.map((a, i) => (
          <button
            key={a.title}
            type="button"
            onClick={() => setSelectedIdx(i)}
            className={`rounded-lg px-2.5 py-1 text-xs font-heading font-bold transition ${
              selectedIdx === i
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-white text-slate-600 border border-sky-100 hover:bg-amber-50"
            }`}
          >
            {a.title.split(". ")[1]}
          </button>
        ))}
      </div>

      {/* Side-by-Side Metaphor Visual Cards */}
      <div className="grid w-full max-w-xl grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Kitchen Metaphor Card */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-amber-200 bg-amber-50/70 p-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
                🍳 Kitchen Metaphor
              </span>
              <ChefHat className="size-4 text-amber-700" />
            </div>
            <h4 className="mt-2.5 font-heading text-base font-bold text-amber-950">
              {current.metaphor}
            </h4>
            <p className="mt-1.5 font-body text-xs text-amber-900/80 leading-relaxed">
              {current.metaphorDesc}
            </p>
          </div>
          <div className="mt-3 rounded-xl bg-white/80 p-2 text-center border border-amber-200/60 text-[11px] font-bold text-amber-800">
            Intuitive Everyday Concept
          </div>
        </div>

        {/* Biological Reality Card */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-900">
                🌿 Cellular Reality
              </span>
              <Sparkles className="size-4 text-emerald-700" />
            </div>
            <h4 className="mt-2.5 font-heading text-base font-bold text-emerald-950">
              {current.reality}
            </h4>
            <p className="mt-1.5 font-body text-xs text-emerald-900/80 leading-relaxed">
              {current.realityDesc}
            </p>
          </div>
          <div className="mt-3 rounded-xl bg-white/80 p-2 text-center border border-emerald-200/60 text-[11px] font-bold text-emerald-800">
            Rigorous Science Mapping
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. AUDIO & READ-ALOUD: Live Narration Player with Animated Visualizer
   ========================================================================= */
function AudioReadAloudVisual() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.85 | 1.0 | 1.2>(1.0);
  const [activeSentence, setActiveSentence] = useState(0);

  const sentences = [
    "Photosynthesis is nature's solar kitchen operating inside leaf cells.",
    "Sunlight photons strike chloroplast thylakoids, drawing water from roots and carbon dioxide from the air.",
    "This biochemical engine synthesizes nourishing glucose sugar while releasing pure oxygen into the atmosphere.",
  ];

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stopAudio = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      stopAudio();
      return;
    }

    window.speechSynthesis.cancel();
    const fullText = sentences.join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = speed;

    utterance.onboundary = (e) => {
      // Estimate active sentence by char index
      const charIdx = e.charIndex;
      const len1 = sentences[0].length;
      const len2 = len1 + sentences[1].length;
      if (charIdx < len1) setActiveSentence(0);
      else if (charIdx < len2) setActiveSentence(1);
      else setActiveSentence(2);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setActiveSentence(0);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Equalizer heights array
  const eqBars = [35, 65, 90, 45, 80, 100, 60, 85, 40, 75, 95, 55, 70, 40];

  return (
    <div className="flex flex-col items-center">
      {/* Player Station Card */}
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 border border-sky-100 shadow-xs">
        {/* Equalizer Visualizer Screen */}
        <div className="flex h-24 w-full items-end justify-center gap-1.5 rounded-xl bg-slate-950 p-4 overflow-hidden relative">
          <div className="absolute top-2 left-3 flex items-center gap-1.5">
            <span
              className={`size-2 rounded-full ${
                isPlaying ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
              }`}
            />
            <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {isPlaying ? "Live Audio Stream" : "Audio Idle"}
            </span>
          </div>

          <div className="absolute top-2 right-3 font-heading text-[10px] font-semibold text-slate-400">
            Speed: {speed}x
          </div>

          {/* Animated Waveform Bars */}
          {eqBars.map((height, i) => (
            <div
              key={i}
              className={`w-2.5 rounded-full transition-all duration-150 ${
                isPlaying
                  ? "bg-gradient-to-t from-sky-500 to-cyan-300"
                  : "bg-slate-800"
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (height * (Math.sin(i * 1.5 + Date.now()) + 1.2)) / 2)}%` : "15%",
              }}
            />
          ))}
        </div>

        {/* Playback Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <button
            type="button"
            onClick={toggleAudio}
            className={`flex items-center gap-2 rounded-xl px-5 py-2 font-heading text-xs font-bold text-white shadow-xs transition ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="size-4" /> Pause Audio
              </>
            ) : (
              <>
                <Play className="size-4 fill-current" /> Listen to Narration
              </>
            )}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 text-[11px] font-bold">
            {([0.85, 1.0, 1.2] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSpeed(s);
                  if (isPlaying) {
                    stopAudio();
                  }
                }}
                className={`rounded-lg px-2 py-0.5 transition ${
                  speed === s
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {s === 0.85 ? "0.85x Calm" : s === 1.0 ? "1.0x" : "1.2x"}
              </button>
            ))}
          </div>
        </div>

        {/* Read-Along Sentence Karaoke Text */}
        <div className="mt-4 space-y-2">
          {sentences.map((sentence, idx) => {
            const isCurrent = isPlaying && activeSentence === idx;
            return (
              <p
                key={idx}
                className={`rounded-xl p-2 font-body text-xs leading-relaxed transition-all duration-200 ${
                  isCurrent
                    ? "bg-sky-100 text-sky-950 font-semibold shadow-xs"
                    : "text-slate-600"
                }`}
              >
                {sentence}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
