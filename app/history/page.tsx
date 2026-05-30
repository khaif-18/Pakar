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
  ChevronUp,
  Search,
  BarChart3,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatCF, formatDate } from "@/lib/utils";
import type { SupportLevel } from "@/lib/types";

const levelColors: Record<SupportLevel, { text: string; bg: string; dot: string }> = {
  "Level High Support": { text: "text-red-400", bg: "bg-red-500/10", dot: "bg-red-500" },
  "Level Medium Support": { text: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-500" },
  "Level Standard Support": { text: "text-blue-400", bg: "bg-blue-500/10", dot: "bg-blue-500" },
  "Information Other": { text: "text-purple-400", bg: "bg-purple-500/10", dot: "bg-purple-500" },
  "Non Member Support": { text: "text-gray-400", bg: "bg-gray-500/10", dot: "bg-gray-500" },
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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <History size={22} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-brand-50">Riwayat Konsultasi</h1>
                <p className="text-brand-300 text-sm">{history.length} konsultasi tersimpan</p>
              </div>
            </div>

            <div className="flex gap-2">
              {history.length > 0 && (
                <>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-brand-300 hover:text-brand-50 hover:bg-white/5 transition-all text-sm font-medium"
                  >
                    <Download size={15} />
                    Export
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
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
              { icon: BarChart3, label: "Total", val: stats.total, color: "text-primary" },
              { icon: AlertTriangle, label: "High Priority", val: stats.highSupport, color: "text-red-400" },
              { icon: CheckCircle2, label: "Avg CF", val: formatCF(stats.avgCF), color: "text-emerald-400" },
              { icon: Shield, label: "Member", val: stats.members, color: "text-blue-400" },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="glass-card p-4 flex items-center gap-3">
                <Icon size={18} className={color} />
                <div>
                  <p className={`text-xl font-black ${color}`}>{val}</p>
                  <p className="text-brand-400 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Controls */}
        {history.length > 0 && (
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-400" />
              <input
                type="text"
                placeholder="Cari rekomendasi atau rule..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-brand-200 placeholder:text-brand-500 text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all"
              />
            </div>
            <button
              onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-brand-300 hover:bg-white/5 transition-all text-sm"
            >
              {sortDir === "desc" ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
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
              className="glass-card p-5 mb-5 border border-red-500/30 bg-red-500/5"
            >
              <p className="text-brand-50 font-semibold mb-3">
                Hapus semua {history.length} riwayat konsultasi?
              </p>
              <p className="text-brand-300 text-sm mb-4">
                Tindakan ini tidak dapat dibatalkan. Pastikan Anda sudah export data jika diperlukan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    clearHistory();
                    setShowClearConfirm(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
                >
                  Ya, Hapus Semua
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-5 py-2 rounded-xl border border-white/15 text-brand-200 hover:bg-white/5 text-sm transition-all"
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
            <History size={48} className="text-brand-600 mx-auto mb-4" />
            <h3 className="text-brand-300 font-semibold text-lg mb-2">
              {history.length === 0 ? "Belum ada riwayat" : "Tidak ditemukan"}
            </h3>
            <p className="text-brand-500 text-sm mb-6">
              {history.length === 0
                ? "Mulai konsultasi pertama Anda untuk melihat riwayat di sini."
                : "Coba kata kunci pencarian yang berbeda."}
            </p>
            {history.length === 0 && (
              <Link
                href="/konsultasi"
                className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-500 transition-all"
              >
                <RotateCcw size={16} />
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
                    className="glass-card overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <button
                          onClick={() => setExpanded(isExpanded ? null : item.id)}
                          className="flex items-start gap-3 flex-1 text-left"
                        >
                          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                            <LevelIcon size={18} className={colors.text} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-bold ${colors.text}`}>
                                {item.recommendation}
                              </span>
                              <span className="text-brand-500 text-xs font-mono">
                                {item.ruleApplied}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-brand-300 text-xs">
                                {formatDate(item.timestamp)}
                              </span>
                              <span className="text-primary text-xs font-bold">
                                CF: {formatCF(item.cfFinal)}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`text-brand-400 flex-shrink-0 transition-transform duration-200 mt-1 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="p-2 rounded-lg text-brand-500 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                          title="Hapus"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/5 px-5 pb-5 pt-4 bg-white/2"
                        >
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-brand-400 text-xs">Status Member</p>
                              <p className={`text-sm font-semibold mt-0.5 ${item.memberStatusResult ? "text-emerald-400" : "text-red-400"}`}>
                                {item.memberStatusResult ? "Terverifikasi" : "Tidak Valid"}
                              </p>
                            </div>
                            <div>
                              <p className="text-brand-400 text-xs">Tingkat Risiko</p>
                              <p className={`text-sm font-semibold mt-0.5 ${item.severityResult === "High Risk" ? "text-red-400" : "text-emerald-400"}`}>
                                {item.severityResult}
                              </p>
                            </div>
                            <div>
                              <p className="text-brand-400 text-xs">Tipe Kasus</p>
                              <p className="text-brand-200 text-sm font-semibold mt-0.5">
                                {item.formSnapshot?.caseType ?? "—"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {[item.cfMemberFactor, item.cfCaseFactor, item.cfProblemFactor].map((f) => (
                              <div key={f.rule} className="flex items-center gap-3">
                                <span className="text-brand-500 text-xs font-mono w-8">{f.rule}</span>
                                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-secondary rounded-full"
                                    style={{ width: `${Math.max(0, f.cf) * 100}%` }}
                                  />
                                </div>
                                <span className="text-primary text-xs font-bold w-12 text-right">
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
