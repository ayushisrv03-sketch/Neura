import React, { useState, useEffect } from "react";
import {
  Flame,
  Snowflake,
  Sliders,
  Scale,
  Droplets,
  Wind,
  Sparkles,
  RefreshCw,
  Gauge,
  Thermometer,
  Layers,
  ArrowRight,
  Sun,
  Activity
} from "lucide-react";

// Lesson 1: Introduction to Matter & Atoms (Mass & Volume Displacement)
export function AtomMatterVisual() {
  const objects = [
    { name: "Dense Iron Block", mass: 250, volume: 50, color: "#475569", accent: "#64748b" },
    { name: "Granite Stone", mass: 260, volume: 100, color: "#1e293b", accent: "#475569" },
    { name: "Aluminum Cube", mass: 135, volume: 50, color: "#0ea5e9", accent: "#38bdf8" },
    { name: "Hardwood Block", mass: 70, volume: 100, color: "#b45309", accent: "#d97706" },
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [submerged, setSubmerged] = useState(false);
  const activeObj = objects[selectedIdx];

  const baseWater = 200; // mL
  const currentWater = submerged ? baseWater + activeObj.volume : baseWater;
  const cylinderHeightPct = (currentWater / 350) * 100;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 1 Visual: Mass & Volume Displacement Lab</h4>
          <p className="text-xs text-[#73949f]">Matter is anything that has mass and takes up volume space.</p>
        </div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
          Live Physics Simulation
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-center rounded-xl bg-white p-5 border border-[#e3f1f4] shadow-sm">
        {/* Left: Mass Balance Scale */}
        <div className="flex flex-col items-center justify-between p-4 bg-slate-50/70 rounded-xl border border-slate-100 min-h-[220px]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-2">
            <Scale className="h-4 w-4 text-[#159ac1]" />
            <span>Digital Precision Mass Scale</span>
          </div>

          <div className="flex flex-col items-center justify-center my-auto">
            {/* Object resting on scale platform */}
            <div
              className="h-12 w-16 rounded-lg shadow-md flex items-center justify-center text-white text-xs font-bold transition-all duration-500 transform"
              style={{
                backgroundColor: activeObj.color,
                transform: submerged ? "scale(0.85) translateY(10px) opacity-30" : "scale(1)",
              }}
            >
              {activeObj.mass}g
            </div>
            {/* Scale platform */}
            <div className="w-28 h-2 bg-slate-400 rounded-full mt-1" />
            <div className="w-6 h-6 bg-slate-300 mx-auto" />
            <div className="w-36 h-10 bg-slate-800 rounded-xl flex items-center justify-center shadow-inner">
              <span className="font-mono text-emerald-400 font-bold text-sm tracking-wider">
                {submerged ? "0.0 g (in fluid)" : `${activeObj.mass}.0 g`}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-center text-slate-500 mt-2">
            <strong>Mass Property:</strong> Quantifies the total substance inside the object.
          </div>
        </div>

        {/* Right: Graduated Cylinder with Animated Displacement */}
        <div className="flex flex-col items-center p-4 bg-sky-50/50 rounded-xl border border-sky-100 min-h-[220px]">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-800 mb-2">
            <Droplets className="h-4 w-4 text-sky-600" />
            <span>Graduated Cylinder Volume Displacement</span>
          </div>

          <div className="relative h-44 w-28 border-x-4 border-b-4 border-slate-400 rounded-b-2xl bg-white/80 overflow-hidden flex flex-col justify-end shadow-inner">
            {/* Measurement Ticks */}
            <div className="absolute right-1 top-4 text-[9px] font-mono text-slate-400">300mL —</div>
            <div className="absolute right-1 top-12 text-[9px] font-mono text-slate-400">250mL —</div>
            <div className="absolute right-1 top-20 text-[9px] font-mono text-slate-400">200mL —</div>
            <div className="absolute right-1 top-28 text-[9px] font-mono text-slate-400">150mL —</div>
            <div className="absolute right-1 top-36 text-[9px] font-mono text-slate-400">100mL —</div>

            {/* Submerged Object inside liquid */}
            {submerged && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-3 h-10 w-12 rounded shadow flex items-center justify-center text-[10px] text-white font-bold animate-bounce"
                style={{ backgroundColor: activeObj.color }}
              >
                {activeObj.volume}mL
              </div>
            )}

            {/* Liquid Layer */}
            <div
              className="w-full bg-gradient-to-t from-sky-400/80 to-cyan-300/70 transition-all duration-700 relative"
              style={{ height: `${cylinderHeightPct}%` }}
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-cyan-200/90 rounded-full animate-pulse" />
              {/* Air bubbles when submerged */}
              {submerged && (
                <>
                  <div className="absolute bottom-2 left-3 h-1.5 w-1.5 rounded-full bg-white/70 animate-ping" />
                  <div className="absolute bottom-6 right-4 h-2 w-2 rounded-full bg-white/80 animate-bounce" />
                </>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Displaced Volume:</span>
            <span className="font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
              {submerged ? `+${activeObj.volume} mL (${currentWater} mL total)` : `${baseWater} mL (base)`}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {objects.map((obj, i) => (
            <button
              key={obj.name}
              onClick={() => setSelectedIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedIdx === i
                  ? "bg-[#159ac1] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {obj.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSubmerged(!submerged)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition ${
            submerged ? "bg-amber-600 hover:bg-amber-700" : "bg-[#159ac1] hover:bg-[#0e7795]"
          }`}
        >
          <RefreshCw className={`h-3.5 w-3.5 ${submerged ? "animate-spin" : ""}`} />
          {submerged ? "Lift Object Out of Water" : "Submerge Object into Water"}
        </button>
      </div>

      <div className="mt-3 rounded-xl bg-sky-50/70 p-3 text-xs text-sky-900 border border-sky-100 flex items-center justify-between">
        <span>
          <strong>Key Takeaway:</strong> Matter possesses both measurable <strong>Mass</strong> ({activeObj.mass}g) and physical <strong>Volume</strong> ({activeObj.volume} mL of displaced space).
        </span>
      </div>
    </div>
  );
}

// Lesson 2: Properties of Solids (Vibrating Lattice Simulation)
export function SolidPropertiesVisual() {
  const [temperature, setTemperature] = useState(20);
  const [stressed, setStressed] = useState(false);

  // Vibration intensity based on temperature
  const vibAmplitude = Math.max(1, (temperature / 100) * 4);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Rigid 2D Solid Lattice Vibration</h4>
          <p className="text-xs text-[#73949f]">Solids hold a fixed shape and fixed volume; particles vibrate around fixed equilibrium points.</p>
        </div>
        <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800">
          Fixed Crystal Grid
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Animated 3x3 Lattice with Springs */}
        <div className="relative h-44 w-64 bg-slate-50 rounded-xl p-4 border border-slate-200 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 200 140" className="w-full h-full">
            {/* Spring Bonds */}
            <g stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3">
              {/* Horizontal bonds */}
              <line x1="40" y1="30" x2="100" y2="30" />
              <line x1="100" y1="30" x2="160" y2="30" />
              <line x1="40" y1="70" x2="100" y2="70" />
              <line x1="100" y1="70" x2="160" y2="70" />
              <line x1="40" y1="110" x2="100" y2="110" />
              <line x1="100" y1="110" x2="160" y2="110" />
              {/* Vertical bonds */}
              <line x1="40" y1="30" x2="40" y2="70" />
              <line x1="40" y1="70" x2="40" y2="110" />
              <line x1="100" y1="30" x2="100" y2="70" />
              <line x1="100" y1="70" x2="100" y2="110" />
              <line x1="160" y1="30" x2="160" y2="70" />
              <line x1="160" y1="70" x2="160" y2="110" />
            </g>

            {/* Atoms with animated jitter */}
            {[
              { x: 40, y: 30 }, { x: 100, y: 30 }, { x: 160, y: 30 },
              { x: 40, y: 70 }, { x: 100, y: 70 }, { x: 160, y: 70 },
              { x: 40, y: 110 }, { x: 100, y: 110 }, { x: 160, y: 110 }
            ].map((pt, i) => (
              <g key={i} className="animate-pulse">
                <circle
                  cx={stressed ? pt.x + (i % 2 === 0 ? 3 : -3) : pt.x}
                  cy={pt.y}
                  r="12"
                  fill="url(#solidAtomGrad)"
                  stroke="#0284c7"
                  strokeWidth="2"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(2,132,199,0.3))"
                  }}
                />
                <circle
                  cx={stressed ? pt.x + (i % 2 === 0 ? 3 : -3) - 3 : pt.x - 3}
                  cy={pt.y - 3}
                  r="3"
                  fill="white"
                  opacity="0.8"
                />
              </g>
            ))}

            <defs>
              <radialGradient id="solidAtomGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="mt-4 w-full max-w-sm flex items-center justify-between gap-4 text-xs">
          <span className="font-semibold text-slate-600">Thermal Vibration: {temperature}°C</span>
          <input
            type="range"
            min="0"
            max="80"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <button
            onClick={() => setStressed(!stressed)}
            className="px-3 py-1.5 rounded-lg bg-sky-100 text-sky-800 font-bold hover:bg-sky-200 transition"
          >
            {stressed ? "Release Force" : "Apply Shear Force"}
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          Notice how the atoms cannot break free of their lattice positions—they spring back into place immediately!
        </p>
      </div>
    </div>
  );
}

// Lesson 3: Properties of Liquids (Container Adaptor Animation)
export function LiquidPropertiesVisual() {
  const [container, setContainer] = useState<"cylinder" | "beaker" | "flask">("cylinder");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Fluid Shape Adaptation Simulator</h4>
          <p className="text-xs text-[#73949f]">Liquids maintain constant volume (100 mL) while freely taking the shape of any container.</p>
        </div>
        <span className="rounded-lg bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800">
          Fluid Flow Mechanics
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Animated SVG Vessel */}
        <div className="h-48 w-64 flex items-center justify-center bg-slate-50/50 rounded-xl p-3 border border-slate-100">
          <svg viewBox="0 0 200 160" className="w-full h-full">
            {container === "cylinder" && (
              <g className="transition-all duration-500">
                {/* Cylinder Outline */}
                <rect x="75" y="20" width="50" height="120" rx="4" fill="none" stroke="#64748b" strokeWidth="3" />
                {/* 100mL Liquid Fill (Tall & Narrow) */}
                <rect x="77" y="55" width="46" height="83" rx="2" fill="#06b6d4" opacity="0.8" />
                {/* Moving fluid waves */}
                <path d="M 77 55 Q 88 52, 100 55 T 123 55 L 123 60 L 77 60 Z" fill="#22d3ee" />
                {/* Sliding particles */}
                <circle cx="90" cy="80" r="4" fill="white" opacity="0.6" className="animate-ping" />
                <circle cx="110" cy="110" r="3.5" fill="white" opacity="0.6" />
                <circle cx="95" cy="125" r="4" fill="white" opacity="0.5" />
              </g>
            )}

            {container === "beaker" && (
              <g className="transition-all duration-500">
                {/* Beaker Outline (Wide) */}
                <path d="M 45 30 L 45 140 Q 45 145, 55 145 L 145 145 Q 155 145, 155 140 L 155 30" fill="none" stroke="#64748b" strokeWidth="3" />
                {/* 100mL Liquid Fill (Wide & Low Level) */}
                <rect x="47" y="95" width="106" height="48" rx="2" fill="#06b6d4" opacity="0.8" />
                <path d="M 47 95 Q 73 92, 100 95 T 153 95 L 153 100 L 47 100 Z" fill="#22d3ee" />
                <circle cx="70" cy="115" r="4" fill="white" opacity="0.6" className="animate-ping" />
                <circle cx="130" cy="120" r="3.5" fill="white" opacity="0.6" />
                <circle cx="100" cy="130" r="4" fill="white" opacity="0.5" />
              </g>
            )}

            {container === "flask" && (
              <g className="transition-all duration-500">
                {/* Flask Outline (Narrow neck, wide conical base) */}
                <path d="M 85 20 L 85 50 L 40 140 Q 38 145, 45 145 L 155 145 Q 162 145, 160 140 L 115 50 L 115 20" fill="none" stroke="#64748b" strokeWidth="3" />
                {/* Conical Liquid Fill */}
                <path d="M 60 100 L 42 143 L 158 143 L 140 100 Z" fill="#06b6d4" opacity="0.8" />
                <circle cx="75" cy="125" r="4" fill="white" opacity="0.6" className="animate-ping" />
                <circle cx="125" cy="130" r="3.5" fill="white" opacity="0.6" />
                <circle cx="100" cy="115" r="4" fill="white" opacity="0.5" />
              </g>
            )}
          </svg>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Choose Vessel:</span>
          {(["cylinder", "beaker", "flask"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setContainer(c)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition ${
                container === c ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
              }`}
            >
              {c === "cylinder" ? "Graduated Cylinder" : c === "beaker" ? "Wide Beaker" : "Erlenmeyer Flask"}
            </button>
          ))}
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          In all three vessels, the volume remains exactly <strong>100 mL</strong>, but the fluid shape adapts seamlessly!
        </p>
      </div>
    </div>
  );
}

// Lesson 4: Properties of Gases (Syringe Piston Compressor)
export function GasPropertiesVisual() {
  const [volume, setVolume] = useState(70); // 20 to 100 mL
  const pressure = Math.round((100 / Math.max(20, volume)) * 10) / 10; // Boyle's law P ~ 1/V

  // Number of particles
  const particleCount = 18;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 4 Visual: Gas Syringe Piston Compressor</h4>
          <p className="text-xs text-[#73949f]">Gases expand to fill any volume and compress easily under applied pressure.</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
            P = {pressure} atm
          </span>
          <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800">
            V = {volume} mL
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Animated Syringe SVG */}
        <div className="relative w-full max-w-md h-36 bg-slate-50 rounded-xl p-3 border border-slate-200 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 320 120" className="w-full h-full">
            {/* Syringe Barrel */}
            <rect x="20" y="25" width="220" height="70" rx="8" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
            <path d="M 20 50 L 5 50 L 5 70 L 20 70 Z" fill="#334155" />

            {/* Gas Chamber Volume Fill */}
            <rect
              x="22"
              y="27"
              width={(volume / 100) * 210}
              height="66"
              fill="#e0f2fe"
              opacity="0.8"
            />

            {/* Animated Bouncing Gas Particles */}
            {Array.from({ length: particleCount }).map((_, i) => {
              const xPos = 30 + ((i * 19) % Math.max(10, ((volume / 100) * 190)));
              const yPos = 35 + ((i * 13) % 50);
              return (
                <circle
                  key={i}
                  cx={xPos}
                  cy={yPos}
                  r="3.5"
                  fill="#0284c7"
                  className="animate-pulse"
                />
              );
            })}

            {/* Movable Piston Head */}
            <rect
              x={22 + (volume / 100) * 210}
              y="26"
              width="14"
              height="68"
              fill="#1e293b"
              rx="2"
            />
            {/* Piston Rod */}
            <rect
              x={36 + (volume / 100) * 210}
              y="55"
              width="90"
              height="10"
              fill="#475569"
            />
            <rect
              x={126 + (volume / 100) * 210}
              y="40"
              width="8"
              height="40"
              rx="3"
              fill="#1e293b"
            />
          </svg>
        </div>

        {/* Compression Slider */}
        <div className="mt-4 w-full max-w-sm flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">Compress</span>
          <input
            type="range"
            min="20"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <span className="text-xs font-bold text-slate-600">Expand</span>
        </div>

        <p className="mt-2 text-xs text-slate-500 text-center">
          When volume decreases, gas particles collide against the container walls much more frequently, raising pressure!
        </p>
      </div>
    </div>
  );
}

// Lesson 6: Melting & Freezing (Phase Transition Lab)
export function MeltingFreezingVisual() {
  const [temp, setTemp] = useState(0);

  const isSolid = temp < 0;
  const isTransition = temp === 0;
  const isLiquid = temp > 0;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Thermometer Phase Transition Lab</h4>
          <p className="text-xs text-[#73949f]">Water freezes and ice melts at the exact 0°C phase boundary.</p>
        </div>
        <span
          className={`rounded-lg px-3 py-1 text-xs font-bold ${
            isSolid ? "bg-cyan-100 text-cyan-800" : isTransition ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800"
          }`}
        >
          {isSolid ? "Solid Ice Crystal" : isTransition ? "0°C Phase Equilibrium" : "Liquid Water"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Visual Crucible / Beaker */}
        <div className="relative h-44 w-60 bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-center overflow-hidden">
          {isSolid && (
            <div className="flex flex-col items-center animate-pulse">
              <Snowflake className="h-16 w-16 text-cyan-500 animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-xs font-bold text-cyan-700 mt-2">Locked Hexagonal Ice Crystal</span>
            </div>
          )}

          {isTransition && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-cyan-200 border-2 border-cyan-400 rounded-md rotate-12 flex items-center justify-center text-[10px] font-bold text-cyan-800 shadow">
                  Ice
                </div>
                <Droplets className="h-8 w-8 text-sky-500 animate-bounce" />
                <div className="h-8 w-8 bg-sky-300/70 rounded-full" />
              </div>
              <span className="text-xs font-bold text-amber-600 mt-3 animate-pulse">
                Melting &amp; Freezing Coexisting
              </span>
            </div>
          )}

          {isLiquid && (
            <div className="flex flex-col items-center w-full">
              <div className="h-16 w-36 bg-gradient-to-t from-sky-500 to-cyan-300 rounded-b-2xl relative overflow-hidden shadow">
                <div className="absolute inset-x-0 top-0 h-2 bg-white/40 animate-pulse" />
                <div className="absolute bottom-2 left-4 h-2 w-2 rounded-full bg-white/70 animate-ping" />
                <div className="absolute bottom-3 right-6 h-1.5 w-1.5 rounded-full bg-white/70 animate-bounce" />
              </div>
              <span className="text-xs font-bold text-sky-700 mt-2">Liquid Water Flowing Freely</span>
            </div>
          )}
        </div>

        {/* Temperature Range Slider */}
        <div className="mt-4 w-full max-w-sm flex items-center gap-3">
          <Snowflake className="h-4 w-4 text-cyan-600" />
          <input
            type="range"
            min="-15"
            max="30"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <Flame className="h-4 w-4 text-amber-500" />
          <span className="font-mono font-bold text-sm text-slate-800 min-w-12 text-right">
            {temp}°C
          </span>
        </div>
      </div>
    </div>
  );
}

// Lesson 7: Evaporation & Condensation (Surface Dew Mirror Lab)
export function EvaporationCondensationVisual() {
  const [heating, setHeating] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Condensation & Evaporation Cycle</h4>
          <p className="text-xs text-[#73949f]">Boiling liquid creates vapor steam; cooling on cold glass produces condensation drops.</p>
        </div>
        <button
          onClick={() => setHeating(!heating)}
          className={`px-3 py-1 text-xs font-bold rounded-lg text-white transition ${
            heating ? "bg-amber-600 hover:bg-amber-700" : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {heating ? "Turn Off Flame" : "Light Burner Flame"}
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="relative h-48 w-72 bg-slate-50 rounded-xl p-3 border border-slate-200 overflow-hidden flex flex-col justify-between items-center">
          {/* Cold Glass Mirror Surface at top */}
          <div className="w-56 h-4 bg-sky-200/80 border border-sky-400 rounded-full flex items-center justify-around px-4 relative">
            <span className="text-[9px] font-bold text-sky-800 -top-3 absolute">Cold Glass Condensation Plate</span>
            {/* Condensed Water Drops dripping down */}
            {heating && (
              <>
                <div className="h-2 w-2 rounded-full bg-sky-600 animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-sky-600 animate-ping" />
                <div className="h-2 w-2 rounded-full bg-sky-600 animate-bounce" style={{ animationDelay: "0.2s" }} />
              </>
            )}
          </div>

          {/* Steam Vapors Rising */}
          {heating && (
            <div className="flex gap-4 my-2">
              <div className="h-8 w-1 bg-gradient-to-t from-transparent via-cyan-300 to-transparent rounded animate-pulse" />
              <div className="h-10 w-1.5 bg-gradient-to-t from-transparent via-sky-300 to-transparent rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="h-7 w-1 bg-gradient-to-t from-transparent via-cyan-300 to-transparent rounded animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          )}

          {/* Boiling Beaker with Flame underneath */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-14 border-x-2 border-b-2 border-slate-400 rounded-b-xl bg-cyan-100/60 relative overflow-hidden flex items-end justify-center">
              <div className="w-full h-8 bg-sky-400/80" />
              {heating && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
            </div>
            {heating ? (
              <Flame className="h-6 w-6 text-amber-500 animate-bounce mt-1" />
            ) : (
              <div className="h-6 text-[10px] font-semibold text-slate-400 mt-1">Flame Off</div>
            )}
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-600 text-center">
          <strong>Process:</strong> Liquid Water <ArrowRight className="inline h-3 w-3 text-amber-500" /> Steam Vapor (Gas) <ArrowRight className="inline h-3 w-3 text-sky-500" /> Liquid Droplets (Dew).
        </div>
      </div>
    </div>
  );
}

// Lesson 8: Sublimation & Deposition (Dry Ice Chamber)
export function SublimationVisual() {
  const [sublimating, setSublimating] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Dry Ice Sublimation Chamber</h4>
          <p className="text-xs text-[#73949f]">Solid CO₂ transitions directly into dense gas smoke without ever melting into liquid.</p>
        </div>
        <span className="rounded-lg bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
          Direct Phase Jump
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="relative h-44 w-64 bg-slate-900 rounded-xl p-4 border border-slate-800 overflow-hidden flex flex-col items-center justify-end">
          {/* Billowing Gas Clouds */}
          {sublimating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-80">
              <div className="h-14 w-28 rounded-full bg-violet-400/40 blur-md animate-pulse" />
              <div className="h-10 w-36 rounded-full bg-purple-300/30 blur-lg animate-bounce" />
            </div>
          )}

          {/* Solid Dry Ice Slab */}
          <div className="h-12 w-24 bg-gradient-to-t from-slate-200 to-white rounded-md shadow-lg border border-slate-300 flex items-center justify-center z-10">
            <span className="text-[10px] font-bold text-slate-800">Solid CO₂ (-78°C)</span>
          </div>
        </div>

        <button
          onClick={() => setSublimating(!sublimating)}
          className="mt-3 px-4 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition"
        >
          {sublimating ? "Pause Sublimation" : "Trigger Vapor Billow"}
        </button>

        <p className="mt-2 text-xs text-slate-500 text-center">
          Notice: Zero puddle or liquid layer forms at any point! Solid goes directly to Gas (Sublimation).
        </p>
      </div>
    </div>
  );
}

// Lesson 9: Temperature & Kinetic Energy (Diffusion Lab)
export function KineticEnergyVisual() {
  const [dropped, setDropped] = useState(true);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Hot vs Cold Molecular Diffusion</h4>
          <p className="text-xs text-[#73949f]">Higher temperature increases molecular kinetic energy and particle speed.</p>
        </div>
        <button
          onClick={() => setDropped(!dropped)}
          className="px-3 py-1 rounded-lg bg-[#159ac1] text-white text-xs font-bold hover:bg-[#0e7795] transition"
        >
          {dropped ? "Reset Beakers" : "Drop Food Dye"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Cold Beaker */}
        <div className="flex flex-col items-center bg-cyan-50/50 p-4 rounded-xl border border-cyan-100">
          <span className="text-xs font-bold text-cyan-800">Cold Water (5°C)</span>
          <div className="h-32 w-24 border-x-2 border-b-2 border-slate-400 rounded-b-xl bg-white mt-2 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-cyan-100/70" />
            {dropped && (
              <div className="h-8 w-8 rounded-full bg-violet-500/80 blur-xs transition-all duration-1000" />
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-2 font-medium">Slow localized diffusion</span>
        </div>

        {/* Hot Beaker */}
        <div className="flex flex-col items-center bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <span className="text-xs font-bold text-amber-800">Hot Water (85°C)</span>
          <div className="h-32 w-24 border-x-2 border-b-2 border-slate-400 rounded-b-xl bg-white mt-2 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-amber-100/70" />
            {dropped && (
              <div className="h-20 w-20 rounded-full bg-violet-600/90 blur-md animate-pulse transition-all duration-300" />
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-2 font-medium">Rapid energetic dispersal</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 10: Gas Pressure & Volume (Boyle's Law Gauge)
export function GasPressureVolumeVisual() {
  const [compression, setCompression] = useState(50); // 10 to 90
  const pressurePSI = Math.round((100 / (100 - compression)) * 14.7);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Boyle's Law Piston & Dial Gauge</h4>
          <p className="text-xs text-[#73949f]">Decreasing volume increases particle collisions and raises pressure gauge needle.</p>
        </div>
        <span className="rounded-lg bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
          P1 · V1 = P2 · V2
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex items-center gap-6">
          {/* Dial Gauge */}
          <div className="relative h-28 w-28 rounded-full border-4 border-slate-700 bg-slate-900 flex items-center justify-center shadow-lg">
            <div className="absolute top-2 text-[9px] font-mono text-emerald-400 font-bold">PRESSURE</div>
            <div
              className="h-10 w-1 bg-red-500 rounded-full origin-bottom transition-transform duration-300"
              style={{ transform: `rotate(${(compression / 100) * 160 - 80}deg)` }}
            />
            <div className="h-3 w-3 rounded-full bg-white z-10" />
            <span className="absolute bottom-3 text-xs font-mono font-bold text-white">
              {pressurePSI} PSI
            </span>
          </div>

          {/* Compressed Chamber */}
          <div className="h-28 w-36 border-2 border-slate-400 rounded-lg bg-slate-50 relative flex items-center overflow-hidden">
            <div
              className="h-full bg-sky-200/70 border-r-4 border-slate-800 transition-all duration-300"
              style={{ width: `${100 - compression}%` }}
            />
          </div>
        </div>

        <div className="mt-4 w-full max-w-sm flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600">Low Pressure</span>
          <input
            type="range"
            min="10"
            max="80"
            value={compression}
            onChange={(e) => setCompression(Number(e.target.value))}
            className="flex-1 h-2 accent-[#159ac1]"
          />
          <span className="text-xs font-bold text-slate-600">High Pressure</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 11: Phase Changes in Daily Life (Water Cycle)
export function WaterCyclePhaseVisual() {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const steps = [
    { title: "Evaporation", desc: "Sun heats ocean water turning it into rising water vapor gas." },
    { title: "Condensation", desc: "Cool high-altitude air condenses vapor into water droplets forming clouds." },
    { title: "Precipitation", desc: "Droplets grow heavy and fall as rain or snow back to earth." },
    { title: "Collection", desc: "Runoff water flows into rivers, lakes, and oceans to repeat the cycle." }
  ];

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Planetary Water Cycle Transformation</h4>
          <p className="text-xs text-[#73949f]">Continuous state changes drive Earth's weather and water availability.</p>
        </div>
        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          Global Phase Engine
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Animated Scenic Cycle SVG */}
        <div className="relative h-44 w-full max-w-md bg-gradient-to-b from-sky-100 to-amber-50/30 rounded-xl overflow-hidden border border-slate-200">
          <svg viewBox="0 0 320 160" className="w-full h-full">
            {/* Sun */}
            <circle cx="45" cy="35" r="18" fill="#f59e0b" className="animate-pulse" />

            {/* Cloud */}
            <g
              transform="translate(180, 25)"
              className={activeStep === 1 || activeStep === 2 ? "animate-pulse" : ""}
            >
              <ellipse cx="25" cy="20" rx="20" ry="14" fill="#cbd5e1" />
              <ellipse cx="45" cy="18" rx="24" ry="16" fill="#94a3b8" />
              <ellipse cx="65" cy="22" rx="18" ry="12" fill="#cbd5e1" />
            </g>

            {/* Raindrops */}
            {activeStep === 2 && (
              <g stroke="#0284c7" strokeWidth="2" strokeDasharray="3,4" className="animate-pulse">
                <line x1="205" y1="50" x2="200" y2="90" />
                <line x1="225" y1="50" x2="220" y2="90" />
                <line x1="245" y1="50" x2="240" y2="90" />
              </g>
            )}

            {/* Evaporation Waves */}
            {activeStep === 0 && (
              <g stroke="#f59e0b" strokeWidth="2" strokeDasharray="2,3" className="animate-bounce">
                <line x1="60" y1="120" x2="60" y2="70" />
                <line x1="80" y1="115" x2="80" y2="65" />
                <line x1="100" y1="120" x2="100" y2="70" />
              </g>
            )}

            {/* Ocean / Lake Base */}
            <path d="M 0 125 Q 80 120, 160 125 T 320 125 L 320 160 L 0 160 Z" fill="#0284c7" />
          </svg>
        </div>

        {/* Step Buttons */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {steps.map((st, i) => (
            <button
              key={st.title}
              onClick={() => setActiveStep(i as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeStep === i ? "bg-[#159ac1] text-white shadow-xs" : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
              }`}
            >
              {i + 1}. {st.title}
            </button>
          ))}
        </div>

        <p className="mt-2 text-xs text-slate-600 font-medium text-center">
          {steps[activeStep].desc}
        </p>
      </div>
    </div>
  );
}

// Lesson 12: Plasma & High-Energy States of Matter
export function PlasmaHeatingCurveVisual() {
  const [phase, setPhase] = useState<"solid" | "liquid" | "gas" | "plasma">("plasma");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: Four States of Matter & Ionization</h4>
          <p className="text-xs text-[#73949f]">Superheating gas strips electrons from nuclei to form ionized plasma.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1] uppercase">
          State: {phase}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex items-center justify-center h-36 w-full max-w-sm rounded-xl bg-[#0f172a] text-white p-4 overflow-hidden relative shadow-inner">
          {phase === "solid" && (
            <div className="grid grid-cols-4 gap-2 animate-pulse">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-5 w-5 rounded-full bg-sky-400 border border-sky-200" />
              ))}
            </div>
          )}

          {phase === "liquid" && (
            <div className="relative h-full w-full flex items-end justify-center">
              <div className="w-full h-16 bg-blue-500/70 rounded-b-xl flex flex-wrap gap-2 p-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-4 w-4 rounded-full bg-cyan-300 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          )}

          {phase === "gas" && (
            <div className="relative h-full w-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-4 w-4 rounded-full bg-amber-400 animate-ping"
                  style={{
                    left: `${(i * 23) % 80 + 10}%`,
                    top: `${(i * 19) % 65 + 15}%`,
                    animationDuration: "2s"
                  }}
                />
              ))}
            </div>
          )}

          {phase === "plasma" && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-violet-600/40 blur-md animate-ping" />
                <span className="text-xl font-extrabold text-violet-300 drop-shadow-md z-10">⚡ Ionized Plasma</span>
              </div>
              <p className="text-[11px] text-violet-200 mt-2">
                Free Positive Nuclei (+) &amp; Detached High-Energy Electrons (e⁻)
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(["solid", "liquid", "gas", "plasma"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                phase === p
                  ? "bg-[#159ac1] text-white shadow-xs"
                  : "bg-sky-50 text-[#159ac1] hover:bg-sky-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
