import React, { useState } from "react";
import { Sun, Droplets, Wind, Sparkles, Play, Pause } from "lucide-react";

export default function PhotosynthesisVisual() {
  const [sunlight, setSunlight] = useState<number>(3); // 1 to 5
  const [water, setWater] = useState<boolean>(true);
  const [co2, setCo2] = useState<boolean>(true);

  const isRunning = sunlight > 0 && water && co2;
  const productionRate = isRunning ? sunlight * 20 : 0;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-sm text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1f0f4] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#2d9165] flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#e0a93a]" />
            Interactive Photosynthesis Reaction Simulator
          </h3>
          <p className="mt-0.5 text-xs text-[#73949f]">
            Turn on sunlight, water, and carbon dioxide to watch the leaf convert light into glucose and oxygen!
          </p>
        </div>
        <div className={`rounded-xl px-3 py-1.5 border text-xs font-bold ${
          isRunning ? "bg-[#e5f8ef] text-[#318c60] border-[#c1ebd6]" : "bg-[#fff1e9] text-[#bd6d39] border-[#fcdbc9]"
        }`}>
          {isRunning ? `Photosynthesis Active (${productionRate}% Rate)` : "Reaction Paused (Needs all inputs)"}
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2 items-center">
        {/* Animated Visual Leaf Chamber */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 border border-[#e3f1f4] shadow-xs relative overflow-hidden">
          <svg viewBox="0 0 300 180" className="w-full h-44">
            {/* Sun Rays */}
            <g transform="translate(40, 30)">
              <circle cx="0" cy="0" r="16" fill="#facc15" className="animate-pulse" />
              {Array.from({ length: sunlight }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="16"
                  x2={30 + i * 20}
                  y2={70}
                  stroke="#facc15"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className={isRunning ? "animate-bounce" : ""}
                />
              ))}
            </g>

            {/* Leaf Shape */}
            <path
              d="M 60 120 C 60 50, 240 50, 240 120 C 240 170, 60 170, 60 120 Z"
              fill={isRunning ? "#43b485" : "#86a89b"}
              stroke="#2d9165"
              strokeWidth="3"
              className="transition-colors duration-500"
            />
            {/* Leaf Vein */}
            <path d="M 60 120 Q 150 110 240 120" stroke="#1d6645" strokeWidth="2" fill="none" />

            {/* Inputs: Water (Roots) */}
            {water && (
              <g transform="translate(70, 140)">
                <circle cx="0" cy="0" r="5" fill="#38bdf8" className={isRunning ? "animate-ping" : ""} />
                <text x="10" y="4" fill="#0284c7" fontSize="10" fontWeight="bold">H₂O Water</text>
              </g>
            )}

            {/* Inputs: Carbon Dioxide */}
            {co2 && (
              <g transform="translate(140, 65)">
                <rect x="-20" y="-10" width="40" height="18" rx="6" fill="#e2e8f0" />
                <text x="0" y="3" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">CO₂</text>
              </g>
            )}

            {/* Chloroplast Reaction Sparkles */}
            {isRunning && (
              <g transform="translate(150, 115)">
                <circle cx="0" cy="0" r="14" fill="#15803d" />
                <text x="0" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Energy</text>
              </g>
            )}

            {/* Output: Oxygen & Glucose */}
            {isRunning && (
              <g transform="translate(210, 85)">
                <circle cx="0" cy="0" r="8" fill="#38bdf8" />
                <text x="0" y="3" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">O₂</text>
                <rect x="-15" y="15" width="40" height="16" rx="5" fill="#f59e0b" />
                <text x="5" y="27" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Glucose</text>
              </g>
            )}
          </svg>

          {/* Reaction Formula Readout */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 rounded-xl bg-[#e5f8ef] px-3 py-2 text-xs font-bold text-[#1e6143] border border-[#c3eed9]">
            <span className="text-[#e0a93a]">Light</span> + <span>6H₂O</span> + <span>6CO₂</span> → <span className="text-[#0284c7]">6O₂</span> + <span className="text-[#d97706]">C₆H₁₂O₆ (Glucose)</span>
          </div>
        </div>

        {/* Reaction Controls */}
        <div className="flex flex-col space-y-4">
          <div className="rounded-2xl bg-white p-5 border border-[#e3f1f4] space-y-4">
            <h4 className="text-xs font-bold text-[#2d9165] uppercase tracking-wider">Control Reaction Inputs</h4>

            {/* Sunlight Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#315866]">
                <span className="flex items-center gap-1"><Sun className="h-3.5 w-3.5 text-[#e0a93a]" /> Sunlight Intensity: {sunlight}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={sunlight}
                onChange={(e) => setSunlight(Number(e.target.value))}
                className="mt-2 w-full accent-[#e0a93a]"
              />
            </div>

            {/* Water Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#315866] flex items-center gap-1.5">
                <Droplets className="h-4 w-4 text-[#0284c7]" /> Water from Roots (H₂O)
              </span>
              <button
                onClick={() => setWater(!water)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  water ? "bg-[#38bdf8] text-white" : "bg-[#e2e8f0] text-[#64748b]"
                }`}
              >
                {water ? "Supplied" : "Off"}
              </button>
            </div>

            {/* Carbon Dioxide Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#315866] flex items-center gap-1.5">
                <Wind className="h-4 w-4 text-[#64748b]" /> Carbon Dioxide (CO₂)
              </span>
              <button
                onClick={() => setCo2(!co2)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  co2 ? "bg-[#64748b] text-white" : "bg-[#e2e8f0] text-[#64748b]"
                }`}
              >
                {co2 ? "Present" : "Off"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-[#e5f8ef] p-4 border border-[#c1ebd6] text-xs text-[#21543d] leading-relaxed">
            <strong>Key Insight:</strong> Without any 1 of the 3 ingredients (sunlight, water, or CO₂), photosynthesis stops! Leaves use chloroplasts as solar factories to manufacture plant energy.
          </div>
        </div>
      </div>
    </div>
  );
}
