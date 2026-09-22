import React, { useState } from "react";
import { Flame, Snowflake, Sliders } from "lucide-react";

// Lesson 1: Introduction to Matter & Atoms
export function AtomMatterVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 1 Visual: Mass & Volume Balance Displacement</h4>
      <p className="text-xs text-[#73949f]">Matter is anything that has mass and takes up volume space.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex gap-4 text-xs font-bold text-[#159ac1]">
          <span className="rounded-lg bg-[#e8f8fc] px-4 py-2">Mass Scale: 250 grams</span>
          <span className="rounded-lg bg-[#eaf7f1] px-4 py-2 text-[#277f59]">Displacement Volume: 250 mL</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 2: Properties of Solids
export function SolidPropertiesVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Rigid 2D Solid Lattice Simulation</h4>
      <p className="text-xs text-[#73949f]">Solids have a definite shape and fixed volume; particles vibrate in place.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 160 120" className="h-32 w-44">
          <rect x="20" y="10" width="120" height="100" rx="12" fill="#e8f8fc" stroke="#159ac1" strokeWidth="2" />
          <g fill="#159ac1">
            <circle cx="45" cy="35" r="10" />
            <circle cx="80" cy="35" r="10" />
            <circle cx="115" cy="35" r="10" />
            <circle cx="45" cy="65" r="10" />
            <circle cx="80" cy="65" r="10" />
            <circle cx="115" cy="65" r="10" />
            <circle cx="45" cy="95" r="10" />
            <circle cx="80" cy="95" r="10" />
            <circle cx="115" cy="95" r="10" />
          </g>
        </svg>
        <span className="mt-2 text-xs font-bold text-[#159ac1]">Fixed Lattice Arrangement</span>
      </div>
    </div>
  );
}

// Lesson 3: Properties of Liquids
export function LiquidPropertiesVisual() {
  const [container, setContainer] = useState<"cylinder" | "beaker" | "flask">("cylinder");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Container Shape Adaptor</h4>
      <p className="text-xs text-[#73949f]">Liquids maintain constant volume but adapt to container shape.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-sm font-bold text-[#277f59]">
          100 mL Liquid in {container === "cylinder" ? "Graduated Cylinder" : container === "beaker" ? "Wide Beaker" : "Erlenmeyer Flask"}
        </span>

        <div className="mt-3 flex gap-2">
          <button onClick={() => setContainer("cylinder")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${container === "cylinder" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Cylinder</button>
          <button onClick={() => setContainer("beaker")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${container === "beaker" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Beaker</button>
          <button onClick={() => setContainer("flask")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${container === "flask" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Flask</button>
        </div>
      </div>
    </div>
  );
}

// Lesson 4: Properties of Gases
export function GasPropertiesVisual() {
  const [compressed, setCompressed] = useState(false);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 4 Visual: Gas Syringe Piston Compressor</h4>
      <p className="text-xs text-[#73949f]">Gases fill any volume and compress easily under applied pressure.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 240 100" className="h-32 w-full max-w-md">
          {/* Cylinder */}
          <rect x="20" y="20" width="180" height="60" rx="8" fill="#e8f8fc" stroke="#159ac1" strokeWidth="3" />
          {/* Piston */}
          <rect x={compressed ? "110" : "170"} y="21" width="15" height="58" fill="#1d596b" />
          <line x1={compressed ? "125" : "185"} y1="50" x2="230" y2="50" stroke="#1d596b" strokeWidth="6" />

          {/* Particles */}
          <circle cx="40" cy="40" r="5" fill="#159ac1" />
          <circle cx="70" cy="60" r="5" fill="#159ac1" />
          <circle cx="90" cy="35" r="5" fill="#159ac1" />
        </svg>

        <button
          onClick={() => setCompressed(!compressed)}
          className="mt-3 rounded-xl bg-[#159ac1] px-4 py-2 text-xs font-bold text-white"
        >
          {compressed ? "Release Piston (Expand Volume)" : "Push Piston (Compress Volume)"}
        </button>
      </div>
    </div>
  );
}

// Lesson 6: Melting & Freezing
export function MeltingFreezingVisual() {
  const [temp, setTemp] = useState(0);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Thermometer Phase Transition Lab</h4>
      <p className="text-xs text-[#73949f]">Water freezes and ice melts at 0°C.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-base font-bold text-[#159ac1]">Temperature: {temp}°C</span>
        <input
          type="range"
          min="-15"
          max="35"
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className="mt-3 h-2 w-48 accent-[#159ac1]"
        />
        <span className="mt-2 text-xs font-bold text-[#277f59]">
          {temp < 0 ? "Solid Ice Crystal" : temp === 0 ? "Melting / Freezing Point" : "Liquid Water Flow"}
        </span>
      </div>
    </div>
  );
}

// Lesson 7: Evaporation & Condensation
export function EvaporationCondensationVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Condensation Surface Dew Mirror</h4>
      <p className="text-xs text-[#73949f]">Cooling gas vapor creates liquid water droplets.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Vapor Steam + Cold Surface → Condensation Droplets</span>
      </div>
    </div>
  );
}

// Lesson 8: Sublimation & Deposition
export function SublimationVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Dry Ice Sublimation Chamber</h4>
      <p className="text-xs text-[#73949f]">Solid CO₂ turns directly into gas smoke without melting.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#bd6d39]">Solid CO₂ → Direct Gas Smoke</span>
      </div>
    </div>
  );
}

// Lesson 9: Temperature & Kinetic Energy
export function KineticEnergyVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Hot vs Cold Dye Diffusion Lab</h4>
      <p className="text-xs text-[#73949f]">Higher temperature increases particle kinetic speed.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Hot Water (Fast Diffusion) vs Cold Water (Slow)</span>
      </div>
    </div>
  );
}

// Lesson 10: Gas Pressure & Volume
export function GasPressureVolumeVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Boyle's Law Piston Pressure Gauge</h4>
      <p className="text-xs text-[#73949f]">Decreasing volume increases particle collisions and pressure gauge.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">P1 × V1 = P2 × V2</span>
      </div>
    </div>
  );
}

// Lesson 11: Phase Changes in Daily Life
export function WaterCyclePhaseVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Water Cycle Phase Transformation</h4>
      <p className="text-xs text-[#73949f]">Evaporation → Condensation → Precipitation → Collection.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#277f59]">Global Water Cycle Phase Transformations</span>
      </div>
    </div>
  );
}
