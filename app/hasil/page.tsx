"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, animate } from "framer-motion";
import Link from "next/link";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  RotateCcw,
  Printer,
  History,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldOff,
  Shield,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { SUPPORT_LEVEL_META } from "@/lib/expertSystem";
import { formatCF, formatDate } from "@/lib/utils";
import type { SupportLevel } from "@/lib/types";
import Confetti from "@/components/Confetti";

const levelIcons: Record<SupportLevel, React.ElementType> = {
  "Level High Support": AlertTriangle,
  "Level Medium Support": Shield,
  "Level Standard Support": CheckCircle2,
  "Information Other": Info,
  "Non Member Support": ShieldOff,
};

const levelColors: Record<SupportLevel, { text: string; border: string; bg: string; gauge: string }> = {
  "Level High Support": {
    text: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    gauge: "#ef4444",
  },
  "Level Medium Support": {
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    gauge: "#f97316",
  },
  "Level Standard Support": {
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    gauge: "#3b82f6",
  },
  "Information Other": {
    text: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    gauge: "#a855f7",
  },
  "Non Member Support": {
    text: "text-gray-400",
    border: "border-gray-500/30",
    bg: "bg-gray-500/10",
    gauge: "#6b7280",
  },
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
}) => {
  if (active && payload?.length) {
    return (
      <div className="bg-brand-800 border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-brand-50 text-sm font-semibold">{payload[0].name}</p>
        <p className="text-primary text-lg font-bold">{formatCF(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function HasilPage() {
  const { result, resetForm } = useStore();
  const router = useRouter();
  const cfRef = useRef<HTMLSpanElement>(null);
  const cfRef2 = useRef<HTMLSpanElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!result) router.replace("/konsultasi");
  }, [result, router]);

  useEffect(() => {
    if (!result) return;

    const celebrationLevels: SupportLevel[] = ["Level High Support", "Level Medium Support", "Level Standard Support"];
    if (celebrationLevels.includes(result.recommendation)) {
      const t = setTimeout(() => setShowConfetti(true), 300);
      return () => clearTimeout(t);
    }
  }, [result]);

  useEffect(() => {
    if (!result) return;
    const target = Math.max(0, result.cfFinal);

    const controls1 = animate(0, target, {
      duration: 1.4,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (cfRef.current) cfRef.current.textContent = formatCF(v);
      },
    });
    const controls2 = animate(0, target, {
      duration: 1.4,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (cfRef2.current) cfRef2.current.textContent = formatCF(v);
      },
    });

    return () => { controls1.stop(); controls2.stop(); };
  }, [result]);

  if (!result) return null;

  const meta = SUPPORT_LEVEL_META[result.recommendation];
  const colors = levelColors[result.recommendation];
  const LevelIcon = levelIcons[result.recommendation];

  const gaugeData = [
    {
      name: "CF",
      value: Math.max(0, result.cfFinal) * 100,
      fill: colors.gauge,
    },
  ];

  const barData = [
    {
      name: "Member",
      value: Math.max(0, result.cfMemberFactor.cf),
      rule: result.cfMemberFactor.rule,
    },
    {
      name: "Kasus",
      value: Math.max(0, result.cfCaseFactor.cf),
      rule: result.cfCaseFactor.rule,
    },
    {
      name: "Kerusakan",
      value: Math.max(0, result.cfProblemFactor.cf),
      rule: result.cfProblemFactor.rule,
    },
  ];

  const barColors = ["#5b8ab1", "#b1d4e8", "#88bdd9"];

  return (
    <div className="min-h-screen bg-grid pt-24 pb-16 px-4">
      {showConfetti && <Confetti />}
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="overline mb-1">HASIL KONSULTASI</p>
            <h1
              className="display-heading text-4xl text-brand-50"
              style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900 }}
            >
              REKOMENDASI SISTEM
            </h1>
            <p
              className="text-brand-500 text-xs mt-1.5"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}
            >
              {formatDate(result.timestamp)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="btn-ghost p-2.5"
              title="Print"
            >
              <Printer size={16} />
            </button>
            <Link
              href="/history"
              className="btn-ghost p-2.5"
              title="Riwayat"
            >
              <History size={16} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left: Main result */}
          <div className="lg:col-span-3 space-y-5">
            {/* Recommendation card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`panel p-7 border-t-2`}
              style={{ borderTopColor: colors.gauge }}
            >
              <div className="rule-tag mb-5">{meta.badge}</div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded border flex items-center justify-center flex-shrink-0"
                     style={{ borderColor: colors.gauge + "40", background: colors.gauge + "15" }}>
                  <LevelIcon size={22} className={colors.text} />
                </div>
                <div>
                  <h2
                    className="text-2xl text-brand-50 leading-tight"
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, letterSpacing: "0.02em" }}
                  >
                    {result.recommendation.toUpperCase()}
                  </h2>
                  <span className="rule-tag mt-1 inline-block">RULE {result.ruleApplied}</span>
                </div>
              </div>

              <p className="text-brand-300 text-sm leading-relaxed mt-5">
                {result.description}
              </p>

              {/* CF Score */}
              <div className="mt-6 pt-5 border-t border-brand-200/8">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-brand-500 text-xs mb-1 uppercase tracking-widest"
                      style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                    >
                      CERTAINTY FACTOR
                    </p>
                    <p
                      className="text-5xl font-bold cf-value amber-glow"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <span ref={cfRef}>0.0%</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-brand-500 text-xs mb-1 uppercase tracking-widest"
                      style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                    >
                      KEYAKINAN
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        result.cfFinal >= 0.7 ? "text-emerald-400"
                        : result.cfFinal >= 0.4 ? "text-yellow-400"
                        : "text-red-400"
                      }`}
                      style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800 }}
                    >
                      {result.cfFinal >= 0.7 ? "TINGGI" : result.cfFinal >= 0.4 ? "SEDANG" : "RENDAH"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Factor breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="panel p-6"
            >
              <p className="overline mb-5">BREAKDOWN FAKTOR CF</p>

              {[result.cfMemberFactor, result.cfCaseFactor, result.cfProblemFactor].map((f, i) => (
                <div key={f.rule} className="mb-5 last:mb-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="rule-tag">{f.rule}</span>
                      <span className="text-brand-200 text-sm">{f.label}</span>
                    </div>
                    <span
                      className="cf-value text-sm"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {formatCF(f.cf)}
                    </span>
                  </div>
                  <div className="h-1 bg-brand-200/8 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: barColors[i] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, f.cf) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <p className="text-brand-500 text-xs mt-1.5"
                     style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem" }}>
                    {f.explanation}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3"
            >
              <Link
                href="/konsultasi"
                onClick={resetForm}
                className="btn-amber flex-1 justify-center"
              style={{ borderRadius: "0.375rem" }}
              >
                <RotateCcw size={15} />
                Konsultasi Baru
              </Link>
              <Link
                href="/"
                className="btn-outline flex-1 justify-center"
              >
                <ArrowLeft size={15} />
                Beranda
              </Link>
            </motion.div>
          </div>

          {/* Right: Charts */}
          <div className="lg:col-span-2 space-y-5">
            {/* Gauge chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="panel p-6 text-center"
            >
              <p className="overline mb-2">CONFIDENCE GAUGE</p>
              <div className="h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    startAngle={210}
                    endAngle={-30}
                    data={gaugeData}
                    barSize={16}
                  >
                    <RadialBar
                      background={{ fill: "rgba(255,255,255,0.05)" }}
                      dataKey="value"
                      cornerRadius={8}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="-mt-6">
                <p className="text-4xl font-black text-primary">
                  <span ref={cfRef2}>0.0%</span>
                </p>
                <p className="text-brand-400 text-xs mt-1">Certainty Factor Final</p>
              </div>
            </motion.div>

            {/* Bar chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="panel p-6"
            >
              <p className="overline mb-4">CF PER FAKTOR</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 20 }}>
                    <XAxis type="number" domain={[0, 1]} tick={{ fill: "#88bdd9", fontSize: 10 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fill: "#88bdd9", fontSize: 11 }} width={60} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={barColors[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Diagnosis summary */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="panel p-5 space-y-4"
            >
              <p className="overline">RINGKASAN DIAGNOSIS</p>
              <div className="space-y-3">
                {[
                  { label: "Status Member", val: result.memberStatusResult ? "TERVERIFIKASI" : "TIDAK VALID", ok: result.memberStatusResult },
                  { label: "Tingkat Risiko", val: result.severityResult, ok: result.severityResult !== "High Risk" },
                  { label: "Rule Diterapkan", val: result.ruleApplied, ok: true, mono: true },
                ].map(({ label, val, ok, mono }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-brand-400 text-xs"
                          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
                      {label.toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-bold ${mono ? "cf-value" : ok ? "text-emerald-400" : "text-red-400"}`}
                      style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem" }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
