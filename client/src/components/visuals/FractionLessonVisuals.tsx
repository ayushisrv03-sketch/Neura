import React, { useState } from "react";
import { Check, Info, RefreshCw, ArrowRight, Layers, Sliders, Calculator, PieChart, BarChart2 } from "lucide-react";

// Lesson 2: Fractions on a Number Line
export function FractionNumberLineVisual() {
  const [parts, setParts] = useState(4);
  const [selectedIdx, setSelectedIdx] = useState(2);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Fractions on a Number Line</h4>
          <p className="text-xs text-[#73949f]">Divide the segment from 0 to 1 into equal parts and position the fraction marker.</p>
        </div>
        <span className="rounded-lg bg-[#e3f7fb] px-2.5 py-1 text-xs font-bold text-[#159ac1]">
          {selectedIdx}/{parts} = {(selectedIdx / parts).toFixed(2)}
        </span>
      </div>

      <div className="mt-5 rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="relative my-8 h-2 w-full rounded-full bg-[#e1f0f4]">
          {Array.from({ length: parts + 1 }, (_, i) => {
            const pct = (i / parts) * 100;
            const isSelected = i === selectedIdx;
            return (
              <div key={i} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct}%` }}>
                <button
                  onClick={() => setSelectedIdx(i)}
                  className={`h-5 w-5 rounded-full border-2 transition ${
                    isSelected ? "border-[#159ac1] bg-[#159ac1] ring-4 ring-[#159ac1]/20 scale-125" : "border-[#82a4b0] bg-white hover:border-[#159ac1]"
                  }`}
                />
                <span className={`mt-2 text-xs font-bold ${isSelected ? "text-[#159ac1]" : "text-[#7899a5]"}`}>
                  {i}/{parts}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#f0f7f9] pt-4 text-xs font-semibold text-[#5e7d87]">
          <span>Segments: <strong>{parts} equal parts</strong></span>
          <div className="flex gap-2">
            {[2, 3, 4, 5, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => { setParts(num); setSelectedIdx(Math.min(selectedIdx, num)); }}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${parts === num ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"}`}
              >
                1/{num}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Lesson 3: Comparing Fractions
export function ComparingFractionsVisual() {
  const [numA, setNumA] = useState(3);
  const [denA, setDenA] = useState(4);
  const [numB, setNumB] = useState(2);
  const [denB, setDenB] = useState(3);

  const valA = numA / denA;
  const valB = numB / denB;
  const comparison = valA > valB ? ">" : valA < valB ? "<" : "=";

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="border-b border-[#e1f0f4] pb-3">
        <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Interactive Fraction Comparison</h4>
        <p className="text-xs text-[#73949f]">Compare two fractions visually by filling fraction bars side by side.</p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Fraction A */}
        <div className="rounded-xl bg-white p-4 border border-[#e3f1f4]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#159ac1]">Fraction A: {numA}/{denA}</span>
            <div className="flex gap-1">
              <button onClick={() => setNumA(Math.max(1, numA - 1))} className="h-6 w-6 rounded bg-[#e8f8fc] font-bold text-[#159ac1]">-</button>
              <button onClick={() => setNumA(Math.min(denA, numA + 1))} className="h-6 w-6 rounded bg-[#e8f8fc] font-bold text-[#159ac1]">+</button>
            </div>
          </div>
          <div className="flex h-10 overflow-hidden rounded-lg border border-[#d5eaef] bg-[#f4fbfc]">
            {Array.from({ length: denA }, (_, i) => (
              <div key={i} className={`flex-1 border-r border-[#d5eaef] transition-all ${i < numA ? "bg-[#159ac1]" : "bg-white"}`} />
            ))}
          </div>
        </div>

        {/* Fraction B */}
        <div className="rounded-xl bg-white p-4 border border-[#e3f1f4]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#277f59]">Fraction B: {numB}/{denB}</span>
            <div className="flex gap-1">
              <button onClick={() => setNumB(Math.max(1, numB - 1))} className="h-6 w-6 rounded bg-[#eaf7f1] font-bold text-[#277f59]">-</button>
              <button onClick={() => setNumB(Math.min(denB, numB + 1))} className="h-6 w-6 rounded bg-[#eaf7f1] font-bold text-[#277f59]">+</button>
            </div>
          </div>
          <div className="flex h-10 overflow-hidden rounded-lg border border-[#d2eadc] bg-[#f4fbf6]">
            {Array.from({ length: denB }, (_, i) => (
              <div key={i} className={`flex-1 border-r border-[#d2eadc] transition-all ${i < numB ? "bg-[#318c60]" : "bg-white"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 rounded-xl bg-white p-3 border border-[#e3f1f4]">
        <span className="text-lg font-bold text-[#159ac1]">{numA}/{denA}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#159ac1] text-lg font-black text-white shadow-xs">{comparison}</span>
        <span className="text-lg font-bold text-[#318c60]">{numB}/{denB}</span>
      </div>
    </div>
  );
}

// Lesson 4: Equivalent Fractions
export function EquivalentFractionsVisual() {
  const [factor, setFactor] = useState(2);
  const baseNum = 1;
  const baseDen = 2;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 4 Visual: Equivalent Fraction Multiplier</h4>
          <p className="text-xs text-[#73949f]">Multiply top and bottom by the same factor to see identical area coverage.</p>
        </div>
        <span className="text-sm font-bold text-[#159ac1]">
          {baseNum}/{baseDen} = {baseNum * factor}/{baseDen * factor}
        </span>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 rounded-xl bg-white p-5 border border-[#e3f1f4]">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-xs font-bold text-[#7899a5]">Base Fraction</span>
            <div className="mt-2 flex h-16 w-32 overflow-hidden rounded-lg border border-[#cbe4eb]">
              <div className="h-full w-1/2 bg-[#159ac1]" />
              <div className="h-full w-1/2 bg-white" />
            </div>
            <span className="mt-1 block text-sm font-bold text-[#159ac1]">1 / 2</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-[#159ac1]">× {factor}</span>
            <ArrowRight className="h-5 w-5 text-[#159ac1]" />
          </div>

          <div className="text-center">
            <span className="text-xs font-bold text-[#7899a5]">Equivalent Fraction</span>
            <div className="mt-2 flex h-16 w-32 overflow-hidden rounded-lg border border-[#cbe4eb]">
              {Array.from({ length: baseDen * factor }, (_, i) => (
                <div key={i} className={`h-full flex-1 border-r border-[#cbe4eb] ${i < baseNum * factor ? "bg-[#159ac1]" : "bg-white"}`} />
              ))}
            </div>
            <span className="mt-1 block text-sm font-bold text-[#159ac1]">
              {baseNum * factor} / {baseDen * factor}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-bold text-[#5e7d87]">Multiplier Factor:</span>
          {[2, 3, 4, 5, 6].map((f) => (
            <button
              key={f}
              onClick={() => setFactor(f)}
              className={`h-8 w-8 rounded-lg text-xs font-bold transition ${factor === f ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
            >
              ×{f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 5: Simplifying Fractions
export function SimplifyingFractionsVisual() {
  const [selectedNum, setSelectedNum] = useState(6);
  const [selectedDen, setSelectedDen] = useState(8);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const commonFactor = gcd(selectedNum, selectedDen);
  const simpleNum = selectedNum / commonFactor;
  const simpleDen = selectedDen / commonFactor;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="border-b border-[#e1f0f4] pb-3">
        <h4 className="text-sm font-bold text-[#1d596b]">Lesson 5 Visual: Simplification Factor Division</h4>
        <p className="text-xs text-[#73949f]">Divide by the Greatest Common Factor (GCF) to simplify fractions.</p>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 rounded-xl bg-white p-5 border border-[#e3f1f4]">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-[#e8f8fc] px-4 py-3 text-center border border-[#d1eef5]">
            <span className="text-xs font-bold text-[#7899a5]">Original</span>
            <div className="mt-1 text-2xl font-black text-[#159ac1]">{selectedNum} / {selectedDen}</div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-[#277f59]">÷ {commonFactor} (GCF)</span>
            <ArrowRight className="h-5 w-5 text-[#277f59]" />
          </div>

          <div className="rounded-xl bg-[#eaf7f1] px-4 py-3 text-center border border-[#ceeedc]">
            <span className="text-xs font-bold text-[#277f59]">Simplest Form</span>
            <div className="mt-1 text-2xl font-black text-[#277f59]">{simpleNum} / {simpleDen}</div>
          </div>
        </div>

        <div className="flex gap-2">
          {[
            [4, 8],
            [6, 8],
            [4, 12],
            [8, 12],
            [10, 15],
          ].map(([n, d]) => (
            <button
              key={`${n}/${d}`}
              onClick={() => { setSelectedNum(n); setSelectedDen(d); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${selectedNum === n && selectedDen === d ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
            >
              {n}/{d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 6: Adding Like Fractions
export function AddingLikeFractionsVisual() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const den = 5;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="border-b border-[#e1f0f4] pb-3">
        <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Adding Fractions with Like Denominators</h4>
        <p className="text-xs text-[#73949f]">Combine numerators directly when denominators are identical.</p>
      </div>

      <div className="mt-4 rounded-xl bg-white p-5 border border-[#e3f1f4] flex flex-col items-center">
        <div className="text-lg font-bold text-[#1d596b] flex items-center gap-3">
          <span className="text-[#159ac1]">{a}/{den}</span>
          <span>+</span>
          <span className="text-[#318c60]">{b}/{den}</span>
          <span>=</span>
          <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-[#159ac1]">{a + b}/{den}</span>
        </div>

        <div className="mt-4 flex h-10 w-full max-w-md overflow-hidden rounded-xl border border-[#cbe4eb] bg-[#f4fbfc]">
          {Array.from({ length: den }, (_, i) => (
            <div
              key={i}
              className={`flex-1 border-r border-[#cbe4eb] transition-all ${
                i < a ? "bg-[#159ac1]" : i < a + b ? "bg-[#318c60]" : "bg-white"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-4 text-xs font-bold">
          <div className="flex gap-1">
            <span>Part 1:</span>
            <button onClick={() => setA(Math.max(1, a - 1))} className="px-1.5 bg-[#e8f8fc] text-[#159ac1] rounded">-</button>
            <span>{a}</span>
            <button onClick={() => setA(Math.min(den - b, a + 1))} className="px-1.5 bg-[#e8f8fc] text-[#159ac1] rounded">+</button>
          </div>
          <div className="flex gap-1">
            <span>Part 2:</span>
            <button onClick={() => setB(Math.max(1, b - 1))} className="px-1.5 bg-[#eaf7f1] text-[#318c60] rounded">-</button>
            <span>{b}</span>
            <button onClick={() => setB(Math.min(den - a, b + 1))} className="px-1.5 bg-[#eaf7f1] text-[#318c60] rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Lesson 7: Subtracting Like Fractions
export function SubtractingLikeFractionsVisual() {
  const [start, setStart] = useState(5);
  const [sub, setSub] = useState(2);
  const den = 8;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="border-b border-[#e1f0f4] pb-3">
        <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Subtracting Fractions with Like Denominators</h4>
        <p className="text-xs text-[#73949f]">Subtract numerators while keeping the common denominator.</p>
      </div>

      <div className="mt-4 rounded-xl bg-white p-5 border border-[#e3f1f4] flex flex-col items-center">
        <div className="text-lg font-bold text-[#1d596b] flex items-center gap-3">
          <span className="text-[#159ac1]">{start}/{den}</span>
          <span>-</span>
          <span className="text-[#bd6d39]">{sub}/{den}</span>
          <span>=</span>
          <span className="rounded-lg bg-[#eaf7f1] px-3 py-1 text-[#277f59]">{start - sub}/{den}</span>
        </div>

        <div className="mt-4 flex h-10 w-full max-w-md overflow-hidden rounded-xl border border-[#cbe4eb] bg-[#f4fbfc]">
          {Array.from({ length: den }, (_, i) => (
            <div
              key={i}
              className={`flex-1 border-r border-[#cbe4eb] transition-all ${
                i < start - sub ? "bg-[#159ac1]" : i < start ? "bg-[#efab87] opacity-60" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 8: Mixed Numbers & Improper Fractions
export function MixedNumbersVisual() {
  const [improperNum, setImproperNum] = useState(7);
  const den = 4;

  const wholes = Math.floor(improperNum / den);
  const rem = improperNum % den;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="border-b border-[#e1f0f4] pb-3">
        <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Mixed Numbers & Improper Fractions</h4>
        <p className="text-xs text-[#73949f]">Convert between whole shapes and fractional remainders.</p>
      </div>

      <div className="mt-4 rounded-xl bg-white p-5 border border-[#e3f1f4] flex flex-col items-center">
        <div className="flex items-center gap-6 text-xl font-black text-[#159ac1]">
          <span>Improper: {improperNum}/{den}</span>
          <span>=</span>
          <span className="text-[#277f59]">Mixed: {wholes > 0 ? wholes : ""} {rem > 0 ? `${rem}/${den}` : ""}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 justify-center">
          {Array.from({ length: Math.ceil(improperNum / den) }, (_, shapeIdx) => {
            const filledInShape = Math.min(den, improperNum - shapeIdx * den);
            return (
              <div key={shapeIdx} className="flex flex-col items-center">
                <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#e8f8fc] p-2 border border-[#ccebf3]">
                  {Array.from({ length: den }, (_, cellIdx) => (
                    <div
                      key={cellIdx}
                      className={`h-8 w-8 rounded-lg border transition ${
                        cellIdx < filledInShape ? "bg-[#159ac1] border-[#159ac1]" : "bg-white border-[#bce2ed]"
                      }`}
                    />
                  ))}
                </div>
                <span className="mt-1 text-xs font-bold text-[#7899a5]">
                  {filledInShape === den ? "1 Whole" : `${filledInShape}/${den}`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex gap-2">
          {[5, 7, 9, 11].map((val) => (
            <button
              key={val}
              onClick={() => setImproperNum(val)}
              className={`rounded-lg px-3 py-1 text-xs font-bold ${improperNum === val ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
            >
              {val}/4
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lesson 9: Unlike Fractions
export function UnlikeFractionsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Common Denominator Grid</h4>
      <p className="text-xs text-[#73949f]">Convert 1/2 and 1/3 into 3/6 and 2/6 to add unlike fractions.</p>

      <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-white p-5 border border-[#e3f1f4]">
        <div className="flex items-center gap-4 text-base font-bold text-[#1d596b]">
          <span>1/2 (3/6)</span>
          <span>+</span>
          <span>1/3 (2/6)</span>
          <span>=</span>
          <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-[#159ac1]">5/6</span>
        </div>

        <div className="flex h-10 w-full max-w-md overflow-hidden rounded-xl border border-[#cbe4eb] bg-[#f4fbfc]">
          <div className="h-full w-3/6 bg-[#159ac1] border-r border-white" />
          <div className="h-full w-2/6 bg-[#318c60] border-r border-white" />
          <div className="h-full w-1/6 bg-white" />
        </div>
      </div>
    </div>
  );
}

// Lesson 10: Multiplying Fractions
export function MultiplyingFractionsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Area Model Grid Intersection</h4>
      <p className="text-xs text-[#73949f]">Multiply numerators and denominators: 1/2 × 3/4 = 3/8.</p>

      <div className="mt-4 flex flex-col items-center rounded-xl bg-white p-5 border border-[#e3f1f4]">
        <div className="grid grid-cols-4 gap-1.5 rounded-xl bg-[#e8f8fc] p-3 border border-[#ccebf3]">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`h-10 w-12 rounded-lg border text-center text-[10px] font-bold flex items-center justify-center ${
                i < 3 ? "bg-[#159ac1] text-white border-[#159ac1]" : "bg-white text-[#89abb7] border-[#c4e4ed]"
              }`}
            >
              {i < 3 ? "3/8" : "1/8"}
            </div>
          ))}
        </div>
        <span className="mt-3 text-sm font-bold text-[#159ac1]">Area = 3 out of 8 grid squares = 3/8</span>
      </div>
    </div>
  );
}

// Lesson 11: Dividing Fractions
export function DividingFractionsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Reciprocal Multiply & Flip</h4>
      <p className="text-xs text-[#73949f]">1/2 ÷ 1/4 → 1/2 × 4/1 = 2 whole pieces.</p>

      <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white p-5 border border-[#e3f1f4] text-lg font-bold text-[#159ac1]">
        <span>1/2</span>
        <span>÷</span>
        <span>1/4</span>
        <ArrowRight className="h-5 w-5 text-[#277f59]" />
        <span className="text-[#277f59]">1/2 × 4/1 = 2</span>
      </div>
    </div>
  );
}

// Lesson 12: Real-World Fraction Problems
export function FractionWordProblemsVisual() {
  const [servings, setServings] = useState(2);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: Recipe Fraction Scaler</h4>
      <p className="text-xs text-[#73949f]">Scale 3/4 cup flour for multiple recipe batches.</p>

      <div className="mt-4 flex flex-col items-center rounded-xl bg-white p-5 border border-[#e3f1f4]">
        <div className="flex items-center gap-4 text-base font-bold text-[#159ac1]">
          <span>3/4 cup × {servings} batches =</span>
          <span className="rounded-xl bg-[#e8f8fc] px-4 py-1.5 text-lg font-black text-[#159ac1]">
            {(3 * servings) / 4} cups
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setServings(s)}
              className={`rounded-lg px-3 py-1 text-xs font-bold ${servings === s ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
            >
              {s} Batches
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
