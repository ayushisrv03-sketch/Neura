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

// Lesson 8: Glucose Production & Energy Storage
export function GlucoseStarchVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Starch Storage Iodine Lab</h4>
      <p className="text-xs text-[#73949f]">Glucose monomers chain into starch polymers; iodine turns blue-black.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Glucose Monomers → Starch Storage Polymers</span>
      </div>
    </div>
  );
}

// Lesson 9: Oxygen Release
export function OxygenReleaseVisual() {
  const [bubbles, setBubbles] = useState(15);
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Elodea Underwater Oxygen Counter</h4>
      <p className="text-xs text-[#73949f]">Submerged aquatic plants release visible oxygen gas bubbles in sunlight.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-base font-bold text-[#159ac1]">Rate: {bubbles} Oxygen Bubbles / minute</span>
      </div>
    </div>
  );
}

// Lesson 10: Factors Affecting Photosynthesis Rate
export function LimitingFactorsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Limiting Factor Rate Grapher</h4>
      <p className="text-xs text-[#73949f]">Light, CO₂, and temperature bottleneck maximum photosynthetic rate.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Rate vs Light Intensity & Temperature Curve</span>
      </div>
    </div>
  );
}

// Lesson 11: Ecosystem Importance & Plant Life
export function EcosystemEnergyVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Solar Energy Food Pyramid</h4>
      <p className="text-xs text-[#73949f]">Plants act as primary producers converting sunlight for all animal life.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-sm font-bold text-[#277f59]">Sun → Primary Producers (Plants) → Consumers</span>
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

