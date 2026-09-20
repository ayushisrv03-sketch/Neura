import React, { useState } from "react";
import { Compass, Sparkles, RefreshCw } from "lucide-react";

export default function GeometryVisual() {
  const [angleA, setAngleA] = useState(60);
  const [angleB, setAngleB] = useState(50);

  // Angle C must equal 180 - A - B
  const angleC = Math.max(10, 180 - angleA - angleB);

  // Preset triangle types
  const applyPreset = (type: "equilateral" | "right" | "isosceles" | "obtuse") => {
    if (type === "equilateral") { setAngleA(60); setAngleB(60); }
    if (type === "right") { setAngleA(90); setAngleB(45); }
    if (type === "isosceles") { setAngleA(70); setAngleB(70); }
    if (type === "obtuse") { setAngleA(110); setAngleB(35); }
  };

  // Determine triangle type badge
  let triangleType = "Acute Triangle";
  if (angleA === 90 || angleB === 90 || angleC === 90) triangleType = "Right-Angled Triangle";
  else if (angleA > 90 || angleB > 90 || angleC > 90) triangleType = "Obtuse Triangle";
  else if (angleA === 60 && angleB === 60) triangleType = "Equilateral Triangle";

  // Calculate coordinates for SVG rendering
  const baseLen = 180;
  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;

  // Law of sines to find side b length
  const radC = (angleC * Math.PI) / 180;
  const sideB = (baseLen * Math.sin(radB)) / Math.sin(radC);

  const cx = sideB * Math.cos(radA);
  const cy = sideB * Math.sin(radA);

  // SVG Points: A = (30, 140), B = (230, 140), C = (30 + cx, 140 - cy)
  const ax = 50;
  const ay = 145;
  const bx = 240;
  const by = 145;
  const pointCx = Math.min(270, Math.max(20, 50 + cx));
  const pointCy = Math.min(130, Math.max(20, 145 - Math.min(110, cy)));

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-sm text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1f0f4] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#1d596b] flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#8979d5]" />
            Interactive Triangle Angle Explorer
          </h3>
          <p className="mt-0.5 text-xs text-[#73949f]">
            Change any angle and see how the triangle adjusts so the sum is always exactly 180°.
          </p>
        </div>
        <div className="rounded-xl bg-[#f0edff] px-3 py-1.5 border border-[#dfd7ff] text-xs font-bold text-[#8979d5]">
          {triangleType}
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2 items-center">
        {/* SVG Triangle Display */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 border border-[#e3f1f4] shadow-xs relative">
          <svg viewBox="0 0 300 170" className="w-full h-44">
            {/* Grid background lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f7f9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Triangle shape */}
            <polygon
              points={`${ax},${ay} ${bx},${by} ${pointCx},${pointCy}`}
              fill="rgba(180, 166, 244, 0.18)"
              stroke="#8979d5"
              strokeWidth="3"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />

            {/* Vertices & Angles */}
            {/* Vertex A */}
            <circle cx={ax} cy={ay} r="5" fill="#8979d5" />
            <text x={ax - 15} y={ay + 15} fill="#315866" fontSize="12" fontWeight="extrabold">A ({angleA}°)</text>

            {/* Vertex B */}
            <circle cx={bx} cy={by} r="5" fill="#159ac1" />
            <text x={bx + 5} y={by + 15} fill="#315866" fontSize="12" fontWeight="extrabold">B ({angleB}°)</text>

            {/* Vertex C */}
            <circle cx={pointCx} cy={pointCy} r="5" fill="#43b485" />
            <text x={pointCx} y={pointCy - 10} fill="#315866" fontSize="12" fontWeight="extrabold" textAnchor="middle">
              C ({angleC}°)
            </text>
          </svg>

          {/* Dynamic Equation Proof */}
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#f0edff] px-4 py-2 border border-[#ded5ff] text-xs font-bold text-[#45378c]">
            <span>∠A ({angleA}°)</span> + <span>∠B ({angleB}°)</span> + <span>∠C ({angleC}°)</span> = <span className="text-[#159ac1] font-black">180°</span>
          </div>
        </div>

        {/* Controls & Presets */}
        <div className="flex flex-col space-y-4">
          <div className="rounded-2xl bg-white p-5 border border-[#e3f1f4] space-y-4">
            <h4 className="text-xs font-bold text-[#8979d5] uppercase tracking-wider">Adjust Angle Values</h4>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#315866]">
                <span>Angle A: {angleA}°</span>
              </div>
              <input
                type="range"
                min="20"
                max="140"
                value={angleA}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val + angleB < 170) setAngleA(val);
                }}
                className="mt-2 w-full accent-[#8979d5]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-[#315866]">
                <span>Angle B: {angleB}°</span>
              </div>
              <input
                type="range"
                min="20"
                max="140"
                value={angleB}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (angleA + val < 170) setAngleB(val);
                }}
                className="mt-2 w-full accent-[#159ac1]"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="rounded-2xl bg-white p-4 border border-[#e3f1f4]">
            <p className="text-xs font-bold text-[#315866] mb-2.5">Try Triangle Presets:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyPreset("equilateral")}
                className="rounded-xl border border-[#e2eff2] p-2 text-xs font-bold text-[#567885] hover:border-[#8979d5] hover:text-[#8979d5] transition"
              >
                Equilateral (60°-60°-60°)
              </button>
              <button
                onClick={() => applyPreset("right")}
                className="rounded-xl border border-[#e2eff2] p-2 text-xs font-bold text-[#567885] hover:border-[#8979d5] hover:text-[#8979d5] transition"
              >
                Right (90°-45°-45°)
              </button>
              <button
                onClick={() => applyPreset("isosceles")}
                className="rounded-xl border border-[#e2eff2] p-2 text-xs font-bold text-[#567885] hover:border-[#8979d5] hover:text-[#8979d5] transition"
              >
                Isosceles (70°-70°-40°)
              </button>
              <button
                onClick={() => applyPreset("obtuse")}
                className="rounded-xl border border-[#e2eff2] p-2 text-xs font-bold text-[#567885] hover:border-[#8979d5] hover:text-[#8979d5] transition"
              >
                Obtuse (110°-35°-35°)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
