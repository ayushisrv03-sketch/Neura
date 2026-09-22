import React, { useState } from "react";
import { RotateCcw, Sliders, Eye } from "lucide-react";

// Lesson 1: Point, Line, and Angle Basics
export function AngleBasicsVisual() {
  const [angle, setAngle] = useState(60);
  const type = angle < 90 ? "Acute Angle" : angle === 90 ? "Right Angle" : "Obtuse Angle";

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 1 Visual: Interactive Protractor Angle Rotator</h4>
          <p className="text-xs text-[#73949f]">Rotate the ray to measure degrees and classify the angle.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
          {angle}° ({type})
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 240 140" className="h-44 w-full max-w-md">
          {/* Protractor Arc */}
          <path d="M 20,120 A 100,100 0 0,1 220,120 Z" fill="#e8f8fc" stroke="#b0d4df" strokeWidth="2" />
          <line x1="20" y1="120" x2="220" y2="120" stroke="#1d596b" strokeWidth="3" />

          {/* Base Ray */}
          <line x1="120" y1="120" x2="210" y2="120" stroke="#1d596b" strokeWidth="3" />

          {/* Rotated Ray */}
          <line
            x1="120"
            y1="120"
            x2={120 + 90 * Math.cos((-angle * Math.PI) / 180)}
            y2={120 + 90 * Math.sin((-angle * Math.PI) / 180)}
            stroke="#159ac1"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Angle Arc Fill */}
          <path
            d={`M 150,120 A 30,30 0 0,0 ${120 + 30 * Math.cos((-angle * Math.PI) / 180)},${120 + 30 * Math.sin((-angle * Math.PI) / 180)} L 120,120 Z`}
            fill="#159ac1"
            opacity="0.3"
          />

          <circle cx="120" cy="120" r="5" fill="#159ac1" />
          <text x="120" y="110" textAnchor="middle" fill="#159ac1" fontSize="11" fontWeight="bold">{angle}°</text>
        </svg>

        <div className="mt-4 flex items-center gap-3 w-full max-w-xs">
          <span className="text-xs font-bold text-[#7899a5]">10°</span>
          <input
            type="range"
            min="10"
            max="170"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="h-2 flex-1 accent-[#159ac1]"
          />
          <span className="text-xs font-bold text-[#7899a5]">170°</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 2: Types of Angles & Measuring
export function AngleTypesVisual() {
  const [a, setA] = useState(35);
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Complementary & Supplementary Arc Diagram</h4>
          <p className="text-xs text-[#73949f]">Complementary sum to 90°; Supplementary sum to 180°.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 240 130" className="h-40 w-full max-w-md">
          {/* Straight Line 180 */}
          <line x1="20" y1="110" x2="220" y2="110" stroke="#84a6b2" strokeWidth="3" />
          {/* 90 degree perpendicular line */}
          <line x1="120" y1="110" x2="120" y2="20" stroke="#84a6b2" strokeWidth="2" strokeDasharray="3 3" />

          {/* Angle ray */}
          <line
            x1="120"
            y1="110"
            x2={120 + 80 * Math.cos((-a * Math.PI) / 180)}
            y2={110 + 80 * Math.sin((-a * Math.PI) / 180)}
            stroke="#159ac1"
            strokeWidth="4"
          />

          <circle cx="120" cy="110" r="4" fill="#159ac1" />
        </svg>

        <div className="flex gap-6 text-xs font-bold text-[#159ac1]">
          <span>Angle A: {a}°</span>
          <span className="text-[#159ac1]">Complement (90 - A): {90 - a}°</span>
          <span className="text-[#277f59]">Supplement (180 - A): {180 - a}°</span>
        </div>

        <input
          type="range"
          min="10"
          max="80"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          className="mt-4 h-2 w-full max-w-xs accent-[#159ac1]"
        />
      </div>
    </div>
  );
}

// Lesson 3: Parallel and Perpendicular Lines
export function ParallelLinesVisual() {
  const [angle, setAngle] = useState(60);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Parallel Lines & Transversal Highlighter</h4>
          <p className="text-xs text-[#73949f]">Corresponding and alternate interior angles are equal in measure.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 300 140" className="h-40 w-full max-w-md">
          {/* Parallel Lines */}
          <line x1="30" y1="40" x2="270" y2="40" stroke="#159ac1" strokeWidth="4" />
          <line x1="30" y1="100" x2="270" y2="100" stroke="#159ac1" strokeWidth="4" />

          {/* Transversal Line */}
          <line
            x1={150 - 80 * Math.cos((angle * Math.PI) / 180)}
            y1={70 - 80 * Math.sin((angle * Math.PI) / 180)}
            x2={150 + 80 * Math.cos((angle * Math.PI) / 180)}
            y2={70 + 80 * Math.sin((angle * Math.PI) / 180)}
            stroke="#277f59"
            strokeWidth="3"
          />

          <text x="240" y="30" fill="#159ac1" fontSize="11" fontWeight="bold">Line L1</text>
          <text x="240" y="120" fill="#159ac1" fontSize="11" fontWeight="bold">Line L2</text>
        </svg>

        <span className="mt-2 text-xs font-bold text-[#277f59]">
          Alternate Interior Angles are Equal ({angle}°)
        </span>
      </div>
    </div>
  );
}

// Lesson 5: Classifying Triangles
export function TriangleClassifierVisual() {
  const [type, setType] = useState<"equi" | "iso" | "sca">("equi");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 5 Visual: Triangle Classifier Morpher</h4>
      <p className="text-xs text-[#73949f]">Classify by side lengths and interior angle measurements.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 200 120" className="h-36 w-56">
          <polygon
            points={
              type === "equi"
                ? "100,20 40,100 160,100"
                : type === "iso"
                ? "100,20 60,100 140,100"
                : "70,20 30,100 170,100"
            }
            fill="#e8f8fc"
            stroke="#159ac1"
            strokeWidth="3"
          />
        </svg>

        <span className="mt-3 text-sm font-bold text-[#159ac1]">
          {type === "equi" ? "Equilateral: 3 equal sides & 60° angles" : type === "iso" ? "Isosceles: 2 equal sides" : "Scalene: All 3 sides & angles different"}
        </span>

        <div className="mt-3 flex gap-2">
          <button onClick={() => setType("equi")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${type === "equi" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Equilateral</button>
          <button onClick={() => setType("iso")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${type === "iso" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Isosceles</button>
          <button onClick={() => setType("sca")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${type === "sca" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Scalene</button>
        </div>
      </div>
    </div>
  );
}

// Lesson 6: Quadrilaterals & Polygons
export function QuadrilateralsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: 360° Interior Angle Sum</h4>
      <p className="text-xs text-[#73949f]">All 4-sided polygons have interior angles summing to 360°.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 200 120" className="h-36 w-56">
          <polygon points="40,30 160,20 170,100 30,90" fill="#eaf7f1" stroke="#277f59" strokeWidth="3" />
        </svg>
        <span className="mt-2 text-sm font-black text-[#277f59]">90° + 90° + 100° + 80° = 360°</span>
      </div>
    </div>
  );
}

// Lesson 7: Perimeter of Plane Figures
export function PerimeterVisual() {
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(3);
  const perimeter = 2 * (length + width);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Shape Boundary Perimeter Tracer</h4>
      <p className="text-xs text-[#73949f]">Perimeter = 2 × (Length + Width).</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex h-24 w-48 items-center justify-center rounded-xl bg-[#e8f8fc] border-4 border-[#159ac1] font-bold text-[#159ac1]">
          {length} cm × {width} cm
        </div>
        <span className="mt-3 text-lg font-black text-[#277f59]">Perimeter = {perimeter} cm</span>
      </div>
    </div>
  );
}

// Lesson 8: Area of Rectangles & Triangles
export function AreaRectangleTriangleVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Grid Area Overlay</h4>
      <p className="text-xs text-[#73949f]">Triangle Area = 1/2 × base × height.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-base font-bold text-[#159ac1]">Base 6 cm × Height 4 cm → Rectangle Area 24 cm² | Triangle Area 12 cm²</span>
      </div>
    </div>
  );
}

// Lesson 9: Circumference of Circles
export function CircumferenceVisual() {
  const [r, setR] = useState(5);
  const c = (2 * Math.PI * r).toFixed(1);

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Rolling Wheel Circumference</h4>
      <p className="text-xs text-[#73949f]">Circumference C = 2πr = πd.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 120 120" className="h-32 w-32">
          <circle cx="60" cy="60" r="45" fill="#e8f8fc" stroke="#159ac1" strokeWidth="4" />
          <line x1="60" y1="60" x2="105" y2="60" stroke="#159ac1" strokeWidth="3" />
          <text x="80" y="55" fill="#159ac1" fontSize="10" fontWeight="bold">r={r}</text>
        </svg>
        <span className="mt-3 text-lg font-black text-[#159ac1]">C = 2 × 3.14 × {r} = {c} cm</span>
      </div>
    </div>
  );
}

// Lesson 10: Area of Circles
export function CircleAreaVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Sector Area Rearranger</h4>
      <p className="text-xs text-[#73949f]">Area = πr².</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-base font-bold text-[#159ac1]">r = 5 cm → Area = 3.14 × 25 = 78.5 cm²</span>
      </div>
    </div>
  );
}

// Lesson 11: 3D Shapes & Net Diagrams
export function Net3DVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: 3D Cube Net Unfolder</h4>
      <p className="text-xs text-[#73949f]">6 connected square faces fold into a 3D cube.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">6 Faces | 12 Edges | 8 Vertices</span>
      </div>
    </div>
  );
}

// Lesson 12: Volume of Cubes & Rectangular Prisms
export function VolumePrismsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: 3D Volume Stacker</h4>
      <p className="text-xs text-[#73949f]">Volume V = Length × Width × Height.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-lg font-black text-[#159ac1]">4cm × 3cm × 2cm = 24 cm³</span>
      </div>
    </div>
  );
}

// Lesson 13: Surface Area Basics
export function SurfaceAreaVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 13 Visual: Surface Area Face Calculator</h4>
      <p className="text-xs text-[#73949f]">Sum of all 6 face areas enclosing the 3D shape.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-base font-bold text-[#159ac1]">Cube side = 2 cm → SA = 6 × 4 = 24 cm²</span>
      </div>
    </div>
  );
}

// Lesson 14: Geometric Problem Solving
export function GeometricProblemVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 14 Visual: Room & Patio Layout Planner</h4>
      <p className="text-xs text-[#73949f]">Calculate 1m² tiles to pave a 5m × 4m patio floor.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-base font-bold text-[#159ac1]">5m × 4m = 20 m² → Requires 20 tiles</span>
      </div>
    </div>
  );
}
