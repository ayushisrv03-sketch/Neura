import React, { useState } from "react";
import { Info, Sparkles, CheckCircle2 } from "lucide-react";

export default function PlantPartsVisual() {
  const [activePart, setActivePart] = useState<"roots" | "stem" | "leaves" | "flowers">("leaves");

  const details = {
    roots: {
      title: "Roots System",
      job: "Absorb water (H₂O) & essential soil minerals, anchoring the plant firmly into the ground.",
      fact: "Root hair cells increase surface area by over 500% to maximize water absorption!",
      color: "#92400e",
      bg: "#fef3c7",
    },
    stem: {
      title: "Stem & Xylem/Phloem",
      job: "Transports water upward from roots to leaves via Xylem vessels, and sends food down via Phloem.",
      fact: "Capillary action and transpiration pull water up tall stems against gravity!",
      color: "#15803d",
      bg: "#dcfce7",
    },
    leaves: {
      title: "Leaves & Chloroplasts",
      job: "Use sunlight to combine CO₂ and water into glucose food during photosynthesis.",
      fact: "Microscopic openings called stomata on leaf undersides open and close to breathe in CO₂!",
      color: "#0369a1",
      bg: "#e0f2fe",
    },
    flowers: {
      title: "Flowers & Pollination",
      job: "Attract pollinators like bees to produce seeds and enable plant reproduction.",
      fact: "Petals produce sweet nectar and colorful patterns specifically tailored to attract insects!",
      color: "#b45309",
      bg: "#fef3c7",
    },
  };

  const selected = details[activePart];

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-sm text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1f0f4] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#eab308] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#ca8a04]" />
            Interactive Plant Anatomy Explorer
          </h3>
          <p className="mt-0.5 text-xs text-[#73949f]">
            Click on any part of the plant diagram to inspect its anatomical job and transport role!
          </p>
        </div>
        <div className="rounded-xl px-3 py-1.5 border border-[#fef08a] bg-[#fefce8] text-xs font-bold text-[#a16207]">
          Anatomical Explorer
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2 items-center">
        {/* SVG Plant Visual with Interactive Hotspots */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 border border-[#e3f1f4] shadow-xs relative">
          <svg viewBox="0 0 200 220" className="w-full h-52">
            {/* Soil Line */}
            <line x1="10" y1="160" x2="190" y2="160" stroke="#b45309" strokeWidth="3" strokeDasharray="5 3" />
            <rect x="10" y="161" width="180" height="55" fill="#fef3c7" opacity="0.6" />
            <text x="25" y="180" fill="#92400e" fontSize="9" fontWeight="bold">Soil & Minerals</text>

            {/* Roots */}
            <g
              onClick={() => setActivePart("roots")}
              className="cursor-pointer group hover:opacity-80 transition"
            >
              <path d="M 100 160 Q 80 180 60 205 M 100 160 Q 110 185 130 210 M 100 160 L 100 215 M 100 180 L 120 195" stroke="#92400e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <circle cx="100" cy="185" r="16" fill={activePart === "roots" ? "#fbbf24" : "transparent"} opacity="0.3" />
            </g>

            {/* Stem */}
            <g
              onClick={() => setActivePart("stem")}
              className="cursor-pointer group hover:opacity-80 transition"
            >
              <line x1="100" y1="160" x2="100" y2="60" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
              {/* Transport arrows */}
              <line x1="100" y1="150" x2="100" y2="75" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
              <circle cx="100" cy="110" r="16" fill={activePart === "stem" ? "#4ade80" : "transparent"} opacity="0.3" />
            </g>

            {/* Leaves */}
            <g
              onClick={() => setActivePart("leaves")}
              className="cursor-pointer group hover:opacity-80 transition"
            >
              <path d="M 100 120 Q 50 100 40 120 Q 70 145 100 120 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
              <path d="M 100 90 Q 150 70 160 90 Q 130 115 100 90 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
              <circle cx="65" cy="115" r="16" fill={activePart === "leaves" ? "#86efac" : "transparent"} opacity="0.3" />
            </g>

            {/* Flower */}
            <g
              onClick={() => setActivePart("flowers")}
              className="cursor-pointer group hover:opacity-80 transition"
            >
              {/* Petals */}
              <circle cx="100" cy="45" r="14" fill="#ef4444" />
              <circle cx="85" cy="55" r="14" fill="#f97316" />
              <circle cx="115" cy="55" r="14" fill="#f97316" />
              <circle cx="100" cy="65" r="14" fill="#ef4444" />
              <circle cx="100" cy="55" r="10" fill="#facc15" />
              <circle cx="100" cy="55" r="18" fill={activePart === "flowers" ? "#fde047" : "transparent"} opacity="0.4" />
            </g>
          </svg>

          <p className="mt-2 text-xs font-semibold text-[#829fa9]">
            Click any plant part above to inspect its function!
          </p>
        </div>

        {/* Hotspot Part Details */}
        <div className="flex flex-col space-y-4">
          <div className="rounded-2xl bg-white p-5 border border-[#e3f1f4] space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: selected.color }} />
              <h4 className="text-sm font-extrabold text-[#214554]">{selected.title}</h4>
            </div>

            <p className="text-xs text-[#52737f] leading-relaxed font-medium">
              {selected.job}
            </p>

            <div className="rounded-xl p-3 text-xs leading-relaxed font-semibold" style={{ backgroundColor: selected.bg, color: selected.color }}>
              💡 <strong>Did you know?</strong> {selected.fact}
            </div>
          </div>

          {/* Part Selection Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {(["roots", "stem", "leaves", "flowers"] as const).map((part) => (
              <button
                key={part}
                onClick={() => setActivePart(part)}
                className={`p-2.5 rounded-xl border text-xs font-bold capitalize transition ${
                  activePart === part
                    ? "border-[#ca8a04] bg-[#fefce8] text-[#a16207]"
                    : "border-[#e2eff2] text-[#6e8e9a] hover:bg-[#f6fbfd]"
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
