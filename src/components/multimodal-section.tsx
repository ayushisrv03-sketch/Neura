"use client";

import { useState } from "react";
import { Image as ImageIcon, List, Lightbulb, Ear, Repeat2 } from "lucide-react";

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
    badge: "Diagrammatic Schematic",
    meta: "Concept: Photosynthesis Inputs & Outputs",
    takeawayLabel: "Visual Takeaway:",
    takeaway:
      "Think of the plant cell as a solar-powered kitchen. It catches sun rays from above and draws water and air from below to produce fuel and oxygen.",
  },
  steps: {
    badge: "Numbered Sequence",
    meta: "Concept: Photosynthesis Inputs & Outputs",
    takeawayLabel: "Step Takeaway:",
    takeaway:
      "1) Light hits the chloroplast. 2) Water and CO₂ are drawn in. 3) The chloroplast converts them into glucose. 4) Oxygen is released as a byproduct.",
  },
  analogy: {
    badge: "Everyday Comparison",
    meta: "Concept: Photosynthesis Inputs & Outputs",
    takeawayLabel: "Analogy Takeaway:",
    takeaway:
      "A chloroplast works like a tiny kitchen: sunlight is the stove, water and air are the ingredients, and glucose and oxygen are what comes out the door.",
  },
  audio: {
    badge: "Read-Aloud Narration",
    meta: "Concept: Photosynthesis Inputs & Outputs",
    takeawayLabel: "Listen Takeaway:",
    takeaway:
      "Press play to hear a calm, paced narration of how sunlight, water, and carbon dioxide become sugar and oxygen inside a plant cell.",
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
          Every single concept in Neura can instantly morph across 4
          foundational modes. Try switching below to see how Photosynthesis
          transforms.
        </p>
      </div>

      <div className="flex max-w-3xl flex-wrap items-center justify-center gap-3 pt-2">
        {modes.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "bg-white text-slate-700 shadow-sm hover:bg-sky-50"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-sky-100 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-sky-100 px-3 py-1 font-heading text-xs font-semibold text-sky-800">
            {panel.badge}
          </span>
          <span className="font-heading text-xs font-medium text-slate-500">
            {panel.meta}
          </span>
        </div>

        <div className="mt-6 flex min-h-[240px] items-center justify-center rounded-xl bg-sky-50/80 p-6">
          {active === "visual" ? (
            <PhotosynthesisDiagram />
          ) : (
            <p className="max-w-md text-center font-body text-slate-600">
              {panel.takeaway}
            </p>
          )}
        </div>

        <p className="mt-6 font-body text-base text-slate-900">
          <span className="font-bold">{panel.takeawayLabel}</span>{" "}
          {active === "visual" ? panel.takeaway : null}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 pt-4">
          <span className="flex items-center gap-1.5 font-heading text-xs font-medium text-slate-600">
            <Repeat2 className="size-4 text-sky-600" />
            You can switch styles at any point during any active lesson.
          </span>
          <a
            href="#features"
            className="font-heading text-xs font-semibold text-sky-600 hover:underline"
          >
            Explore full multimodal curriculum →
          </a>
        </div>
      </div>
    </section>
  );
}

function PhotosynthesisDiagram() {
  return (
    <svg
      viewBox="0 0 480 192"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Diagram showing sunlight and water entering a chloroplast and producing oxygen and glucose"
    >
      {/* Connectors */}
      <line
        x1="70"
        y1="106"
        x2="180"
        y2="106"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <line
        x1="70"
        y1="148"
        x2="180"
        y2="120"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <line
        x1="300"
        y1="100"
        x2="400"
        y2="80"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <line
        x1="300"
        y1="120"
        x2="400"
        y2="140"
        stroke="#0ea5e9"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />

      {/* Sun */}
      <g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={40 + 18 * Math.cos((angle * Math.PI) / 180)}
            y1={40 + 18 * Math.cos((angle * Math.PI) / 180 + 100)}
            x2={40 + 26 * Math.cos((angle * Math.PI) / 180)}
            y2={40 + 26 * Math.sin((angle * Math.PI) / 180)}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <circle cx="40" cy="40" r="15" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
      </g>
      <text x="18" y="72" className="fill-amber-700" fontSize="11" fontWeight="700">
        Sunlight (Energy)
      </text>

      {/* Water/CO2 pill */}
      <rect x="10" y="128" width="94" height="28" rx="14" fill="#bae6fd" />
      <text x="30" y="146" className="fill-slate-700" fontSize="12" fontWeight="500">
        H₂O + CO₂
      </text>

      {/* Chloroplast */}
      <ellipse
        cx="240"
        cy="110"
        rx="55"
        ry="38"
        fill="#e0f2fe"
        stroke="#0284c7"
        strokeWidth="2"
      />
      <text
        x="205"
        y="115"
        className="fill-sky-800"
        fontSize="13.5"
        fontWeight="700"
      >
        Chloroplast
      </text>

      {/* Glucose pill */}
      <rect x="392" y="62" width="88" height="27" rx="13.5" fill="#93c5fd" />
      <text x="404" y="80" className="fill-sky-950" fontSize="12.5" fontWeight="600">
        Glucose (Sugar)
      </text>

      {/* Oxygen pill */}
      <rect x="392" y="126" width="88" height="27" rx="13.5" fill="#bae6fd" />
      <text x="406" y="144" className="fill-sky-800" fontSize="12.5" fontWeight="600">
        Oxygen (O₂)
      </text>
    </svg>
  );
}
