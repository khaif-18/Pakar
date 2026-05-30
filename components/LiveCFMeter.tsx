"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CF_MAP } from "@/lib/expertSystem";
import type { FormData } from "@/lib/types";

const R = 36;
const CIRC = 2 * Math.PI * R;

function estimateCF(f: FormData): { value: number | null; pct: number; label: string; done: boolean } {
  if (f.memberStatus === null) return { value: null, pct: 0, label: "Isi data member", done: false };

  const cfM = CF_MAP[f.cfMember];
  const cfS = CF_MAP[f.cfSubId];
  const memberCF =
    f.memberStatus && f.hasSubId
      ? Math.min(cfM, cfS) * 0.8
      : f.memberStatus
      ? Math.min(cfM, cfS) * 0.7
      : cfM * 0.65;

  if (f.caseType === null) {
    const v = memberCF;
    return { value: v, pct: Math.max(0, v), label: "Data member tercatat", done: false };
  }

  const cfC = Math.abs(CF_MAP[f.cfCase]);
  const partial = Math.min(memberCF, cfC);

  if (f.insideDamage === null) {
    return { value: partial, pct: Math.max(0, partial), label: "Estimasi sementara", done: false };
  }

  const cfI = CF_MAP[f.cfInside];
  const cfO = CF_MAP[f.cfOutside];
  const probCF = f.insideDamage
    ? Math.min(cfI, cfO) * 0.9
    : f.outsideDamage
    ? Math.min(cfI, cfO) * 0.8
    : Math.min(cfI, cfO) * 0.6;

  const v = Math.min(memberCF, cfC, probCF);
  return { value: v, pct: Math.max(0, v), label: "Estimasi CF final", done: true };
}

function cfColor(v: number): string {
  if (v >= 0.6) return "#10b981";
  if (v >= 0.35) return "#3b82f6";
  if (v >= 0) return "#f59e0b";
  return "#ef4444";
}

function cfLabel(v: number, done: boolean): string {
  if (!done) return "";
  if (v >= 0.6) return "Keyakinan Tinggi";
  if (v >= 0.35) return "Keyakinan Sedang";
  return "Keyakinan Rendah";
}

export default function LiveCFMeter({ formData }: { formData: FormData }) {
  const { value, pct, label, done } = estimateCF(formData);
  const dashOffset = CIRC * (1 - pct);
  const color = value !== null ? cfColor(value) : "#334155";

  return (
    <div className="glass-card p-5 flex flex-col items-center gap-3 select-none">
      <p className="text-brand-100 text-xs font-bold uppercase tracking-widest">
        Live CF
      </p>

      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96">
          {/* Track */}
          <circle
            cx="48" cy="48" r={R}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="7"
          />
          {/* Glow */}
          <circle
            cx="48" cy="48" r={R}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeOpacity={0.2}
          />
          {/* Progress arc */}
          <g transform="rotate(-90 48 48)">
            <motion.circle
              cx="48" cy="48" r={R}
              fill="none"
              stroke={color}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              animate={{ strokeDashoffset: dashOffset, stroke: color }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          </g>
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {value !== null ? (
              <motion.span
                key={value.toFixed(2)}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25 }}
                className="text-xl font-black leading-none tabular-nums"
                style={{ color }}
              >
                {value.toFixed(2)}
              </motion.span>
            ) : (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-brand-300 text-base font-bold"
              >
                —
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center space-y-0.5">
        <p className="text-brand-100 text-xs">{label}</p>
        <AnimatePresence>
          {done && value !== null && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-xs font-bold"
              style={{ color }}
            >
              {cfLabel(value, done)}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Mini factor bars */}
      {value !== null && (
        <div className="w-full space-y-2 pt-2 border-t border-white/20">
          {[
            { label: "Member", v: Math.max(0, CF_MAP[formData.cfMember]) },
            { label: "Kasus", v: formData.caseType ? Math.abs(CF_MAP[formData.cfCase]) : null },
            { label: "Problem", v: formData.insideDamage !== null ? Math.max(0, CF_MAP[formData.cfInside]) : null },
          ].map(({ label: l, v: bv }) => (
            <div key={l} className="flex items-center gap-2">
              <span className="text-brand-200 text-[10px] w-12 flex-shrink-0 font-medium">{l}</span>
              <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  animate={{ width: bv !== null ? `${bv * 100}%` : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-brand-100 text-[10px] w-6 text-right tabular-nums font-semibold">
                {bv !== null ? bv.toFixed(1) : "?"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
