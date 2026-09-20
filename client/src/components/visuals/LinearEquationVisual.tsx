import React, { useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Scale } from "lucide-react";

export default function LinearEquationVisual() {
  const [step, setStep] = useState<"initial" | "subtracted" | "solved">("initial");
  const [xVal, setXVal] = useState<number>(4);

  // Left pan total weight = (2 * xVal) + (step === "initial" ? 3 : 0)
  // Right pan total weight = (step === "initial" ? 11 : step === "subtracted" ? 8 : 4)
  const leftWeight = step === "solved" ? xVal : (2 * xVal) + (step === "initial" ? 3 : 0);
  const rightWeight = step === "initial" ? 11 : step === "subtracted" ? 8 : 4;

  const diff = leftWeight - rightWeight;
  const tiltAngle = Math.max(-12, Math.min(12, diff * 3));

  const isBalanced = diff === 0;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-sm text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1f0f4] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#1d596b] flex items-center gap-2">
            <Scale className="h-5 w-5 text-[#159ac1]" />
            Interactive Equation Balance Scale
          </h3>
          <p className="mt-0.5 text-xs text-[#73949f]">
            Equations work like a physical balance scale: keep both sides equal at every step.
          </p>
        </div>
        <div className="rounded-xl bg-white px-3 py-1.5 border border-[#d8eaee] text-xs font-bold text-[#159ac1]">
          {step === "initial" && "Equation: 2x + 3 = 11"}
          {step === "subtracted" && "Step 1: 2x = 8 (Subtracted 3)"}
          {step === "solved" && "Step 2: x = 4 (Divided by 2)"}
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2 items-center">
        {/* SVG Balance Scale Visual */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 border border-[#e3f1f4] shadow-xs relative overflow-hidden">
          <svg viewBox="0 0 300 180" className="w-full h-44">
            {/* Fulcrum Base */}
            <polygon points="150,150 130,175 170,175" fill="#315866" />
            <line x1="150" y1="110" x2="150" y2="150" stroke="#315866" strokeWidth="6" strokeLinecap="round" />

            {/* Rotating Beam */}
            <g transform={`rotate(${tiltAngle}, 150, 110)`} className="transition-transform duration-500 ease-out">
              {/* Main Beam Line */}
              <line x1="40" y1="110" x2="260" y2="110" stroke="#159ac1" strokeWidth="6" strokeLinecap="round" />
              <circle cx="150" cy="110" r="6" fill="#159ac1" />

              {/* Left Pan Strings & Pan */}
              <line x1="50" y1="110" x2="30" y2="140" stroke="#94b7c2" strokeWidth="2" />
              <line x1="50" y1="110" x2="70" y2="140" stroke="#94b7c2" strokeWidth="2" />
              <path d="M 20 140 Q 50 155 80 140 Z" fill="#e4f4f7" stroke="#159ac1" strokeWidth="2" />

              {/* Left Pan Contents */}
              <g transform="translate(50, 125)">
                {step === "solved" ? (
                  <rect x="-12" y="-12" width="24" height="24" rx="5" fill="#159ac1" />
                ) : (
                  <>
                    <rect x="-20" y="-14" width="16" height="16" rx="4" fill="#159ac1" />
                    <text x="-12" y="-2" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
                    <rect x="2" y="-14" width="16" height="16" rx="4" fill="#159ac1" />
                    <text x="10" y="-2" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">x</text>
                    {step === "initial" && (
                      <g transform="translate(0, -22)">
                        <circle cx="-10" cy="0" r="4" fill="#ef946e" />
                        <circle cx="0" cy="0" r="4" fill="#ef946e" />
                        <circle cx="10" cy="0" r="4" fill="#ef946e" />
                      </g>
                    )}
                  </>
                )}
              </g>

              {/* Right Pan Strings & Pan */}
              <line x1="250" y1="110" x2="230" y2="140" stroke="#94b7c2" strokeWidth="2" />
              <line x1="250" y1="110" x2="270" y2="140" stroke="#94b7c2" strokeWidth="2" />
              <path d="M 220 140 Q 250 155 280 140 Z" fill="#e4f4f7" stroke="#159ac1" strokeWidth="2" />

              {/* Right Pan Contents */}
              <g transform="translate(250, 128)">
                {step === "initial" && (
                  <text x="0" y="0" fill="#214554" fontSize="14" fontWeight="extrabold" textAnchor="middle">11 weights</text>
                )}
                {step === "subtracted" && (
                  <text x="0" y="0" fill="#214554" fontSize="14" fontWeight="extrabold" textAnchor="middle">8 weights</text>
                )}
                {step === "solved" && (
                  <text x="0" y="0" fill="#43b485" fontSize="14" fontWeight="extrabold" textAnchor="middle">4 weights</text>
                )}
              </g>
            </g>
          </svg>

          <div className="mt-2 flex items-center gap-2 text-xs font-bold">
            {isBalanced ? (
              <span className="flex items-center gap-1 text-[#43b485] bg-[#e5f8ef] px-3 py-1 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5" /> Scale Balanced! Left = Right
              </span>
            ) : (
              <span className="text-[#ef946e] bg-[#fff1e9] px-3 py-1 rounded-full">
                Scale Unbalanced ({diff > 0 ? "Left heavy" : "Right heavy"})
              </span>
            )}
          </div>
        </div>

        {/* Step-by-Step Solver Controls */}
        <div className="flex flex-col space-y-4">
          <div className="rounded-2xl bg-white p-5 border border-[#e3f1f4] space-y-3">
            <h4 className="text-xs font-bold text-[#159ac1] uppercase tracking-wider">Interactive Solver Steps</h4>

            <div className="space-y-2">
              <button
                onClick={() => setStep("initial")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition ${
                  step === "initial" ? "border-[#159ac1] bg-[#e8f8fc] text-[#159ac1]" : "border-[#e2eff2] text-[#638490] hover:bg-[#f6fbfd]"
                }`}
              >
                <span>1. Start: 2x + 3 = 11</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#d3e9ee]">Original</span>
              </button>

              <button
                onClick={() => setStep("subtracted")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition ${
                  step === "subtracted" ? "border-[#159ac1] bg-[#e8f8fc] text-[#159ac1]" : "border-[#e2eff2] text-[#638490] hover:bg-[#f6fbfd]"
                }`}
              >
                <span>2. Subtract 3 from both sides</span>
                <span className="text-[10px] bg-[#e5f8ef] text-[#318c60] px-2 py-0.5 rounded-md">2x = 8</span>
              </button>

              <button
                onClick={() => setStep("solved")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition ${
                  step === "solved" ? "border-[#43b485] bg-[#e5f8ef] text-[#318c60]" : "border-[#e2eff2] text-[#638490] hover:bg-[#f6fbfd]"
                }`}
              >
                <span>3. Divide both sides by 2</span>
                <span className="text-[10px] bg-[#43b485] text-white px-2 py-0.5 rounded-md">x = 4</span>
              </button>
            </div>
          </div>

          {/* Test value slider for x */}
          <div className="rounded-2xl bg-white p-4 border border-[#e3f1f4]">
            <div className="flex items-center justify-between text-xs font-bold text-[#315866]">
              <span>Test value for x: {xVal}</span>
              <span className={xVal === 4 ? "text-[#43b485]" : "text-[#ef946e]"}>
                {xVal === 4 ? "Correct answer!" : "Incorrect"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={xVal}
              onChange={(e) => setXVal(Number(e.target.value))}
              className="mt-2 w-full accent-[#159ac1]"
            />
            <p className="mt-2 text-[11px] text-[#789aa6]">
              Slide x to test different values and watch how the physical balance responds!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
