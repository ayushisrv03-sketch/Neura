import React, { useState } from "react";
import { Sun, Leaf, Droplets, Zap, Eye, Wind } from "lucide-react";

// Lesson 2: Plant Cell Structure & Chloroplasts
export function ChloroplastStructureVisual() {
  const [selectedOrganelle, setSelectedOrganelle] = useState<"chloroplast" | "cellwall" | "vacuole">("chloroplast");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Interactive Plant Cell & Chloroplast Zoomer</h4>
          <p className="text-xs text-[#73949f]">Click organelles to examine plant cell structures and thylakoid membranes.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 300 150" className="h-44 w-full max-w-md">
          {/* Plant Cell Wall */}
          <rect x="20" y="10" width="260" height="130" rx="20" fill="#eaf7f1" stroke="#318c60" strokeWidth="4" />

          {/* Central Vacuole */}
          <rect
            x="40"
            y="30"
            width="100"
            height="80"
            rx="12"
            fill={selectedOrganelle === "vacuole" ? "#bde9f5" : "#e3f7fb"}
            stroke="#159ac1"
            strokeWidth="2"
            onClick={() => setSelectedOrganelle("vacuole")}
            className="cursor-pointer"
          />
          <text x="90" y="75" textAnchor="middle" fill="#159ac1" fontSize="11" fontWeight="bold">Vacuole</text>

          {/* Chloroplasts */}
          <g onClick={() => setSelectedOrganelle("chloroplast")} className="cursor-pointer">
            <ellipse cx="180" cy="45" rx="25" ry="16" fill={selectedOrganelle === "chloroplast" ? "#277f59" : "#318c60"} />
            <ellipse cx="220" cy="95" rx="25" ry="16" fill={selectedOrganelle === "chloroplast" ? "#277f59" : "#318c60"} />
            <text x="200" y="70" textAnchor="middle" fill="#277f59" fontSize="11" fontWeight="bold">Chloroplasts</text>
          </g>
        </svg>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setSelectedOrganelle("chloroplast")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedOrganelle === "chloroplast" ? "bg-[#277f59] text-white" : "bg-[#eaf7f1] text-[#277f59]"}`}
          >
            Chloroplast (Photosynthesis Site)
          </button>
          <button
            onClick={() => setSelectedOrganelle("vacuole")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${selectedOrganelle === "vacuole" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
          >
            Vacuole (Water Store)
          </button>
        </div>
      </div>
    </div>
  );
}

// Lesson 3: Role of Sunlight & Solar Energy
export function SunlightEnergyVisual() {
  const [intensity, setIntensity] = useState(75);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Solar Photon Beam Intensity Simulator</h4>
          <p className="text-xs text-[#73949f]">Sunlight photons energize chlorophyll electrons during light reactions.</p>
        </div>
        <span className="rounded-lg bg-[#fff8e6] px-3 py-1 text-xs font-bold text-[#d97706]">
          {intensity}% Solar Output
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 300 130" className="h-40 w-full max-w-md">
          {/* Sun */}
          <circle cx="50" cy="40" r="22" fill="#fbbf24" />
          <path d="M 50,10 L 50,2 M 50,70 L 50,78 M 20,40 L 12,40 M 80,40 L 88,40" stroke="#f59e0b" strokeWidth="3" />

          {/* Rays */}
          <path
            d="M 70,50 L 180,85 M 70,30 L 180,75 M 70,40 L 180,80"
            stroke="#fbbf24"
            strokeWidth={Math.max(1, (intensity / 100) * 6)}
            strokeDasharray="4 4"
          />

          {/* Leaf */}
          <path d="M 180,95 Q 240,40 280,95 Q 220,130 180,95 Z" fill="#318c60" />
        </svg>

        <input
          type="range"
          min="10"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="mt-3 h-2 w-48 accent-[#f59e0b]"
        />
      </div>
    </div>
  );
}

// Lesson 4: Carbon Dioxide & Stomata
export function StomataVisual() {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 4 Visual: Guard Cell Stomata Pore Opening</h4>
      <p className="text-xs text-[#73949f]">Guard cells swell with water to open the stomata pore for CO₂ gas intake.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 200 120" className="h-36 w-56">
          {/* Guard Cells */}
          <ellipse cx="75" cy="60" rx={open ? 25 : 35} ry="45" fill="#318c60" />
          <ellipse cx="125" cy="60" rx={open ? 25 : 35} ry="45" fill="#318c60" />
          {/* Stomata Pore */}
          <ellipse cx="100" cy="60" rx={open ? 12 : 1} ry="35" fill={open ? "#173c4b" : "#318c60"} />
        </svg>

        <button
          onClick={() => setOpen(!open)}
          className="mt-3 rounded-xl bg-[#159ac1] px-4 py-2 text-xs font-bold text-white"
        >
          {open ? "Close Stomata (Conserve Water)" : "Open Stomata (Absorb CO₂)"}
        </button>
      </div>
    </div>
  );
}

// Lesson 5: Water Absorption by Roots
export function RootXylemVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 5 Visual: Soil Osmosis & Xylem Capillary Transport</h4>
      <p className="text-xs text-[#73949f]">Water absorbed by root hair cells moves up xylem vessels to leaves.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex items-center gap-2 text-sm font-bold text-[#159ac1]">
          <Droplets className="h-5 w-5" /> Soil Water → Root Hair Osmosis → Xylem Vessel Upward Transport
        </div>
      </div>
    </div>
  );
}

// Lesson 6: Chlorophyll & Light Absorption
export function ChlorophyllLightVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Prism Light Spectrum & Reflection Lab</h4>
      <p className="text-xs text-[#73949f]">Chlorophyll absorbs red/blue light wavelengths and reflects green light.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#277f59]">Reflected Green Light (550 nm) gives leaves their green appearance</span>
      </div>
    </div>
  );
}

// Lesson 7: Chemical Reaction of Photosynthesis
export function ChemicalEquationVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Molecular Chemical Balancer</h4>
      <p className="text-xs text-[#73949f]">6 CO₂ + 6 H₂O + Light Energy → C₆H₁₂O₆ (Glucose) + 6 O₂.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4] text-base font-black text-[#159ac1]">
        <span>6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂</span>
      </div>
    </div>
  );
}

// Lesson 8: Glucose Production & Energy Storage (Iodine Starch Lab)
export function GlucoseStarchVisual() {
  const [tested, setTested] = useState(false);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Starch Storage &amp; Iodine Color Test</h4>
          <p className="text-xs text-[#73949f]">Glucose monomers chain into starch polymers; amber iodine reacts into deep blue-black.</p>
        </div>
        <button
          onClick={() => setTested(!tested)}
          className={`px-3 py-1 rounded-lg text-xs font-bold text-white transition ${
            tested ? "bg-slate-700 hover:bg-slate-800" : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {tested ? "Reset Leaf" : "Drop Iodine Solution"}
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Petri Dish with Leaf */}
        <div className="relative h-44 w-64 bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-center">
          {/* Petri Dish Circle */}
          <div className="relative h-36 w-36 rounded-full border-2 border-slate-300 bg-white shadow-inner flex items-center justify-center overflow-hidden">
            {/* Leaf inside petri dish */}
            <path
              d="M 68 20 Q 110 50 80 110 Q 70 120 70 125 Q 70 120 60 110 Q 30 50 68 20 Z"
              fill={tested ? "#1e1b4b" : "#84cc16"}
              className="transition-colors duration-700"
            />
            {/* Dropper */}
            {!tested && (
              <div className="absolute top-2 right-4 flex flex-col items-center animate-bounce">
                <div className="h-6 w-2 bg-amber-400 rounded-t" />
                <div className="h-2 w-1 bg-amber-600" />
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1" />
              </div>
            )}
          </div>
        </div>

        {/* Glucose Monomer Chain */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto p-2 bg-slate-50 rounded-lg border border-slate-200 w-full max-w-sm justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="h-6 w-8 bg-emerald-100 border border-emerald-400 rounded flex items-center justify-center text-[9px] font-bold text-emerald-800">
                Glucose
              </div>
              {i < 4 && <span className="text-emerald-600 text-xs px-0.5">━</span>}
            </div>
          ))}
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          {tested
            ? "✅ Positive reaction: Iodine turns deep midnight blue-black, proving presence of stored starch!"
            : "Click 'Drop Iodine Solution' to test whether the leaf stored glucose as starch polymers."}
        </p>
      </div>
    </div>
  );
}

// Lesson 9: Oxygen Release (Elodea Submerged Bubble Counter)
export function OxygenReleaseVisual() {
  const [lightDistance, setLightDistance] = useState(20); // 10 to 60 cm
  // Closer light = more bubbles
  const bubblesPerMin = Math.round(50 - (lightDistance / 60) * 40);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Elodea Submerged Oxygen Bubbler</h4>
          <p className="text-xs text-[#73949f]">Aquatic plants release visible oxygen gas bubbles proportional to light intensity.</p>
        </div>
        <span className="rounded-lg bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
          Rate: {bubblesPerMin} O₂ Bubbles / min
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="relative h-44 w-72 bg-gradient-to-r from-amber-50/50 via-sky-50 to-sky-100 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
          {/* Light Lamp */}
          <div className="flex flex-col items-center">
            <Sun className="h-10 w-10 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-800 mt-1">{lightDistance} cm</span>
          </div>

          {/* Test tube with submerged water weed */}
          <div className="h-36 w-20 border-x-2 border-b-2 border-slate-400 rounded-b-2xl bg-cyan-100/60 relative overflow-hidden flex flex-col justify-end items-center">
            {/* Water */}
            <div className="w-full h-32 bg-sky-300/40 relative flex items-end justify-center">
              {/* Plant sprig */}
              <div className="w-2 h-20 bg-emerald-600 rounded-t relative">
                <div className="absolute -left-2 top-2 h-1.5 w-3 bg-emerald-500 rounded-full" />
                <div className="absolute -right-2 top-6 h-1.5 w-3 bg-emerald-500 rounded-full" />
                <div className="absolute -left-2 top-10 h-1.5 w-3 bg-emerald-500 rounded-full" />
              </div>

              {/* Animated rising oxygen bubbles */}
              <div className="absolute top-2 left-6 h-2 w-2 rounded-full bg-white/80 animate-ping" />
              <div className="absolute top-8 right-6 h-1.5 w-1.5 rounded-full bg-white/80 animate-bounce" />
              <div className="absolute top-16 left-8 h-2.5 w-2.5 rounded-full bg-white/90 animate-ping" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {/* Distance Slider */}
        <div className="mt-4 w-full max-w-xs flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">Close Light</span>
          <input
            type="range"
            min="10"
            max="60"
            value={lightDistance}
            onChange={(e) => setLightDistance(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <span className="text-xs font-bold text-slate-600">Far Light</span>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          Moving the lamp closer increases photon energy, accelerating the rate of water photolysis and oxygen production!
        </p>
      </div>
    </div>
  );
}

// Lesson 10: Factors Affecting Photosynthesis Rate (Dynamic Curve Lab)
export function LimitingFactorsVisual() {
  const [light, setLight] = useState(60);
  const [co2, setCo2] = useState(50);
  const [temp, setTemp] = useState(25);

  // Rate is limited by whichever factor is lowest (Liebig's Law of the Minimum)
  const tempEfficiency = temp < 10 ? 20 : temp > 40 ? 15 : 100 - Math.abs(28 - temp) * 3;
  const rate = Math.round(Math.min(light, co2, tempEfficiency));

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Limiting Factor Rate Simulator</h4>
          <p className="text-xs text-[#73949f]">Photosynthesis rate is bottlenecked by whichever factor is lowest.</p>
        </div>
        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          Overall Rate: {rate}% Max
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Dynamic Rate Bar */}
        <div className="w-full max-w-sm bg-slate-100 h-6 rounded-full overflow-hidden p-1 border border-slate-200 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-[#159ac1] rounded-full transition-all duration-300"
            style={{ width: `${rate}%` }}
          />
        </div>

        {/* 3 Slider Controls */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md text-xs">
          <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 flex flex-col gap-1">
            <span className="font-bold text-amber-800">Light: {light}%</span>
            <input
              type="range"
              min="10"
              max="100"
              value={light}
              onChange={(e) => setLight(Number(e.target.value))}
              className="accent-amber-500 h-1.5"
            />
          </div>

          <div className="p-2 bg-sky-50 rounded-lg border border-sky-200 flex flex-col gap-1">
            <span className="font-bold text-sky-800">CO₂ Level: {co2}%</span>
            <input
              type="range"
              min="10"
              max="100"
              value={co2}
              onChange={(e) => setCo2(Number(e.target.value))}
              className="accent-sky-500 h-1.5"
            />
          </div>

          <div className="p-2 bg-rose-50 rounded-lg border border-rose-200 flex flex-col gap-1">
            <span className="font-bold text-rose-800">Temp: {temp}°C</span>
            <input
              type="range"
              min="5"
              max="45"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="accent-rose-500 h-1.5"
            />
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          Even if light is at 100%, if CO₂ or temperature is low, the overall rate remains strictly limited!
        </p>
      </div>
    </div>
  );
}

// Lesson 11: Ecosystem Importance & Plant Life (10% Energy Pyramid)
export function EcosystemEnergyVisual() {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const levels = [
    { title: "Apex Carnivores (Eagle)", energy: "10 Joules", color: "#f87171", pct: "w-24" },
    { title: "Secondary Consumers (Fox)", energy: "100 Joules", color: "#fb923c", pct: "w-36" },
    { title: "Primary Consumers (Rabbit)", energy: "1,000 Joules", color: "#facc15", pct: "w-48" },
    { title: "Primary Producers (Plants)", energy: "10,000 Joules", color: "#4ade80", pct: "w-60" },
  ];

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Trophic 10% Energy Pyramid</h4>
          <p className="text-xs text-[#73949f]">Plants capture solar energy, transferring approximately 10% to each higher trophic level.</p>
        </div>
        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          90% Lost as Heat
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Trophic Pyramid Bars */}
        <div className="flex flex-col items-center gap-1.5 w-full max-w-sm">
          {levels.map((lvl, i) => (
            <div
              key={lvl.title}
              onMouseEnter={() => setHoveredLevel(i)}
              className={`${lvl.pct} h-9 rounded-lg flex items-center justify-between px-3 text-xs font-bold shadow-xs transition-all duration-300 cursor-pointer ${
                hoveredLevel === i ? "scale-105 shadow-md" : ""
              }`}
              style={{ backgroundColor: lvl.color }}
            >
              <span className="truncate text-slate-900">{lvl.title}</span>
              <span className="text-[11px] font-mono font-bold text-slate-800 ml-1">{lvl.energy}</span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-slate-600 text-center font-medium">
          Every animal ecosystem relies on the massive 10,000 J foundational base produced exclusively by plants!
        </p>
      </div>
    </div>
  );
}

// Lesson 12: Photosynthesis vs Cellular Respiration
export function RespirationCycleVisual() {
  const [mode, setMode] = useState<"day" | "night">("day");
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: Day vs Night Energy Cycle</h4>
          <p className="text-xs text-[#73949f]">Photosynthesis creates glucose during day; respiration releases ATP day & night.</p>
        </div>
        <span className={`rounded-lg px-3 py-1 text-xs font-bold ${mode === "day" ? "bg-[#fff8e6] text-[#d97706]" : "bg-[#edf2f7] text-[#4a5568]"}`}>
          {mode === "day" ? "Daytime (Photosynthesis > Respiration)" : "Nighttime (Respiration only)"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="grid grid-cols-2 gap-4 w-full max-w-md text-xs">
          <div className="rounded-xl bg-[#eaf7f1] p-3 border border-[#bce8d4]">
            <span className="font-bold text-[#277f59]">Photosynthesis (Chloroplasts)</span>
            <p className="mt-1 text-[#456b57]">6 CO₂ + 6 H₂O + Light → C₆H₁₂O₆ + 6 O₂</p>
            <p className="mt-1 font-semibold text-[#277f59]">{mode === "day" ? "Active (Making food & O₂)" : "Inactive (No sunlight)"}</p>
          </div>
          <div className="rounded-xl bg-[#e8f8fc] p-3 border border-[#bce3ed]">
            <span className="font-bold text-[#159ac1]">Cellular Respiration (Mitochondria)</span>
            <p className="mt-1 text-[#3b6370]">C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP</p>
            <p className="mt-1 font-semibold text-[#159ac1]">Active (Continuous energy release)</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setMode("day")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === "day" ? "bg-[#f59e0b] text-white" : "bg-[#fff8e6] text-[#d97706]"}`}
          >
            Daytime Conditions
          </button>
          <button
            onClick={() => setMode("night")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === "night" ? "bg-[#173c4b] text-white" : "bg-[#edf2f7] text-[#4a5568]"}`}
          >
            Nighttime Conditions
          </button>
        </div>
      </div>
    </div>
  );
}

