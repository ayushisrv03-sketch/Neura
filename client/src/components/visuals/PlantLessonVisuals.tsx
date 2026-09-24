import React, { useState } from "react";
import { Leaf, Droplets, Sun, Flower } from "lucide-react";

// Lesson 2: Roots: Water & Nutrient Absorption
export function RootTypesVisual() {
  const [rootType, setRootType] = useState<"tap" | "fibrous">("tap");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 2 Visual: Taproot vs Fibrous Absorption Lab</h4>
      <p className="text-xs text-[#73949f]">Taproots reach deep underground; fibrous roots spread wide.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 200 120" className="h-36 w-56">
          <rect x="0" y="30" width="200" height="90" fill="#f5ede0" />
          {rootType === "tap" ? (
            <path d="M 100,30 L 100,110 Q 100,115 102,115" stroke="#a36e3b" strokeWidth="6" strokeLinecap="round" />
          ) : (
            <path d="M 100,30 L 60,100 M 100,30 L 80,110 M 100,30 L 120,110 M 100,30 L 140,100" stroke="#a36e3b" strokeWidth="3" />
          )}
        </svg>

        <span className="mt-2 text-sm font-bold text-[#159ac1]">
          {rootType === "tap" ? "Taproot (Carrot): Deep Central Anchor" : "Fibrous Root (Grass): Wide Surface Net"}
        </span>

        <div className="mt-3 flex gap-2">
          <button onClick={() => setRootType("tap")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${rootType === "tap" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Taproot</button>
          <button onClick={() => setRootType("fibrous")} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${rootType === "fibrous" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}>Fibrous Root</button>
        </div>
      </div>
    </div>
  );
}

// Lesson 3: Stems: Support & Transport System
export function StemTransportVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 3 Visual: Woody Stem Cross-Section Rings</h4>
      <p className="text-xs text-[#73949f]">Stems hold leaves to sunlight and transport water and food.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <svg viewBox="0 0 120 120" className="h-32 w-32">
          <circle cx="60" cy="60" r="50" fill="#edd6be" stroke="#8f5727" strokeWidth="4" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="#b07d51" strokeWidth="2" />
          <circle cx="60" cy="60" r="20" fill="none" stroke="#b07d51" strokeWidth="2" />
        </svg>
        <span className="mt-2 text-xs font-bold text-[#159ac1]">Annual Growth Rings & Vascular Bundles</span>
      </div>
    </div>
  );
}

// Lesson 4: Leaves: Photosynthesis & Gas Exchange
export function LeafStructureVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 4 Visual: Wide Blade Leaf Anatomy</h4>
      <p className="text-xs text-[#73949f]">Flat wide surface maximizes solar capture and stomatal gas exchange.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#277f59]">High Surface Area for Maximum Solar Capture</span>
      </div>
    </div>
  );
}

// Lesson 5: Flowers: Reproductive Structures
export function FlowerDissectionVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 5 Visual: Flower Organ Dissection</h4>
      <p className="text-xs text-[#73949f]">Petals attract pollinators; stamens make pollen; pistils contain ovules.</p>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="flex gap-3 text-xs font-bold text-[#159ac1]">
          <span className="rounded-lg bg-[#e8f8fc] px-3 py-1.5">Petal</span>
          <span className="rounded-lg bg-[#e8f8fc] px-3 py-1.5">Stamen (Pollen)</span>
          <span className="rounded-lg bg-[#e8f8fc] px-3 py-1.5">Pistil (Ovules)</span>
        </div>
      </div>
    </div>
  );
}

// Lesson 6: Seeds & Germination
export function SeedGerminationVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 6 Visual: Seed Sprouting Sequence</h4>
      <p className="text-xs text-[#73949f]">Moisture triggers seed swelling and primary root (radicle) emergence.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#277f59]">Seed Coat → Radicle Root → Hypocotyl Shoot</span>
      </div>
    </div>
  );
}

// Lesson 7: Fruit Formation
export function FruitOvaryVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 7 Visual: Flower Ovary to Fruit Transformer</h4>
      <p className="text-xs text-[#73949f]">Fertilized flower ovaries swell into fleshy fruits to protect seeds.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#bd6d39]">Flower Ovary → Fleshy Fruit (Enclosing Seeds)</span>
      </div>
    </div>
  );
}

// Lesson 8: Vascular System: Xylem & Phloem
export function XylemPhloemVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 8 Visual: Two-Way Vascular Highway</h4>
      <p className="text-xs text-[#73949f]">Xylem carries water UP; Phloem transports sugar BOTH ways.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Xylem (Water Up) | Phloem (Sugar Both Ways)</span>
      </div>
    </div>
  );
}

// Lesson 9: Plant Adaptations
export function PlantAdaptationsVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 9 Visual: Desert Cactus vs Rainforest Leaf Lab</h4>
      <p className="text-xs text-[#73949f]">Cactus waxy stem stores water; drip-tip leaves shed heavy rain.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Structural Adaptations for Extreme Environments</span>
      </div>
    </div>
  );
}

// Lesson 10: How Plants Support Ecosystems
export function ErosionSoilVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 10 Visual: Root Soil Anchoring Demo</h4>
      <p className="text-xs text-[#73949f]">Plant root networks bind soil particles to prevent land erosion.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#277f59]">Root Networks Prevent Land Erosion</span>
      </div>
    </div>
  );
}

// Lesson 11: Plant Care & Growth Cycles
export function GrowthCycleVisual() {
  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <h4 className="text-sm font-bold text-[#1d596b]">Lesson 11 Visual: Annual vs Perennial Growth Timeline</h4>
      <p className="text-xs text-[#73949f]">Annuals complete life cycles in 1 year; Perennials live multi-year.</p>
      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <span className="text-xs font-bold text-[#159ac1]">Annual (1 Year) vs Perennial (Multi-Year)</span>
      </div>
    </div>
  );
}

// Lesson 12: Pollination & Seed Dispersal
export function PollinationVisual() {
  const [vector, setVector] = useState<"bee" | "wind">("bee");

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-xs text-[#214554]">
      <div className="flex items-center justify-between border-b border-[#e1f0f4] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#1d596b]">Lesson 12 Visual: Pollination Vector Comparison</h4>
          <p className="text-xs text-[#73949f]">Transferring pollen grains from anther to sticky stigma for fertilization.</p>
        </div>
        <span className="rounded-lg bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1] capitalize">
          Vector: {vector === "bee" ? "Insect (Bee)" : "Wind Draft"}
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center rounded-xl bg-white p-6 border border-[#e3f1f4]">
        <div className="rounded-xl bg-[#f0fafc] p-4 text-center border border-[#d2edf3] max-w-sm w-full">
          {vector === "bee" ? (
            <div>
              <span className="text-sm font-bold text-[#159ac1]">🐝 Insect Pollination: Colorful Petals & Nectar</span>
              <p className="text-xs text-[#5e8a97] mt-1">Sticky pollen grains adhere to pollinator bodies and transfer to the stigma.</p>
            </div>
          ) : (
            <div>
              <span className="text-sm font-bold text-[#277f59]">💨 Wind Pollination: Feathery Stigmas</span>
              <p className="text-xs text-[#5e8a97] mt-1">Lightweight microscopic pollen airborne across grasslands and cereal crops.</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setVector("bee")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${vector === "bee" ? "bg-[#159ac1] text-white" : "bg-[#e8f8fc] text-[#159ac1]"}`}
          >
            Insect Pollination
          </button>
          <button
            onClick={() => setVector("wind")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${vector === "wind" ? "bg-[#277f59] text-white" : "bg-[#eaf7f1] text-[#277f59]"}`}
          >
            Wind Pollination
          </button>
        </div>
      </div>
    </div>
  );
}

