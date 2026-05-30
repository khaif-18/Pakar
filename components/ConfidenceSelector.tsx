"use client";

import { CONFIDENCE_LABELS, CF_MAP } from "@/lib/expertSystem";
import type { ConfidenceLabel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  value: ConfidenceLabel;
  onChange: (val: ConfidenceLabel) => void;
  label?: string;
}

const colorMap: Record<string, string> = {
  "Sangat Yakin": "border-emerald-500 bg-emerald-500/20 text-emerald-300",
  "Yakin": "border-emerald-400 bg-emerald-400/15 text-emerald-300",
  "Cukup Yakin": "border-blue-400 bg-blue-400/15 text-blue-300",
  "Kurang Yakin": "border-yellow-400 bg-yellow-400/15 text-yellow-300",
  "Tidak Tahu": "border-gray-400 bg-gray-400/15 text-gray-300",
  "Kurang Tidak Yakin": "border-orange-400 bg-orange-400/15 text-orange-300",
  "Cukup Tidak Yakin": "border-orange-500 bg-orange-500/15 text-orange-300",
  "Tidak Yakin": "border-red-400 bg-red-400/15 text-red-300",
  "Sangat Tidak Yakin": "border-red-600 bg-red-600/20 text-red-300",
};

const defaultColor =
  "border-white/20 bg-white/5 text-brand-300 hover:border-white/30 hover:bg-white/10";

export default function ConfidenceSelector({ value, onChange, label }: Props) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-brand-200 text-sm font-medium">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {CONFIDENCE_LABELS.map((lbl) => {
          const active = value === lbl;
          return (
            <button
              key={lbl}
              type="button"
              onClick={() => onChange(lbl)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 cursor-pointer",
                active ? colorMap[lbl] : defaultColor
              )}
            >
              {lbl}
              {active && (
                <span className="ml-1.5 font-mono opacity-70">
                  ({CF_MAP[lbl] > 0 ? "+" : ""}
                  {CF_MAP[lbl].toFixed(1)})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
