import { useDyslexiaFont } from "@/hooks/useLearningPreferences";

interface DyslexiaFontToggleProps {
  className?: string;
  variant?: "pill" | "header" | "compact" | "sidebar";
  showLabel?: boolean;
}

export function DyslexiaFontToggle({
  className = "",
  variant = "pill",
  showLabel = true,
}: DyslexiaFontToggleProps) {
  const { dyslexiaFont, toggleDyslexiaFont } = useDyslexiaFont();

  if (variant === "sidebar") {
    return (
      <button
        type="button"
        onClick={toggleDyslexiaFont}
        aria-pressed={dyslexiaFont}
        aria-label="Toggle dyslexia-friendly reading font"
        title={dyslexiaFont ? "Dyslexia-friendly font is active. Click to switch to standard font." : "Switch to OpenDyslexic dyslexia-friendly font"}
        className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-300 ${
          dyslexiaFont
            ? "bg-[#e2f5fa] border border-[#a2deee] text-[#0f6f8b] shadow-xs"
            : "bg-[#f4fafc] border border-[#e2eff2] text-[#4d7380] hover:bg-[#eaf4f7] hover:text-[#159ac1]"
        } ${className}`}
      >
        <span className="flex items-center gap-2">
          <span className={`grid h-6 w-6 place-items-center rounded-lg text-xs font-bold transition-colors ${
            dyslexiaFont ? "bg-[#159ac1] text-white" : "bg-[#e0eef2] text-[#557783]"
          }`}>
            Tt
          </span>
          <span>Dyslexia Font</span>
        </span>
        <span
          className={`h-2 w-2 rounded-full transition-colors ${
            dyslexiaFont ? "bg-[#159ac1]" : "bg-[#b8d1d9]"
          }`}
        />
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleDyslexiaFont}
        aria-pressed={dyslexiaFont}
        aria-label="Toggle dyslexia-friendly reading font"
        title={dyslexiaFont ? "Dyslexia-friendly font ON (Click to turn off)" : "Dyslexia-friendly font OFF (Click to turn on)"}
        className={`relative inline-flex items-center justify-center h-9 w-9 rounded-xl border text-xs font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159ac1] active:scale-95 ${
          dyslexiaFont
            ? "bg-[#e0f4f9] border-[#97dced] text-[#0d718e] shadow-xs"
            : "bg-white border-[#e2eef1] text-[#638491] hover:border-[#bfe5ee] hover:bg-[#f6fbfd] hover:text-[#159ac1]"
        } ${className}`}
      >
        <span>Tt</span>
        {dyslexiaFont && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#159ac1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#159ac1]"></span>
          </span>
        )}
      </button>
    );
  }

  // "pill" or "header" variant (default)
  return (
    <button
      type="button"
      onClick={toggleDyslexiaFont}
      aria-pressed={dyslexiaFont}
      aria-label="Toggle dyslexia-friendly reading font"
      title={dyslexiaFont ? "Dyslexia-friendly font ON — Click to restore standard NEURA font" : "Dyslexia-friendly font OFF — Click to apply OpenDyslexic font"}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159ac1] active:scale-95 ${
        dyslexiaFont
          ? "bg-[#dff3f8] border border-[#8ed7e9] text-[#0c6b87] shadow-xs font-bold"
          : "bg-white border border-[#dfeef1] text-[#557784] hover:border-[#b7e3ed] hover:bg-[#f4fafc] hover:text-[#159ac1]"
      } ${className}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
          dyslexiaFont ? "bg-[#159ac1] text-white" : "bg-[#edf5f7] text-[#618491]"
        }`}
      >
        Tt
      </span>
      {showLabel && (
        <span className="inline-flex items-center gap-1.5">
          <span>Dyslexia Font</span>
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              dyslexiaFont ? "bg-[#159ac1]" : "bg-slate-300"
            }`}
          />
        </span>
      )}
    </button>
  );
}

export default DyslexiaFontToggle;
