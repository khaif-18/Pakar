"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

  useEffect(() => {
    if (!result) router.replace("/konsultasi");
  }, [result, router]);

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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-black text-brand-50">Hasil Konsultasi</h1>
            <p className="text-brand-300 text-sm mt-1">
              {formatDate(result.timestamp)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl border border-white/15 text-brand-300 hover:text-brand-50 hover:bg-white/5 transition-all"
              title="Print"
            >
              <Printer size={18} />
            </button>
            <Link
              href="/history"
              className="p-2.5 rounded-xl border border-white/15 text-brand-300 hover:text-brand-50 hover:bg-white/5 transition-all"
              title="Riwayat"
            >
              <History size={18} />
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
              className={`glass-card p-7 border ${colors.border}`}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 ${colors.bg} ${colors.text}`}>
                {meta.badge}
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                  <LevelIcon size={26} className={colors.text} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-brand-50 leading-tight">
                    {result.recommendation}
                  </h2>
                  <p className={`text-sm font-semibold mt-1 ${colors.text}`}>
                    Rule {result.ruleApplied} terpenuhi
                  </p>
                </div>
              </div>

              <p className="text-brand-200 text-sm leading-relaxed mt-5">
                {result.description}
              </p>

              {/* CF Score */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-400 text-xs uppercase tracking-wider">
                      Certainty Factor
                    </p>
                    <p className="text-4xl font-black text-primary mt-1">
                      {formatCF(result.cfFinal)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-400 text-xs uppercase tracking-wider">
                      Tingkat Keyakinan
                    </p>
                    <p className={`text-xl font-bold mt-1 ${
                      result.cfFinal >= 0.7
                        ? "text-emerald-400"
                        : result.cfFinal >= 0.4
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}>
                      {result.cfFinal >= 0.7 ? "Tinggi" : result.cfFinal >= 0.4 ? "Sedang" : "Rendah"}
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
              className="glass-card p-6"
            >
              <h3 className="text-brand-50 font-bold text-base mb-5">
                Breakdown Faktor CF
              </h3>

              {[result.cfMemberFactor, result.cfCaseFactor, result.cfProblemFactor].map((f, i) => (
                <div key={f.rule} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <span className="text-brand-50 text-sm font-medium">{f.label}</span>
                      <span className="ml-2 text-brand-500 text-xs font-mono">{f.rule}</span>
                    </div>
                    <span className="text-primary text-sm font-bold">{formatCF(f.cf)}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: barColors[i] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, f.cf) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-brand-400 text-xs mt-1">{f.explanation}</p>
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
                className="flex-1 flex items-center justify-center gap-2 border border-white/15 text-brand-200 hover:text-brand-50 hover:bg-white/5 font-medium px-5 py-3 rounded-xl transition-all duration-200"
              >
                <RotateCcw size={16} />
                Konsultasi Baru
              </Link>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-secondary/20 hover:bg-secondary/30 text-primary font-medium px-5 py-3 rounded-xl transition-all duration-200"
              >
                <ArrowLeft size={16} />
                Kembali ke Beranda
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
              className="glass-card p-6 text-center"
            >
              <h3 className="text-brand-50 font-bold text-sm uppercase tracking-wider mb-2">
                Confidence Gauge
              </h3>
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
                  {formatCF(result.cfFinal)}
                </p>
                <p className="text-brand-400 text-xs mt-1">Certainty Factor Final</p>
              </div>
            </motion.div>

            {/* Bar chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-brand-50 font-bold text-sm uppercase tracking-wider mb-4">
                CF per Faktor
              </h3>
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
              className="glass-card p-5 space-y-3"
            >
              <h3 className="text-brand-50 font-bold text-sm uppercase tracking-wider">
                Ringkasan Diagnosis
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-300">Status Member</span>
                  <span className={`font-semibold ${result.memberStatusResult ? "text-emerald-400" : "text-red-400"}`}>
                    {result.memberStatusResult ? "Terverifikasi" : "Tidak Valid"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-300">Tingkat Risiko</span>
                  <span className={`font-semibold ${result.severityResult === "High Risk" ? "text-red-400" : "text-emerald-400"}`}>
                    {result.severityResult}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-300">Rule Diterapkan</span>
                  <span className="text-primary font-mono font-bold">{result.ruleApplied}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
