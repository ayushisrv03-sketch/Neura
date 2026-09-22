import React, { useState } from "react";
import { ArrowRight, Check, RefreshCw, Sliders, Play, RotateCcw } from "lucide-react";

// Lesson 1: Introduction to Variables
export function VariablesIntroVisual() {
  const [xVal, setXVal] = useState(4);
  const result = 3 * xVal + 2;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 1 Visual: Function Machine & Input Variable</h4>
          <p className="text-xs text-[#73949f]">Variables (x) act as inputs into algebraic rules: f(x) = 3x + 2.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
          Input x = {xVal} → Output = {result}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* SVG Function Machine Diagram */}
        <svg viewBox="0 0 400 160" className="h-44 w-full max-w-md">
          {/* Input Hopper */}
          <path d="M 50,20 L 90,20 L 75,50 L 65,50 Z" fill="#e3f7fb" stroke="#159ac1" strokeWidth="2" />
          <circle cx="70" cy="25" r="14" fill="#159ac1" />
          <text x="70" y="29" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">x={xVal}</text>

          {/* Machine Body */}
          <rect x="110" y="40" width="180" height="80" rx="16" fill="#1d596b" />
          <text x="200" y="75" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">Rule: 3x + 2</text>
          <text x="200" y="98" textAnchor="middle" fill="#9ed6e5" fontSize="12" fontWeight="bold">3({xVal}) + 2 = {result}</text>

          {/* Gears */}
          <circle cx="140" cy="55" r="10" fill="#159ac1" opacity="0.6" />
          <circle cx="260" cy="55" r="10" fill="#159ac1" opacity="0.6" />

          {/* Conveyor / Output */}
          <path d="M 290,80 L 330,80 L 330,120 L 350,120" stroke="#159ac1" strokeWidth="4" fill="none" strokeDasharray="4 4" />
          <rect x="320" y="100" width="60" height="40" rx="10" fill="#277f59" />
          <text x="350" y="125" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold">{result}</text>
        </svg>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xs font-bold text-[#5e7d87]">Select Variable x:</span>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setXVal(num)}
              className={`h-9 w-9 rounded-xl text-xs font-bold transition ${xVal === num ? "bg-[#159ac1] text-white shadow-xs scale-105" : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 2: One-Step Addition & Subtraction Equations
export function OneStepAddSubVisual() {
  const [removed, setRemoved] = useState(false);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Interactive Pan Balance Scale</h4>
          <p className="text-xs text-[#73949f]">Solve x + 5 = 12 by subtracting 5 from both sides to keep equilibrium.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
          {removed ? "x = 7 (Balanced)" : "x + 5 = 12"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* SVG Balance Scale */}
        <svg viewBox="0 0 400 180" className="h-44 w-full max-w-md">
          {/* Fulcrum Stand */}
          <polygon points="200,100 180,160 220,160" fill="#88a8b5" />
          <line x1="80" y1="100" x2="320" y2="100" stroke="#1d596b" strokeWidth="6" strokeLinecap="round" />

          {/* Left Pan */}
          <line x1="80" y1="100" x2="80" y2="130" stroke="#88a8b5" strokeWidth="2" />
          <path d="M 30,130 Q 80,145 130,130 Z" fill="#e3f7fb" stroke="#159ac1" strokeWidth="2" />

          {/* Left Pan Items */}
          <rect x="45" y="95" width="30" height="30" rx="6" fill="#159ac1" />
          <text x="60" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">x</text>

          {!removed && (
            <g>
              <rect x="80" y="105" width="20" height="20" rx="4" fill="#efab87" />
              <text x="90" y="120" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">+5</text>
            </g>
          )}

          {/* Right Pan */}
          <line x1="320" y1="100" x2="320" y2="130" stroke="#88a8b5" strokeWidth="2" />
          <path d="M 270,130 Q 320,145 370,130 Z" fill="#e3f7fb" stroke="#159ac1" strokeWidth="2" />

          {/* Right Pan Items */}
          <rect x="290" y="95" width="60" height="30" rx="6" fill={removed ? "#277f59" : "#159ac1"} />
          <text x="320" y="115" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            {removed ? "7" : "12"}
          </text>
        </svg>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setRemoved(!removed)}
            className="flex items-center gap-2 rounded-xl bg-[#159ac1] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#1088aa]"
          >
            {removed ? <RotateCcw className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            {removed ? "Reset Balance Scale" : "Subtract 5 from Both Sides"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Lesson 3: One-Step Multiplication & Division Equations
export function OneStepMultDivVisual() {
  const [groups, setGroups] = useState(4);
  const total = 24;
  const itemsPerGroup = total / groups;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Array Grouping Grid</h4>
          <p className="text-xs text-[#73949f]">Solve {groups}x = 24 by dividing 24 total items into {groups} equal groups.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
          x = 24 ÷ {groups} = {itemsPerGroup}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="grid gap-3 w-full max-w-md" style={{ gridTemplateColumns: `repeat(${groups}, 1fr)` }}>
          {Array.from({ length: groups }, (_, gIdx) => (
            <div key={gIdx} className="flex flex-col items-center rounded-xl bg-[#f0fafc] p-3 border border-[#d4f1f8]">
              <span className="mb-2 text-xs font-bold text-[#159ac1]">Group {gIdx + 1}</span>
              <div className="grid grid-cols-2 gap-1.5">
                {Array.from({ length: itemsPerGroup }, (_, iIdx) => (
                  <div key={iIdx} className="h-4 w-4 rounded-full bg-[#159ac1]" />
                ))}
              </div>
              <span className="mt-2 text-[11px] font-extrabold text-[#277f59]">{itemsPerGroup} items</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-bold text-[#5e7d87]">Coefficient:</span>
          {[2, 3, 4, 6, 8].map((g) => (
            <button
              key={g}
              onClick={() => setGroups(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${groups === g ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
            >
              {g}x = 24
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 5: Equations with Variables on Both Sides
export function VariablesBothSidesVisual() {
  const [step, setStep] = useState(0);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 5 Visual: Dual-Pan Variable Eliminator</h4>
          <p className="text-xs text-[#73949f]">Solve 5x + 2 = 3x + 10 by removing equal variable blocks step-by-step.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
          {step === 0 ? "5x + 2 = 3x + 10" : step === 1 ? "2x + 2 = 10" : step === 2 ? "2x = 8" : "x = 4"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        {/* Step Visualizer */}
        <div className="flex items-center justify-between w-full max-w-md rounded-xl bg-[#f6fbfd] p-4 border border-[#e0f1f5]">
          <div className="text-center">
            <span className="text-xs font-bold text-[#7899a5]">Left Pan</span>
            <div className="mt-1 text-lg font-black text-[#159ac1]">
              {step === 0 ? "5x + 2" : step === 1 ? "2x + 2" : step === 2 ? "2x" : "x"}
            </div>
          </div>
          <span className="text-2xl font-black text-[#1d596b]">=</span>
          <div className="text-center">
            <span className="text-xs font-bold text-[#7899a5]">Right Pan</span>
            <div className="mt-1 text-lg font-black text-[#277f59]">
              {step === 0 ? "3x + 10" : step === 1 ? "10" : step === 2 ? "8" : "4"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            disabled={step === 3}
            className="rounded-xl bg-[#159ac1] px-4 py-2 text-xs font-bold text-white disabled:bg-[#9ccedb]"
          >
            {step === 0 ? "Step 1: Subtract 3x from both sides" : step === 1 ? "Step 2: Subtract 2 from both sides" : step === 2 ? "Step 3: Divide both sides by 2" : "Completed!"}
          </button>
          <button
            onClick={() => setStep(0)}
            className="rounded-xl bg-[#e8f8fc] px-3 py-2 text-xs font-bold text-[#159ac1]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// Lesson 6: Simplifying Before Solving
export function SimplifyingEquationsVisual() {
  const [merged, setMerged] = useState(false);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Term Combiner Scale</h4>
          <p className="text-xs text-[#73949f]">Group like terms on each side before using inverse operations.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex items-center gap-3 text-lg font-bold text-[#159ac1]">
          {merged ? (
            <span className="rounded-xl bg-[#eaf7f1] px-4 py-2 font-black text-[#277f59]">5x + 4 = 19</span>
          ) : (
            <span>2x + 3x + 4 = 19</span>
          )}
        </div>

        <button
          onClick={() => setMerged(!merged)}
          className="mt-4 rounded-xl bg-[#159ac1] px-4 py-2 text-xs font-bold text-white"
        >
          {merged ? "Un-group Terms" : "Merge (2x + 3x) → 5x"}
        </button>
      </div>
    </div>
  );
}

// Lesson 7: Combining Like Terms
export function CombiningLikeTermsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Sorting Trays for Like Terms</h4>
      <p className="text-xs text-[#73949f]">Sort terms into matching variable bins: (4x + 3x - 2x) = 5x.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex gap-4">
          <div className="rounded-xl bg-[#e8f8fc] p-4 text-center border border-[#d2eef5]">
            <span className="text-xs font-bold text-[#159ac1]">Variable Bin (x)</span>
            <div className="mt-2 text-xl font-black text-[#159ac1]">4x + 3x - 2x = 5x</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lesson 8: Equations with Parentheses
export function ParenthesesEquationsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Area Model for Distributive Property</h4>
      <p className="text-xs text-[#73949f]">Expand 2(x + 4) into a 2×x rectangle and a 2×4 rectangle (= 8).</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex h-20 w-64 overflow-hidden rounded-xl border border-[#bde4ef] text-center font-bold">
          <div className="flex h-full w-1/2 items-center justify-center bg-[#159ac1] text-white">2 × x = 2x</div>
          <div className="flex h-full w-1/2 items-center justify-center bg-[#318c60] text-white">2 × 4 = 8</div>
        </div>
        <span className="mt-2 text-sm font-bold text-[#1d596b]">2(x + 4) = 2x + 8</span>
      </div>
    </div>
  );
}

// Lesson 9: Solving Word Problems with Equations
export function EquationWordProblemsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Scenario-to-Equation Translator</h4>
      <p className="text-xs text-[#73949f]">"Sam has $5 more than twice Alex's money (x). Total = $25."</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex items-center gap-3 text-base font-bold text-[#159ac1]">
          <span>2x + 5 = 25</span>
          <ArrowRight className="h-4 w-4 text-[#277f59]" />
          <span>2x = 20</span>
          <ArrowRight className="h-4 w-4 text-[#277f59]" />
          <span className="text-lg font-black text-[#277f59]">x = $10</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 10: Multi-Step Linear Equations
export function MultiStepEquationsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Step-by-Step Solver Tree</h4>
      <p className="text-xs text-[#73949f]">Solve 3(x + 1) + 2x = 18 step by step.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4] text-xs font-bold text-[#5e7d87] space-y-2">
        <div className="rounded-lg bg-[#e8f8fc] px-4 py-1.5 text-[#159ac1]">1. Expand: 3x + 3 + 2x = 18</div>
        <div className="rounded-lg bg-[#e8f8fc] px-4 py-1.5 text-[#159ac1]">2. Combine: 5x + 3 = 18</div>
        <div className="rounded-lg bg-[#e8f8fc] px-4 py-1.5 text-[#159ac1]">3. Subtract 3: 5x = 15</div>
        <div className="rounded-lg bg-[#eaf7f1] px-4 py-1.5 font-black text-[#277f59]">4. Divide by 5: x = 3</div>
      </div>
    </div>
  );
}

// Lesson 11: Equations with Fractions & Decimals
export function FractionsDecimalsEquationsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: LCD Clearing Multiplier</h4>
      <p className="text-xs text-[#73949f]">Multiply x/2 + 1/3 = 5/6 by LCD (6) to clear fractions.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="text-base font-bold text-[#159ac1]">
          6 × (x/2 + 1/3) = 6 × (5/6) → <span className="text-[#277f59]">3x + 2 = 5 → x = 1</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 12: Real-World Applications & Systems Intro
export function LinearSystemsIntroVisual() {
  const [miles, setMiles] = useState(15);
  const cost = 10 + 2 * miles;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: Linear Rate Line Plotter</h4>
      <p className="text-xs text-[#73949f]">Taxi Cost = $10 flat fee + $2 per mile (C = 10 + 2m).</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="text-base font-bold text-[#159ac1]">
          For {miles} miles: C = 10 + 2({miles}) = <span className="text-lg font-black text-[#277f59]">${cost}</span>
        </div>
        <input
          type="range"
          min="5"
          max="30"
          value={miles}
          onChange={(e) => setMiles(Number(e.target.value))}
          className="mt-3 h-2 w-48 accent-[#159ac1]"
        />
      </div>
    </div>
  );
}
