"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KNOWLEDGE_BASE_RULES } from "@/lib/expertSystem";
import { BookOpen, Filter, ChevronRight, Info } from "lucide-react";

const CATEGORIES = ["Semua", "Member", "Problem", "Case", "Recommendation"];

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Member: { text: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  Problem: { text: "text-red-300", bg: "bg-red-500/10", border: "border-red-500/30" },
  Case: { text: "text-purple-300", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  Recommendation: { text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
};

export default function KnowledgeBasePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    activeCategory === "Semua"
      ? KNOWLEDGE_BASE_RULES
      : KNOWLEDGE_BASE_RULES.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen bg-grid pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <BookOpen size={22} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-brand-50">Knowledge Base</h1>
              <p className="text-brand-300 text-sm">
                {KNOWLEDGE_BASE_RULES.length} rule IF-THEN dalam basis pengetahuan sistem
              </p>
            </div>
          </div>

          <div className="panel p-5 flex items-start gap-3 border-l-2 border-accent/30">
            <Info size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-brand-200 text-sm leading-relaxed">
                Sistem pakar E-Bengkel menggunakan metode{" "}
                <strong className="text-primary">Certainty Factor (CF)</strong> untuk
                menangani ketidakpastian. Setiap rule memiliki bobot CF tersendiri,
                dan hasil akhir dihitung dengan formula:{" "}
                <code className="bg-white/10 px-2 py-0.5 rounded text-xs font-mono text-primary">
                  CF_final = min(CF_member, CF_kasus, CF_problem) × CF_rule
                </code>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-6 flex-wrap"
        >
          <Filter size={14} className="text-brand-400" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-secondary text-white"
                  : "bg-white/5 text-brand-300 hover:bg-white/10 hover:text-brand-100"
              }`}
            >
              {cat}
              {cat !== "Semua" && (
                <span className="ml-1.5 opacity-60">
                  ({KNOWLEDGE_BASE_RULES.filter((r) => r.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Rules grid */}
        <div className="space-y-3">
          {filtered.map((rule, i) => {
            const colors = categoryColors[rule.category] ?? {
              text: "text-brand-300",
              bg: "bg-white/5",
              border: "border-white/15",
            };
            const isExpanded = expanded === rule.id;

            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`panel border-l-2 ${colors.border} overflow-hidden`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : rule.id)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Rule ID badge */}
                      <div className={`px-2.5 py-1 rounded-lg ${colors.bg} flex-shrink-0`}>
                        <span className={`text-xs font-black font-mono ${colors.text}`}>
                          {rule.id}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                            {rule.category}
                          </span>
                          <span className="text-brand-500 text-xs">
                            CF Rule = {rule.cfRule}
                          </span>
                        </div>

                        {/* IF-THEN display */}
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <span className="text-brand-400 text-xs font-bold uppercase w-6 flex-shrink-0 mt-0.5">IF</span>
                            <span className="text-brand-200 text-sm">{rule.condition}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-primary text-xs font-bold uppercase w-6 flex-shrink-0 mt-0.5">THEN</span>
                            <span className="text-brand-50 text-sm font-medium">{rule.result}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`text-brand-400 flex-shrink-0 transition-transform duration-200 mt-1 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-5 pb-5 border-t border-white/5 pt-4 ${colors.bg}`}
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">
                          Formula CF
                        </p>
                        <code className="text-primary text-sm font-mono bg-white/5 px-3 py-1.5 rounded-lg block">
                          {rule.formula}
                        </code>
                      </div>
                      <div>
                        <p className="text-brand-400 text-xs uppercase tracking-wider mb-1">
                          Penjelasan
                        </p>
                        <p className="text-brand-200 text-sm leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CF Scale reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 panel p-6"
        >
          <h3 className="text-brand-50 font-bold text-base mb-5">Skala Nilai CF</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Sangat Yakin", val: 1.0, color: "bg-emerald-500" },
              { label: "Yakin", val: 0.8, color: "bg-emerald-400" },
              { label: "Cukup Yakin", val: 0.6, color: "bg-blue-400" },
              { label: "Kurang Yakin", val: 0.4, color: "bg-yellow-400" },
              { label: "Tidak Tahu", val: 0.2, color: "bg-gray-400" },
              { label: "Kurang Tidak Yakin", val: -0.4, color: "bg-orange-400" },
              { label: "Cukup Tidak Yakin", val: -0.6, color: "bg-orange-500" },
              { label: "Tidak Yakin", val: -0.8, color: "bg-red-400" },
              { label: "Sangat Tidak Yakin", val: -1.0, color: "bg-red-600" },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
                <span className="text-brand-200 text-sm flex-1">{label}</span>
                <span className="text-primary text-sm font-mono font-bold">{val > 0 ? "+" : ""}{val.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
