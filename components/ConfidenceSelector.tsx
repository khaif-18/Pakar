"use client";

import { CONFIDENCE_LABELS, CF_MAP } from "@/lib/expertSystem";
import type { ConfidenceLabel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  value: ConfidenceLabel;
  onChange: (val: ConfidenceLabel) => void;
  label?: string;
}

function getCfColor(lbl: ConfidenceLabel, active: boolean): string {
  if (!active) return "border-brand-200/10 bg-brand-800/40 text-brand-400 hover:border-brand-200/20 hover:text-brand-200";
  const cf = CF_MAP[lbl];
  if (cf >= 0.6) return "border-emerald-500/60 bg-emerald-500/10 text-emerald-300";
  if (cf >= 0.2) return "border-blue-400/60 bg-blue-500/10 text-blue-300";
  if (cf >= 0) return "border-brand-300/40 bg-brand-700/40 text-brand-200";
  if (cf >= -0.4) return "border-orange-400/60 bg-orange-500/10 text-orange-300";
  return "border-red-500/60 bg-red-500/10 text-red-300";
}

export default function ConfidenceSelector({ value, onChange, label }: Props) {
  return (
    <div className="space-y-2.5">
      {label && (
        <p
          className="text-brand-400 text-xs tracking-widest uppercase"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.15em" }}
        >
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {CONFIDENCE_LABELS.map((lbl) => {
          const active = value === lbl;
          return (
            <button
              key={lbl}
              type="button"
              onClick={() => onChange(lbl)}
              className={cn(
                "px-2.5 py-1.5 rounded border text-xs font-medium transition-all duration-150 cursor-pointer",
                getCfColor(lbl, active)
              )}
            >
              {lbl}
              {active && (
                <span
                  className="ml-1.5 opacity-70"
                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65em" }}
                >
                  ({CF_MAP[lbl] > 0 ? "+" : ""}{CF_MAP[lbl].toFixed(1)})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
