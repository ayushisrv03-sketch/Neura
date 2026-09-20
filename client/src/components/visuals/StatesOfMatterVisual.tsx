import React, { useState } from "react";
import { Flame, Snowflake, Thermometer } from "lucide-react";

export default function StatesOfMatterVisual() {
  const [temp, setTemp] = useState<number>(25); // -20 to 120 °C

  // Determine state based on temp
  const state = temp <= 0 ? "solid" : temp < 100 ? "liquid" : "gas";

  const particleSpeed = state === "solid" ? 0.3 : state === "liquid" ? 1.5 : 4.0;
  const particleSpacing = state === "solid" ? 22 : state === "liquid" ? 28 : 55;

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f7fcfe] p-5 shadow-sm text-[#214554]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1f0f4] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#ed946a] flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-[#ef946e]" />
            Particle Motion & Thermal Energy Sandbox
          </h3>
          <p className="mt-0.5 text-xs text-[#73949f]">
            Heat up or cool down the container to observe particle kinetic energy and phase transitions!
          </p>
        </div>
        <div className={`rounded-xl px-3 py-1.5 border text-xs font-bold ${
          state === "solid" ? "bg-[#e6f7fb] text-[#159ac1] border-[#bde5ef]" :
          state === "liquid" ? "bg-[#e5f8ef] text-[#318c60] border-[#c0ebd5]" :
          "bg-[#fff1e9] text-[#ed946a] border-[#fbdcd0]"
        }`}>
          {state === "solid" && "Solid State (Ice)"}
          {state === "liquid" && "Liquid State (Water)"}
          {state === "gas" && "Gas State (Steam)"}
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-2 items-center">
        {/* Particle Canvas / SVG Container */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 border border-[#e3f1f4] shadow-xs relative overflow-hidden">
          <div className="relative h-44 w-full rounded-xl border-2 border-[#159ac1] bg-[#fafdfe] overflow-hidden">
            <svg viewBox="0 0 280 150" className="w-full h-full">
              {/* Particle Grid / Array */}
              {Array.from({ length: state === "solid" ? 32 : state === "liquid" ? 24 : 14 }).map((_, idx) => {
                let x = 0;
                let y = 0;

                if (state === "solid") {
                  const col = idx % 8;
                  const row = Math.floor(idx / 8);
                  x = 55 + col * 24 + (idx % 2 === 0 ? 1 : -1);
                  y = 45 + row * 24 + (idx % 3 === 0 ? 1 : -1);
                } else if (state === "liquid") {
                  const col = idx % 6;
                  const row = Math.floor(idx / 6);
                  x = 40 + col * 34 + (Math.sin(idx + temp) * 6);
                  y = 70 + row * 20 + (Math.cos(idx + temp) * 4);
                } else {
                  // Gas
                  x = 30 + ((idx * 47 + temp * 5) % 220);
                  y = 20 + ((idx * 31 + temp * 7) % 110);
                }

                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={state === "gas" ? 6 : 8}
                    fill={state === "solid" ? "#38bdf8" : state === "liquid" ? "#159ac1" : "#ef946e"}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            <div className="absolute bottom-2 right-2 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#315866] shadow-xs border border-[#e1f0f4]">
              Temp: {temp}°C
            </div>
          </div>

          <p className="mt-3 text-xs font-semibold text-[#668793] text-center">
            {state === "solid" && "Particles are tightly packed in a fixed lattice and vibrate gently in place."}
            {state === "liquid" && "Particles slide past each other, taking the shape of their container."}
            {state === "gas" && "High kinetic energy! Particles bounce freely in all directions."}
          </p>
        </div>

        {/* Temperature & Mode Controls */}
        <div className="flex flex-col space-y-4">
          <div className="rounded-2xl bg-white p-5 border border-[#e3f1f4] space-y-4">
            <h4 className="text-xs font-bold text-[#ed946a] uppercase tracking-wider">Adjust Thermal Energy</h4>

            {/* Temp Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#315866]">
                <span className="flex items-center gap-1">
                  {temp < 0 ? <Snowflake className="h-4 w-4 text-[#38bdf8]" /> : <Flame className="h-4 w-4 text-[#ef946e]" />}
                  Temperature: {temp}°C
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="120"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="mt-2 w-full accent-[#ef946e]"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#91b1bc] font-semibold">
                <span>Freezing (-20°C)</span>
                <span>Melting (0°C)</span>
                <span>Boiling (100°C)</span>
              </div>
            </div>

            {/* Quick State Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                onClick={() => setTemp(-10)}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  state === "solid" ? "border-[#38bdf8] bg-[#e6f7fb] text-[#159ac1]" : "border-[#e2eff2] text-[#6d8d99] hover:bg-[#f6fbfd]"
                }`}
              >
                Ice (-10°C)
              </button>
              <button
                onClick={() => setTemp(25)}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  state === "liquid" ? "border-[#43b485] bg-[#e5f8ef] text-[#318c60]" : "border-[#e2eff2] text-[#6d8d99] hover:bg-[#f6fbfd]"
                }`}
              >
                Water (25°C)
              </button>
              <button
                onClick={() => setTemp(110)}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  state === "gas" ? "border-[#ef946e] bg-[#fff1e9] text-[#ed946a]" : "border-[#e2eff2] text-[#6d8d99] hover:bg-[#f6fbfd]"
                }`}
              >
                Steam (110°C)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
