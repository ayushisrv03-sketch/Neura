import React, { useState } from "react";
import { Check, Info, PieChart, BarChart2, RefreshCw } from "lucide-react";

export default function FractionVisual() {
  const [numerator, setNumerator] = useState(3);
  const [denominator, setDenominator] = useState(4);
  const [viewMode, setViewMode] = useState<"pie" | "bar">("pie");
  const [multiplier, setMultiplier] = useState(2);

  const equivNumerator = numerator * multiplier;
  const equivDenominator = denominator * multiplier;

  // Generate pie slices
  const slices = Array.from({ length: denominator }, (_, i) => i < numerator);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-sm text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1f0f4] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#1d596b] flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#159ac1] text-xs font-black text-white">¾</span>
            Interactive Fraction Visualizer
          </h3>
          <p className="mt-0.5 text-xs text-[#73949f]">
            Adjust the numerator and denominator to see parts of a whole in real time.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-white p-1 border border-[#d8eaee]">
          <button
            onClick={() => setViewMode("pie")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              viewMode === "pie" ? "bg-[#159ac1] text-white" : "text-[#71919d] hover:text-[#159ac1]"
            }`}
          >
            <PieChart className="h-3.5 w-3.5" /> Circle
          </button>
          <button
            onClick={() => setViewMode("bar")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              viewMode === "bar" ? "bg-[#159ac1] text-white" : "text-[#71919d] hover:text-[#159ac1]"
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" /> Bar
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        {/* Left: Interactive Canvas */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 border border-[#e3f1f4] shadow-xs">
          {viewMode === "pie" ? (
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                {slices.map((isFilled, idx) => {
                  const angle = 360 / denominator;
                  const startAngle = idx * angle;
                  const endAngle = (idx + 1) * angle;

                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;

                  const x1 = 50 + 45 * Math.cos(startRad);
                  const y1 = 50 + 45 * Math.sin(startRad);
                  const x2 = 50 + 45 * Math.cos(endRad);
                  const y2 = 50 + 45 * Math.sin(endRad);

                  const largeArc = angle > 180 ? 1 : 0;
                  const d = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;

                  return (
                    <path
                      key={idx}
                      d={d}
                      fill={isFilled ? "#159ac1" : "#eef7fa"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                      onClick={() => {
                        if (idx < numerator) setNumerator(Math.max(1, numerator - 1));
                        else setNumerator(Math.min(denominator, numerator + 1));
                      }}
                    >
                      <title>{`Part ${idx + 1} of ${denominator}`}</title>
                    </path>
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rounded-full bg-white/90 px-3 py-1 text-center shadow-xs backdrop-blur-xs border border-[#e1f0f4]">
                  <span className="text-xl font-extrabold text-[#159ac1]">{numerator}</span>
                  <div className="h-0.5 w-full bg-[#159ac1] my-0.5" />
                  <span className="text-xl font-extrabold text-[#214554]">{denominator}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="text-center font-bold text-sm text-[#315866]">
                Shaded {numerator} out of {denominator} equal parts
              </div>
              <div className="flex h-16 w-full overflow-hidden rounded-xl border-2 border-[#159ac1] bg-[#eef7fa]">
                {slices.map((isFilled, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (idx < numerator) setNumerator(Math.max(1, numerator - 1));
                      else setNumerator(Math.min(denominator, numerator + 1));
                    }}
                    className={`flex-1 border-r border-white/60 transition-all duration-200 cursor-pointer flex items-center justify-center text-xs font-bold ${
                      isFilled ? "bg-[#159ac1] text-white" : "bg-[#eef7fa] text-[#8aa7b1] hover:bg-[#dff3f7]"
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-xs font-medium text-[#7fa1ac] text-center">
            Click any segment to shade or unshade it!
          </p>
        </div>

        {/* Right: Controls & Equivalent Fractions */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="rounded-2xl bg-white p-5 border border-[#e3f1f4] space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#315866]">
                <span>Numerator (Parts selected): {numerator}</span>
              </div>
              <input
                type="range"
                min="1"
                max={denominator}
                value={numerator}
                onChange={(e) => setNumerator(Number(e.target.value))}
                className="mt-2 w-full accent-[#159ac1]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#315866]">
                <span>Denominator (Total parts): {denominator}</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                value={denominator}
                onChange={(e) => {
                  const newDen = Number(e.target.value);
                  setDenominator(newDen);
                  if (numerator > newDen) setNumerator(newDen);
                }}
                className="mt-2 w-full accent-[#159ac1]"
              />
            </div>
          </div>

          {/* Equivalent Fraction Prover */}
          <div className="rounded-2xl bg-[#e8f8fc] p-5 border border-[#cbebf3]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#159ac1] uppercase tracking-wider">Equivalent Fraction Matcher</span>
              <button
                onClick={() => setMultiplier(multiplier === 2 ? 3 : multiplier === 3 ? 4 : 2)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#159ac1] hover:underline"
              >
                <RefreshCw className="h-3 w-3" /> ×{multiplier}
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-center">
              <div className="rounded-xl bg-white px-4 py-2 border border-[#d0ecf3]">
                <div className="text-lg font-black text-[#159ac1]">{numerator}</div>
                <div className="h-0.5 w-6 bg-[#159ac1] mx-auto my-0.5" />
                <div className="text-lg font-black text-[#214554]">{denominator}</div>
              </div>
              <span className="text-xl font-bold text-[#159ac1]">=</span>
              <div className="rounded-xl bg-white px-4 py-2 border border-[#d0ecf3]">
                <div className="text-lg font-black text-[#43b485]">{equivNumerator}</div>
                <div className="h-0.5 w-6 bg-[#43b485] mx-auto my-0.5" />
                <div className="text-lg font-black text-[#214554]">{equivDenominator}</div>
              </div>
            </div>

            <p className="mt-3 text-xs text-[#5e8a97] leading-relaxed">
              Multiplying top and bottom by <strong>{multiplier}</strong> gives{" "}
              <strong>{equivNumerator}/{equivDenominator}</strong> — covering the exact same total area!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
