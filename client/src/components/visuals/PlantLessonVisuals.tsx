import React, { useState } from "react";
import {
  Leaf,
  Droplets,
  Sun,
  Flower,
  Sprout,
  Wind,
  Shield,
  Layers,
  Sparkles,
  RefreshCw,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Lesson 2: Roots: Water & Nutrient Absorption (Taproot vs Fibrous Soil Lab)
export function RootTypesVisual() {
  const [rootType, setRootType] = useState<"tap" | "fibrous">("tap");
  const [isRaining, setIsRaining] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Underground Water & Nutrient Absorption</h4>
          <p className="text-xs text-[#73949f]">Taproots reach deep aquifers; fibrous roots spread wide topsoil nets.</p>
        </div>
        <button
          onClick={() => setIsRaining(!isRaining)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-white transition ${
            isRaining ? "bg-sky-600 hover:bg-sky-700" : "bg-slate-500 hover:bg-slate-600"
          }`}
        >
          <Droplets className={`h-3.5 w-3.5 ${isRaining ? "animate-bounce" : ""}`} />
          {isRaining ? "Rain Falling" : "Stop Rain"}
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Animated Soil & Root SVG */}
        <div className="relative h-48 w-full max-w-md bg-gradient-to-b from-sky-50 via-amber-50 to-[#eddcc7] rounded-xl overflow-hidden border border-slate-200">
          <svg viewBox="0 0 300 160" className="w-full h-full">
            {/* Surface Soil Line */}
            <rect x="0" y="45" width="300" height="115" fill="#d7ba98" opacity="0.6" />
            <line x1="0" y1="45" x2="300" y2="45" stroke="#78350f" strokeWidth="2" strokeDasharray="4,2" />

            {/* Raindrops falling above soil */}
            {isRaining && (
              <g stroke="#0284c7" strokeWidth="2" strokeDasharray="3,4" className="animate-pulse">
                <line x1="40" y1="5" x2="35" y2="35" />
                <line x1="90" y1="10" x2="85" y2="40" />
                <line x1="150" y1="5" x2="145" y2="35" />
                <line x1="210" y1="10" x2="205" y2="40" />
                <line x1="260" y1="5" x2="255" y2="35" />
              </g>
            )}

            {/* Plant Sprout above ground */}
            <path d="M 150 45 Q 148 20 135 15 Q 150 25 150 45" fill="#16a34a" />
            <path d="M 150 45 Q 152 20 165 15 Q 150 25 150 45" fill="#15803d" />

            {/* Root Architectures */}
            {rootType === "tap" ? (
              <g>
                {/* Thick central taproot reaching deep */}
                <path
                  d="M 150 45 Q 150 100 150 145"
                  stroke="#854d0e"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Lateral hair branches */}
                <path d="M 150 70 Q 120 85 110 100" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
                <path d="M 150 75 Q 180 90 190 105" stroke="#a16207" strokeWidth="3" strokeLinecap="round" />
                <path d="M 150 105 Q 130 120 125 135" stroke="#a16207" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 150 110 Q 170 125 175 140" stroke="#a16207" strokeWidth="2.5" strokeLinecap="round" />

                {/* Animated absorbed water flowing UP taproot */}
                {isRaining && (
                  <circle cx="150" cy="115" r="3" fill="#38bdf8" className="animate-ping" />
                )}
              </g>
            ) : (
              <g>
                {/* Fibrous network spreading wide */}
                <path d="M 150 45 Q 110 70 70 110" stroke="#854d0e" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 150 45 Q 130 85 105 130" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
                <path d="M 150 45 Q 150 95 150 135" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
                <path d="M 150 45 Q 170 85 195 130" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
                <path d="M 150 45 Q 190 70 230 110" stroke="#854d0e" strokeWidth="3.5" strokeLinecap="round" />

                {isRaining && (
                  <>
                    <circle cx="110" cy="85" r="2.5" fill="#38bdf8" className="animate-ping" />
                    <circle cx="190" cy="85" r="2.5" fill="#38bdf8" className="animate-ping" />
                  </>
                )}
              </g>
            )}
          </svg>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setRootType("tap")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              rootType === "tap" ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
            }`}
          >
            Taproot (Carrots, Dandelions)
          </button>
          <button
            onClick={() => setRootType("fibrous")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              rootType === "fibrous" ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
            }`}
          >
            Fibrous Root (Grasses, Wheat)
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          {rootType === "tap"
            ? "Taproots drill deep to anchor firmly against wind and tap deep water tables."
            : "Fibrous nets weave tightly across topsoil to catch immediate surface rainfall."}
        </p>
      </div>
    </div>
  );
}

// Lesson 3: Stems: Support & Transport System (Annual Tree Rings & Vascular Bundles)
export function StemTransportVisual() {
  const [rings, setRings] = useState(5);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Woody Stem Growth Rings & Vascular Bundles</h4>
          <p className="text-xs text-[#73949f]">Each growing season adds concentric rings of xylem xylem cells.</p>
        </div>
        <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
          Age: {rings} Years Old
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="relative h-44 w-44 flex items-center justify-center bg-amber-50/40 rounded-full border-4 border-amber-800 shadow-md">
          {/* Dynamic growth rings */}
          {Array.from({ length: rings }).map((_, i) => {
            const radius = 18 + i * 14;
            return (
              <div
                key={i}
                className="absolute rounded-full border border-amber-700/60 transition-all duration-300"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                }}
              />
            );
          })}
          {/* Heartwood center */}
          <div className="h-6 w-6 rounded-full bg-amber-900 border border-amber-950 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>
        </div>

        <div className="mt-4 w-full max-w-xs flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">Younger</span>
          <input
            type="range"
            min="1"
            max="6"
            value={rings}
            onChange={(e) => setRings(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <span className="text-xs font-bold text-slate-600">Older</span>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          Outer rings represent active transport (Sapwood), while inner rings harden into support (Heartwood).
        </p>
      </div>
    </div>
  );
}

// Lesson 4: Leaves: Photosynthesis & Gas Exchange (Microscopic Leaf Anatomy)
export function LeafStructureVisual() {
  const [stomataOpen, setStomataOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 4 Visual: Microscopic Leaf Layer Anatomy</h4>
          <p className="text-xs text-[#73949f]">Waxy cuticle, photosynthetic palisade cells, and stomatal pore gas exchange.</p>
        </div>
        <button
          onClick={() => setStomataOpen(!stomataOpen)}
          className={`px-3 py-1 rounded-lg text-xs font-bold text-white transition ${
            stomataOpen ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-600 hover:bg-slate-700"
          }`}
        >
          {stomataOpen ? "Stomata Pores Open" : "Stomata Pores Closed"}
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Layer cross section diagram */}
        <div className="w-full max-w-md bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col gap-2">
          {/* Upper Cuticle */}
          <div className="h-3 w-full bg-cyan-200/80 rounded border border-cyan-300 flex items-center justify-center text-[9px] font-bold text-cyan-900">
            Waxy Protective Cuticle (Prevents drying)
          </div>

          {/* Palisade Mesophyll */}
          <div className="h-14 w-full bg-emerald-100 rounded border border-emerald-300 grid grid-cols-8 gap-1 p-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-5 bg-emerald-600 rounded-sm flex items-center justify-center">
                <div className="h-1.5 w-1.5 bg-emerald-200 rounded-full animate-pulse" />
              </div>
            ))}
          </div>

          {/* Spongy Mesophyll with Air Pockets */}
          <div className="h-12 w-full bg-amber-50 rounded border border-amber-200 p-2 flex items-center justify-around relative">
            <span className="text-[10px] font-bold text-amber-800">Spongy Air Spaces (Gas circulation)</span>
            {stomataOpen && (
              <span className="text-[10px] font-bold text-emerald-700 animate-pulse">CO₂ In ⇄ O₂ Out</span>
            )}
          </div>

          {/* Lower Epidermis with Guard Cells */}
          <div className="h-7 w-full bg-emerald-200/90 rounded border border-emerald-400 flex items-center justify-center relative">
            <div
              className={`h-4 rounded-full border-2 border-emerald-800 transition-all duration-300 flex items-center justify-center ${
                stomataOpen ? "w-12 bg-white" : "w-4 bg-emerald-600"
              }`}
            >
              {stomataOpen && <span className="text-[8px] font-bold text-emerald-900">Pore</span>}
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500 text-center">
          Guard cells swell with water to open pores for carbon dioxide during sunlight, and shrink to close pores to prevent water loss!
        </p>
      </div>
    </div>
  );
}

// Lesson 5: Flowers: Reproductive Structures (Organ Dissection)
export function FlowerDissectionVisual() {
  const [selectedPart, setSelectedPart] = useState<"petal" | "stamen" | "pistil">("stamen");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 5 Visual: Flower Anatomical Dissection</h4>
          <p className="text-xs text-[#73949f]">Petals attract pollinators; stamens produce pollen; pistil cradles ovules.</p>
        </div>
        <span className="rounded-lg bg-pink-100 px-3 py-1 text-xs font-bold text-pink-800 capitalize">
          Active: {selectedPart}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Flower SVG */}
        <div className="h-44 w-64 bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center">
          <svg viewBox="0 0 200 160" className="w-full h-full">
            {/* Petals */}
            <path
              d="M 60 70 Q 30 20 70 30 Q 100 20 100 60 Q 100 20 130 30 Q 170 20 140 70 Z"
              fill={selectedPart === "petal" ? "#f43f5e" : "#fda4af"}
              className="transition-colors duration-300"
            />

            {/* Stem & Sepal */}
            <line x1="100" y1="110" x2="100" y2="155" stroke="#16a34a" strokeWidth="5" />
            <path d="M 85 110 Q 100 120 115 110" stroke="#15803d" strokeWidth="4" fill="none" />

            {/* Central Pistil (Female) */}
            <g className={selectedPart === "pistil" ? "animate-pulse" : ""}>
              {/* Ovary Base */}
              <ellipse cx="100" cy="95" rx="18" ry="15" fill={selectedPart === "pistil" ? "#15803d" : "#86efac"} stroke="#166534" strokeWidth="2" />
              {/* Style & Stigma */}
              <line x1="100" y1="80" x2="100" y2="50" stroke="#166534" strokeWidth="3" />
              <circle cx="100" cy="50" r="5" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            </g>

            {/* Stamens (Male) with Pollen Anthers */}
            <g className={selectedPart === "stamen" ? "animate-pulse" : ""}>
              <path d="M 85 95 Q 75 70 70 55" stroke="#ca8a04" strokeWidth="2" fill="none" />
              <ellipse cx="68" cy="53" rx="5" ry="3" fill="#eab308" />

              <path d="M 115 95 Q 125 70 130 55" stroke="#ca8a04" strokeWidth="2" fill="none" />
              <ellipse cx="132" cy="53" rx="5" ry="3" fill="#eab308" />
            </g>
          </svg>
        </div>

        <div className="mt-3 flex gap-2">
          {(["petal", "stamen", "pistil"] as const).map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                selectedPart === part ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
              }`}
            >
              {part === "petal" ? "Petal (Attractor)" : part === "stamen" ? "Stamen (Male Pollen)" : "Pistil (Female Ovary)"}
            </button>
          ))}
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          {selectedPart === "petal" && "Vibrant petals attract bees, butterflies, and hummingbirds with color cues."}
          {selectedPart === "stamen" && "The anther tip sheds microscopic pollen grains carried by wind or insect coats."}
          {selectedPart === "pistil" && "Sticky stigma catches pollen, guiding a pollen tube down to fertilize ovules."}
        </p>
      </div>
    </div>
  );
}

// Lesson 6: Seeds & Germination (Interactive Sprouting Sequence)
export function SeedGerminationVisual() {
  const [day, setDay] = useState(3);

  const stages = [
    { day: 1, title: "Day 1: Water Imbibition", desc: "Seed absorbs moisture through seed coat and swells." },
    { day: 2, title: "Day 2: Radicle Emergence", desc: "First embryonic root bursts downwards to anchor." },
    { day: 3, title: "Day 3: Hypocotyl Loop", desc: "Sprout stem arches upwards pushing through soil." },
    { day: 4, title: "Day 4: Cotyledons Unfurl", desc: "Seed leaves open and begin initial photosynthesis." },
  ];

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Embryonic Seed Sprouting Timeline</h4>
          <p className="text-xs text-[#73949f]">Watch the radicle root and hypocotyl shoot emerge stage by stage.</p>
        </div>
        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          Stage {day} of 4
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Animated Sprouting SVG */}
        <div className="relative h-44 w-64 bg-gradient-to-b from-sky-50 via-amber-50 to-[#eddcc7] rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {/* Soil line */}
            <rect x="0" y="55" width="200" height="95" fill="#c7a783" opacity="0.6" />
            <line x1="0" y1="55" x2="200" y2="55" stroke="#78350f" strokeWidth="2" strokeDasharray="3,2" />

            {/* Seed Body */}
            <ellipse cx="100" cy="75" rx={day >= 1 ? "12" : "9"} ry={day >= 1 ? "16" : "13"} fill="#92400e" />

            {/* Radicle Root (Days 2-4) */}
            {day >= 2 && (
              <path
                d={day === 2 ? "M 100 85 Q 100 105 100 115" : "M 100 85 Q 100 115 100 135 M 100 110 L 85 125 M 100 120 L 115 130"}
                stroke="#d97706"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse"
              />
            )}

            {/* Shoot (Days 3-4) */}
            {day === 3 && (
              <path d="M 100 65 Q 90 45 95 38 Q 105 45 100 65" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
            )}

            {day === 4 && (
              <g>
                <line x1="100" y1="65" x2="100" y2="25" stroke="#16a34a" strokeWidth="3" />
                <ellipse cx="88" cy="20" rx="10" ry="6" fill="#22c55e" />
                <ellipse cx="112" cy="20" rx="10" ry="6" fill="#22c55e" />
              </g>
            )}
          </svg>
        </div>

        {/* Days Slider */}
        <div className="mt-4 w-full max-w-xs flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">Day 1</span>
          <input
            type="range"
            min="1"
            max="4"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <span className="text-xs font-bold text-slate-600">Day 4</span>
        </div>

        <p className="mt-2 text-xs text-slate-600 font-semibold text-center">
          {stages[day - 1].title}: {stages[day - 1].desc}
        </p>
      </div>
    </div>
  );
}

// Lesson 7: Fruit Formation (Flower to Fruit Transformer)
export function FruitOvaryVisual() {
  const [stage, setStage] = useState<"flower" | "wilting" | "fruit">("fruit");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Flower Ovary to Fruit Transformation</h4>
          <p className="text-xs text-[#73949f]">After fertilization, flower petals wither and the ovary swells into a fleshy fruit protecting seeds.</p>
        </div>
        <span className="rounded-lg bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 capitalize">
          {stage} Stage
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="h-44 w-64 bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center">
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {stage === "flower" && (
              <g className="animate-pulse">
                <circle cx="100" cy="70" r="16" fill="#facc15" />
                <ellipse cx="65" cy="70" rx="18" ry="10" fill="#f43f5e" />
                <ellipse cx="135" cy="70" rx="18" ry="10" fill="#f43f5e" />
                <ellipse cx="100" cy="35" rx="10" ry="18" fill="#f43f5e" />
                <ellipse cx="100" cy="105" rx="10" ry="18" fill="#f43f5e" />
                <text x="100" y="140" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">Fertilized Flower Ovary</text>
              </g>
            )}

            {stage === "wilting" && (
              <g>
                <ellipse cx="100" cy="70" rx="22" ry="18" fill="#84cc16" />
                <ellipse cx="60" cy="75" rx="10" ry="5" fill="#cbd5e1" />
                <ellipse cx="140" cy="75" rx="10" ry="5" fill="#cbd5e1" />
                <text x="100" y="140" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">Petals Drop &amp; Ovary Swells</text>
              </g>
            )}

            {stage === "fruit" && (
              <g className="animate-pulse">
                {/* Ripe Apple Fruit */}
                <ellipse cx="100" cy="70" rx="36" ry="32" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                <path d="M 100 38 Q 105 25 115 20" stroke="#78350f" strokeWidth="3" fill="none" />
                <path d="M 108 26 Q 120 22 122 30 Z" fill="#16a34a" />
                {/* Internal seeds */}
                <ellipse cx="94" cy="72" rx="2.5" ry="5" fill="#451a03" />
                <ellipse cx="106" cy="72" rx="2.5" ry="5" fill="#451a03" />
                <text x="100" y="135" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="bold">Fleshy Fruit + Protected Seeds</text>
              </g>
            )}
          </svg>
        </div>

        <div className="mt-3 flex gap-2">
          {(["flower", "wilting", "fruit"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                stage === s ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
              }`}
            >
              {s === "flower" ? "1. Blooming Flower" : s === "wilting" ? "2. Swelling Ovary" : "3. Ripe Fleshy Fruit"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 8: Vascular System: Xylem & Phloem (Two-Way Highway)
export function XylemPhloemVisual() {
  const [flowing, setFlowing] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Two-Way Vascular Transport Highway</h4>
          <p className="text-xs text-[#73949f]">Xylem conducts water ONE-WAY upwards; Phloem translocates sugar TWO-WAYS.</p>
        </div>
        <button
          onClick={() => setFlowing(!flowing)}
          className="px-3 py-1 rounded-lg bg-[#159ac1] text-white text-xs font-bold hover:bg-[#0e7795] transition"
        >
          {flowing ? "Pause Transport" : "Resume Flow"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Xylem Channel (Upwards only) */}
        <div className="flex flex-col items-center bg-cyan-50/60 p-4 rounded-xl border border-cyan-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800">
            <ArrowUp className="h-4 w-4 text-cyan-600" />
            <span>Xylem Channel</span>
          </div>
          <span className="text-[10px] text-cyan-600 font-semibold mb-2">Water &amp; Minerals (One-Way Up)</span>

          <div className="h-32 w-16 bg-white border-2 border-cyan-300 rounded-lg flex flex-col justify-around items-center p-1 overflow-hidden relative shadow-inner">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full bg-cyan-500 flex items-center justify-center text-[8px] text-white font-bold shadow ${
                  flowing ? "animate-bounce" : ""
                }`}
              >
                H₂O
              </div>
            ))}
          </div>
        </div>

        {/* Phloem Channel (Bidirectional) */}
        <div className="flex flex-col items-center bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
            <ArrowUp className="h-3.5 w-3.5 text-emerald-600" />
            <ArrowDown className="h-3.5 w-3.5 text-emerald-600" />
            <span>Phloem Channel</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mb-2">Sugar &amp; Amino Acids (Both Ways)</span>

          <div className="h-32 w-16 bg-white border-2 border-emerald-300 rounded-lg flex flex-col justify-around items-center p-1 overflow-hidden relative shadow-inner">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white font-bold shadow ${
                  flowing ? "animate-pulse" : ""
                }`}
              >
                C₆
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Lesson 9: Plant Adaptations (Cactus vs Rainforest Leaf Lab)
export function PlantAdaptationsVisual() {
  const [biome, setBiome] = useState<"desert" | "rainforest">("desert");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Extreme Biome Adaptation Lab</h4>
          <p className="text-xs text-[#73949f]">Desert cactus stores water in swollen stems; rainforest drip tips shed deluge rains.</p>
        </div>
        <span className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 capitalize">
          {biome} Biome
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="h-44 w-64 bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center">
          <svg viewBox="0 0 200 150" className="w-full h-full">
            {biome === "desert" ? (
              <g>
                {/* Desert Saguaro Cactus */}
                <rect x="85" y="40" width="30" height="90" rx="15" fill="#15803d" stroke="#166534" strokeWidth="2" />
                <path d="M 85 70 L 60 70 L 60 50" stroke="#166534" strokeWidth="12" strokeLinecap="round" fill="none" />
                <path d="M 115 80 L 140 80 L 140 60" stroke="#166534" strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Spines */}
                <line x1="80" y1="50" x2="84" y2="50" stroke="#ca8a04" strokeWidth="2" />
                <line x1="116" y1="50" x2="120" y2="50" stroke="#ca8a04" strokeWidth="2" />
                <line x1="80" y1="85" x2="84" y2="85" stroke="#ca8a04" strokeWidth="2" />
                <line x1="116" y1="85" x2="120" y2="85" stroke="#ca8a04" strokeWidth="2" />
                <text x="100" y="145" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="bold">Waxy Flesh Stores 90% Water</text>
              </g>
            ) : (
              <g>
                {/* Rainforest Drip-Tip Leaf */}
                <path d="M 100 20 Q 150 70 110 125 Q 100 135 100 140 Q 100 135 90 125 Q 50 70 100 20 Z" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
                {/* Leaf veins */}
                <line x1="100" y1="20" x2="100" y2="135" stroke="#14532d" strokeWidth="2" />
                {/* Animated Rain droplet sliding down drip tip */}
                <circle cx="100" cy="138" r="3" fill="#38bdf8" className="animate-bounce" />
                <text x="100" y="148" textAnchor="middle" fontSize="9" fill="#15803d" fontWeight="bold">Drip-Tip Prevents Fungal Rot</text>
              </g>
            )}
          </svg>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setBiome("desert")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              biome === "desert" ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
            }`}
          >
            Desert (Cactus &amp; Spines)
          </button>
          <button
            onClick={() => setBiome("rainforest")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              biome === "rainforest" ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
            }`}
          >
            Rainforest (Drip-Tip Leaves)
          </button>
        </div>
      </div>
    </div>
  );
}

// Lesson 10: Soil Anchoring & Erosion Prevention
export function ErosionSoilVisual() {
  const [hasRoots, setHasRoots] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Root Soil Anchoring &amp; Erosion Demo</h4>
          <p className="text-xs text-[#73949f]">Dense root networks bind soil particles, protecting landscapes against stormwater runoff.</p>
        </div>
        <button
          onClick={() => setHasRoots(!hasRoots)}
          className={`px-3 py-1 rounded-lg text-xs font-bold text-white transition ${
            hasRoots ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {hasRoots ? "Planted Slope (Roots Intact)" : "Deforested Bare Slope"}
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="h-44 w-72 bg-gradient-to-b from-sky-50 to-amber-50 rounded-xl p-3 border border-slate-200 relative overflow-hidden flex items-end">
          <svg viewBox="0 0 240 140" className="w-full h-full">
            {/* Hillside slope */}
            <path d="M 0 50 Q 120 70 240 120 L 240 140 L 0 140 Z" fill={hasRoots ? "#a16207" : "#78350f"} />

            {hasRoots ? (
              <g>
                {/* Plants with deep roots binding soil */}
                <path d="M 40 45 L 40 25 M 35 30 L 45 30" stroke="#16a34a" strokeWidth="4" />
                <path d="M 100 65 L 100 45 M 95 50 L 105 50" stroke="#16a34a" strokeWidth="4" />
                <path d="M 160 85 L 160 65 M 155 70 L 165 70" stroke="#16a34a" strokeWidth="4" />

                {/* Tangled root mesh holding ground */}
                <g stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="2,2">
                  <path d="M 40 45 Q 60 70 80 60" />
                  <path d="M 100 65 Q 130 90 140 80" />
                  <path d="M 160 85 Q 180 110 200 100" />
                </g>
                <text x="120" y="130" textAnchor="middle" fontSize="10" fill="#fef08a" fontWeight="bold">Roots Hold Soil Firm — Zero Erosion</text>
              </g>
            ) : (
              <g className="animate-pulse">
                {/* Muddy Runoff Gouges */}
                <path d="M 30 55 Q 80 80 140 115" stroke="#451a03" strokeWidth="8" />
                <path d="M 90 70 Q 140 100 200 130" stroke="#451a03" strokeWidth="6" />
                <text x="120" y="130" textAnchor="middle" fontSize="10" fill="#fca5a5" fontWeight="bold">⚠️ Severe Landslide &amp; Topsoil Loss</text>
              </g>
            )}
          </svg>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          {hasRoots
            ? "Plant roots act like underground rebar reinforcement, soaking up stormwater and stopping topsoil washouts."
            : "Without root systems, heavy rainfall washes away fertile topsoil, creating gullies and mudslides."}
        </p>
      </div>
    </div>
  );
}

// Lesson 11: Annual vs Perennial Growth Timeline
export function GrowthCycleVisual() {
  const [type, setType] = useState<"annual" | "perennial">("annual");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Lifecycle Duration (Annual vs Perennial)</h4>
          <p className="text-xs text-[#73949f]">Annuals complete life in 1 season; Perennials survive winter to re-bloom for years.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setType("annual")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              type === "annual" ? "bg-[#159ac1] text-white" : "bg-sky-50 text-[#159ac1]"
            }`}
          >
            Annual (Sunflower)
          </button>
          <button
            onClick={() => setType("perennial")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              type === "perennial" ? "bg-[#159ac1] text-white" : "bg-sky-50 text-[#159ac1]"
            }`}
          >
            Perennial (Apple Tree)
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="grid grid-cols-4 gap-2 w-full max-w-md text-center text-xs">
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-800">Spring</span>
            <p className="text-[10px] text-slate-500 mt-1">{type === "annual" ? "Seed sprouts" : "New green buds"}</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
            <span className="font-bold text-amber-800">Summer</span>
            <p className="text-[10px] text-slate-500 mt-1">Full flower bloom</p>
          </div>
          <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
            <span className="font-bold text-orange-800">Autumn</span>
            <p className="text-[10px] text-slate-500 mt-1">{type === "annual" ? "Drops seeds" : "Sheds leaves"}</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-200">
            <span className="font-bold text-cyan-800">Winter</span>
            <p className="text-[10px] text-slate-500 mt-1">{type === "annual" ? "Plant dies" : "Roots stay dormant"}</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-600 font-medium text-center">
          {type === "annual"
            ? "Annuals put 100% of their energy into producing seeds before dying in freezing winter."
            : "Perennials maintain deep underground root reserves to survive freezing winters and sprout anew each spring."}
        </p>
      </div>
    </div>
  );
}

// Lesson 12: Pollination & Seed Dispersal
export function PollinationVisual() {
  const [vector, setVector] = useState<"bee" | "wind">("bee");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: Pollination Vector Comparison</h4>
          <p className="text-xs text-[#73949f]">Transferring pollen grains from anther to sticky stigma for fertilization.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1] capitalize">
          Vector: {vector === "bee" ? "Insect (Bee)" : "Wind Draft"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="relative h-44 w-72 bg-gradient-to-r from-sky-50 to-emerald-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center overflow-hidden">
          {vector === "bee" ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-6">
                <Flower className="h-10 w-10 text-pink-500 animate-pulse" />
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-2xl">🐝</span>
                  <div className="flex gap-1 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                  </div>
                </div>
                <Flower className="h-10 w-10 text-pink-500" />
              </div>
              <span className="text-xs font-bold text-pink-700 mt-3">Targeted Pollen Delivery via Nectar Foraging</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4">
                <Wind className="h-8 w-8 text-sky-400 animate-pulse" />
                <div className="flex gap-1.5 animate-pulse">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  ))}
                </div>
                <div className="h-10 w-4 bg-emerald-700 rounded-t-full" />
              </div>
              <span className="text-xs font-bold text-sky-700 mt-3">Broadcast Pollen Dispersal via Air Currents</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setVector("bee")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              vector === "bee" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"
            }`}
          >
            Insect Pollination (Targeted)
          </button>
          <button
            onClick={() => setVector("wind")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              vector === "wind" ? "bg-[#277f59] text-white" : "bg-[#eaf7f1] text-[#277f59]"
            }`}
          >
            Wind Pollination (Airborne)
          </button>
        </div>
      </div>
    </div>
  );
}
