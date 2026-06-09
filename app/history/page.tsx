"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  History,
  Trash2,
  RotateCcw,
  Download,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Info,
  ShieldOff,
  ChevronDown,
  Search,
  BarChart3,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatCF, formatDate } from "@/lib/utils";
import type { SupportLevel } from "@/lib/types";

const levelColors: Record<SupportLevel, { text: string; bg: string; dot: string; gauge: string }> = {
  "Level High Support": { text: "text-red-400", bg: "bg-red-500/10", dot: "bg-red-500", gauge: "#ef4444" },
  "Level Medium Support": { text: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-500", gauge: "#f97316" },
  "Level Standard Support": { text: "text-blue-400", bg: "bg-blue-500/10", dot: "bg-blue-500", gauge: "#3b82f6" },
  "Information Other": { text: "text-purple-400", bg: "bg-purple-500/10", dot: "bg-purple-500", gauge: "#a855f7" },
  "Non Member Support": { text: "text-gray-400", bg: "bg-gray-500/10", dot: "bg-gray-500", gauge: "#6b7280" },
};

const levelIcons: Record<SupportLevel, React.ElementType> = {
  "Level High Support": AlertTriangle,
  "Level Medium Support": Shield,
  "Level Standard Support": CheckCircle2,
  "Information Other": Info,
  "Non Member Support": ShieldOff,
};

export default function HistoryPage() {
  const { history, deleteHistoryItem, clearHistory } = useStore();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const filtered = history
    .filter(
      (h) =>
        h.recommendation.toLowerCase().includes(search.toLowerCase()) ||
        h.ruleApplied.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const diff = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      return sortDir === "desc" ? diff : -diff;
    });

  const handleExport = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ebengkel-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: history.length,
    highSupport: history.filter((h) => h.recommendation === "Level High Support").length,
    avgCF: history.length
      ? history.reduce((s, h) => s + h.cfFinal, 0) / history.length
      : 0,
    members: history.filter((h) => h.memberStatusResult).length,
  };

  return (
    <div className="min-h-screen bg-grid pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="overline mb-1">RIWAYAT SISTEM</p>
              <h1
                className="display-heading text-4xl text-brand-50"
                style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900 }}
              >
                HISTORY KONSULTASI
              </h1>
              <p
                className="text-brand-500 text-xs mt-1"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}
              >
                {history.length} SESSION TERSIMPAN
              </p>
            </div>

            <div className="flex gap-2">
              {history.length > 0 && (
                <>
                  <button onClick={handleExport} className="btn-ghost">
                    <Download size={15} />
                    Export
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
                    style={{ borderRadius: "0.375rem" }}
                  >
                    <Trash2 size={15} />
                    Hapus Semua
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            {[
              { icon: BarChart3, label: "TOTAL", val: stats.total, color: "text-accent" },
              { icon: AlertTriangle, label: "HIGH PRIORITY", val: stats.highSupport, color: "text-red-400" },
              { icon: CheckCircle2, label: "AVG CF", val: formatCF(stats.avgCF), color: "text-emerald-400" },
              { icon: Shield, label: "MEMBER", val: stats.members, color: "text-blue-400" },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="panel p-4 flex items-center gap-3">
                <Icon size={16} className={`${color} flex-shrink-0`} />
                <div>
                  <p
                    className={`text-xl font-black ${color}`}
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {val}
                  </p>
                  <p
                    className="text-brand-500 text-xs mt-0.5"
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.12em" }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Controls */}
        {history.length > 0 && (
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-500" />
              <input
                type="text"
                placeholder="Cari rekomendasi atau rule..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field w-full pl-9 pr-4 py-2.5 text-sm"
              />
            </div>
            <button
              onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              className="btn-ghost"
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${sortDir === "asc" ? "rotate-180" : ""}`}
              />
              Terbaru
            </button>
          </div>
        )}

        {/* Clear confirmation */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="panel p-5 mb-5 border-l-2 border-red-500/50"
            >
              <p
                className="text-brand-50 mb-1"
                style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.02em" }}
              >
                HAPUS SEMUA {history.length} RIWAYAT?
              </p>
              <p className="text-brand-400 text-sm mb-4">
                Tindakan ini tidak dapat dibatalkan. Pastikan Anda sudah export data jika diperlukan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { clearHistory(); setShowClearConfirm(false); }}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
                  style={{ borderRadius: "0.375rem" }}
                >
                  <Trash2 size={14} />
                  Ya, Hapus Semua
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="btn-ghost"
                >
                  Batal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History list */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <History size={40} className="text-brand-600 mx-auto mb-4" />
            <p
              className="text-brand-300 mb-1"
              style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.05em" }}
            >
              {history.length === 0 ? "BELUM ADA RIWAYAT" : "TIDAK DITEMUKAN"}
            </p>
            <p className="text-brand-500 text-sm mb-6">
              {history.length === 0
                ? "Mulai konsultasi pertama Anda untuk melihat riwayat di sini."
                : "Coba kata kunci pencarian yang berbeda."}
            </p>
            {history.length === 0 && (
              <Link href="/konsultasi" className="btn-amber inline-flex">
                <RotateCcw size={15} />
                Mulai Konsultasi
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((item, i) => {
                const colors = levelColors[item.recommendation];
                const LevelIcon = levelIcons[item.recommendation];
                const isExpanded = expanded === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.04 }}
                    className="panel overflow-hidden"
                    style={{ borderLeft: `2px solid ${colors.gauge}30` }}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <button
                          onClick={() => setExpanded(isExpanded ? null : item.id)}
                          className="flex items-start gap-3 flex-1 text-left"
                        >
                          <div
                            className={`w-9 h-9 flex items-center justify-center flex-shrink-0 ${colors.bg}`}
                            style={{ borderRadius: "0.375rem" }}
                          >
                            <LevelIcon size={16} className={colors.text} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-sm font-bold ${colors.text}`}
                                style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, letterSpacing: "0.03em" }}
                              >
                                {item.recommendation.toUpperCase()}
                              </span>
                              <span className="rule-tag">{item.ruleApplied}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span
                                className="text-brand-500 text-xs"
                                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem" }}
                              >
                                {formatDate(item.timestamp)}
                              </span>
                              <span
                                className="cf-value text-xs"
                                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}
                              >
                                CF {formatCF(item.cfFinal)}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            size={15}
                            className={`text-brand-500 flex-shrink-0 transition-transform duration-200 mt-1 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="p-2 text-brand-600 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                          style={{ borderRadius: "0.375rem" }}
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-brand-200/8 px-5 pb-5 pt-4 bg-brand-900/40"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                            {[
                              {
                                label: "STATUS MEMBER",
                                val: item.memberStatusResult ? "TERVERIFIKASI" : "TIDAK VALID",
                                color: item.memberStatusResult ? "text-emerald-400" : "text-red-400",
                              },
                              {
                                label: "TINGKAT RISIKO",
                                val: item.severityResult,
                                color: item.severityResult === "High Risk" ? "text-red-400" : "text-emerald-400",
                              },
                              {
                                label: "TIPE KASUS",
                                val: item.formSnapshot?.caseType ?? "—",
                                color: "text-brand-200",
                              },
                            ].map(({ label, val, color }) => (
                              <div key={label}>
                                <p
                                  className="text-brand-600 mb-1"
                                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.55rem", letterSpacing: "0.15em" }}
                                >
                                  {label}
                                </p>
                                <p
                                  className={`text-xs font-bold ${color}`}
                                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem" }}
                                >
                                  {val}
                                </p>
                              </div>
                            ))}
                          </div>

                          <p className="overline mb-3" style={{ fontSize: "0.55rem" }}>CF BREAKDOWN</p>
                          <div className="space-y-2.5">
                            {[item.cfMemberFactor, item.cfCaseFactor, item.cfProblemFactor].map((f) => (
                              <div key={f.rule} className="flex items-center gap-3">
                                <span className="rule-tag w-10 text-center flex-shrink-0">{f.rule}</span>
                                <div className="flex-1 h-px bg-brand-200/10 overflow-hidden">
                                  <div
                                    className="h-full bg-accent"
                                    style={{ width: `${Math.max(0, f.cf) * 100}%` }}
                                  />
                                </div>
                                <span
                                  className="cf-value text-xs w-12 text-right flex-shrink-0"
                                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}
                                >
                                  {formatCF(f.cf)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
