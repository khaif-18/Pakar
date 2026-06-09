"use client";

import { useRef, useEffect, useState } from "react";
import { motion, type Variants, useInView, animate } from "framer-motion";
import Link from "next/link";
import {
  Brain, ShieldCheck, BarChart3, History,
  BookOpen, ArrowRight, Zap, Users,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";

/* ── Animation variants ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i: number = 0) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Data ───────────────────────────────────────────────────── */
const features = [
  {
    icon: Brain,
    title: "Certainty Factor Engine",
    desc: "Algoritma CF menghitung tingkat keyakinan dari setiap jawaban untuk rekomendasi yang presisi.",
    tag: "INFERENCE",
  },
  {
    icon: Zap,
    title: "Multi-step Wizard",
    desc: "Form konsultasi 4 langkah dengan validasi real-time, animasi transisi, dan indikator progres.",
    tag: "UX",
  },
  {
    icon: BarChart3,
    title: "Analytics Visualisasi",
    desc: "Gauge CF radial dan breakdown chart per faktor — lihat bagaimana sistem berpikir.",
    tag: "ANALYTICS",
  },
  {
    icon: History,
    title: "Riwayat Konsultasi",
    desc: "Histori tersimpan di browser. Cari, sort, bandingkan hasil, dan ekspor ke JSON.",
    tag: "DATA",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    desc: "13 rule IF-THEN tersaji secara visual dan transparan. Pahami logika di balik keputusan.",
    tag: "KNOWLEDGE",
  },
  {
    icon: ShieldCheck,
    title: "5 Level Support",
    desc: "Output berupa lima level rekomendasi yang jelas — dari Non-Member hingga High Support.",
    tag: "OUTPUT",
  },
];

const steps = [
  { num: "01", title: "Status Keanggotaan", desc: "Masukkan status member, ID langganan, dan tingkat keyakinan jawaban." },
  { num: "02", title: "Tipe Kasus", desc: "Tentukan apakah ini kasus baru, lanjutan, atau permintaan informasi." },
  { num: "03", title: "Kondisi Kendaraan", desc: "Laporkan ada tidaknya kerusakan di dalam dan luar kendaraan." },
  { num: "04", title: "Dapatkan Rekomendasi", desc: "Sistem menghitung CF dan merekomendasikan level support yang paling sesuai." },
];

const supportLevels = [
  { level: "Level High Support",    priority: "P1", color: "#ef4444", desc: "Prioritas tertinggi — teknisi senior, penanganan segera" },
  { level: "Level Medium Support",  priority: "P2", color: "#f97316", desc: "Layanan premium untuk member dengan kasus baru" },
  { level: "Level Standard Support",priority: "P3", color: "#5b8ab1", desc: "Penanganan rutin untuk kasus lanjutan member" },
  { level: "Information Other",     priority: "P4", color: "#a855f7", desc: "Permintaan informasi & bantuan umum" },
  { level: "Non Member Support",    priority: "P5", color: "#6b7280", desc: "Layanan dasar untuk pelanggan non-member" },
];

const team = [
  { name: "M. Khalifah Erian",           role: "Lead Developer & PM" },
  { name: "Jerrel Adriel A. H.",          role: "Expert Frontend Developer" },
  { name: "M. Noufal Rifqi Iman",         role: "Knowledge Engineer" },
  { name: "Iqbal Fanosa Wiotama",         role: "UI/UX Designer" },
  { name: "Pahriza Andresta",             role: "System Architect" },
];

/* ── Counter component ─────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Main ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-grid">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-4 overflow-hidden">

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — copy */}
            <motion.div initial="hidden" animate="visible" className="space-y-8 min-w-0">

              <motion.div variants={fadeUp} custom={0}>
                <span className="overline flex items-center gap-2">
                  <span className="w-6 h-px bg-accent inline-block" />
                  SISTEM PAKAR OTOMOTIF
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="display-heading text-[clamp(2.8rem,5vw,4.5rem)] text-brand-50 leading-none"
              >
                TEMUKAN<br />
                LEVEL{" "}
                <span className="text-gradient">SUPPORT</span>
                <br />
                KENDARAANMU
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-brand-300 text-lg leading-relaxed max-w-lg"
              >
                E-Bengkel menggunakan metode{" "}
                <span className="text-brand-100 font-semibold">Certainty Factor</span>{" "}
                untuk menganalisis kondisi kendaraan dan kebutuhan Anda, lalu memberikan
                rekomendasi level layanan bengkel yang paling tepat.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Link href="/konsultasi" className="btn-amber">
                  Mulai Konsultasi
                  <ArrowRight size={16} />
                </Link>
                <Link href="/knowledge-base" className="btn-outline">
                  <BookOpen size={16} />
                  Knowledge Base
                </Link>
              </motion.div>

              {/* Inline stats */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex gap-8 pt-4 border-t border-brand-200/8"
              >
                {[
                  { n: 13, label: "Rules" },
                  { n: 5, label: "Level Support" },
                  { n: 9, label: "Skala CF" },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <p
                      className="cf-value text-3xl amber-glow"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      <Counter target={n} />
                    </p>
                    <p className="text-brand-400 text-xs mt-0.5 tracking-wide uppercase"
                       style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.15em" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — visual panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block min-w-0"
            >
              <div className="relative">
                {/* Big CF display */}
                <div className="panel p-8 border-t-2 border-accent/60">
                  <p
                    className="overline mb-6"
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#f59e0b" }}
                  >
                    FORMULA INFERENSI
                  </p>
                  <div
                    className="text-brand-100 space-y-2"
                    style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", lineHeight: "1.8" }}
                  >
                    <p><span className="text-accent">CF_member</span> = min(CF_m, CF_id) × CF_r</p>
                    <p><span className="text-accent">CF_kasus</span> = |CF_input|</p>
                    <p><span className="text-accent">CF_problem</span> = min(CF_in, CF_out) × CF_r</p>
                    <div className="border-t border-brand-200/10 my-4" />
                    <p className="text-brand-50">
                      <span className="text-accent font-bold">CF_final</span> =
                      min(<span className="text-secondary">CF_m</span>,{" "}
                      <span className="text-secondary">CF_k</span>,{" "}
                      <span className="text-secondary">CF_p</span>) × CF_rule
                    </p>
                  </div>

                  {/* Rule list preview */}
                  <div className="mt-6 space-y-2">
                    {["R8 — Non Member Support", "R10 — High Support", "R11 — Medium Support"].map((r) => (
                      <div key={r} className="flex items-center gap-2 text-xs text-brand-400"
                           style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        <span className="w-1 h-1 rounded-full bg-secondary/60 flex-shrink-0" />
                        {r}
                      </div>
                    ))}
                    <p className="text-xs text-brand-500 pl-3"
                       style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      + 10 more rules...
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute top-4 right-4 rule-tag text-xs px-3 py-1.5">
                  13 RULES ACTIVE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-stripe">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="overline mb-3">FITUR UNGGULAN</p>
              <h2 className="display-heading text-5xl text-brand-50">
                DIBANGUN UNTUK<br />PRESISI
              </h2>
            </div>
            <p className="text-brand-300 max-w-xs text-sm leading-relaxed">
              Teknologi modern untuk pengalaman konsultasi yang mulus, informatif, dan dapat diandalkan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc, tag }, i) => (
              <TiltCard key={title} className="rounded-xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="accent-card p-6 h-full group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded border border-brand-200/10 bg-brand-800/60 flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span
                      className="rule-tag"
                      style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem" }}
                    >
                      {tag}
                    </span>
                  </div>
                  <h3
                    className="text-brand-50 text-lg mb-2 font-display"
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700 }}
                  >
                    {title}
                  </h3>
                  <p className="text-brand-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="overline mb-3">CARA KERJA</p>
            <h2 className="display-heading text-5xl text-brand-50">
              4 LANGKAH<br />MENUJU REKOMENDASI
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-200/10 to-transparent" />

            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                variants={slideIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="glass-card p-6 relative overflow-hidden"
              >
                {/* Big background number */}
                <span
                  className="absolute -top-4 -left-2 text-8xl font-black select-none pointer-events-none"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    color: "rgba(245, 158, 11, 0.06)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
                <div className="relative">
                  <span
                    className="cf-value text-sm mb-3 block"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {num}
                  </span>
                  <h3
                    className="text-brand-50 text-base mb-2"
                    style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, letterSpacing: "0.01em" }}
                  >
                    {title}
                  </h3>
                  <p className="text-brand-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT LEVELS ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-brand-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="overline mb-3">OUTPUT SISTEM</p>
              <h2 className="display-heading text-5xl text-brand-50 mb-6">
                5 LEVEL<br />REKOMENDASI
              </h2>
              <p className="text-brand-300 text-sm leading-relaxed max-w-sm">
                Berdasarkan analisis CF dari ketiga faktor input, sistem menetapkan
                satu dari lima level support dengan formula inferensi yang transparan.
              </p>
              <div className="mt-8">
                <Link href="/konsultasi" className="btn-amber">
                  Coba Konsultasi
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <div className="space-y-3">
              {supportLevels.map(({ level, priority, color, desc }, i) => (
                <motion.div
                  key={level}
                  variants={slideIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="glass-card px-5 py-4 flex items-center gap-4 group hover:border-brand-200/15 transition-all"
                >
                  <span
                    className="text-xs font-bold tabular-nums flex-shrink-0 w-7 text-right"
                    style={{ fontFamily: "JetBrains Mono, monospace", color }}
                  >
                    {priority}
                  </span>
                  <div className="w-px h-8 flex-shrink-0" style={{ background: color, opacity: 0.4 }} />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold text-brand-50"
                      style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
                    >
                      {level}
                    </p>
                    <p className="text-brand-400 text-xs mt-0.5 truncate">{desc}</p>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="overline mb-3">TIM PENGEMBANG</p>
            <h2 className="display-heading text-5xl text-brand-50">
              DIBANGUN OLEH<br />ORANG-ORANG TERBAIK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {team.map(({ name, role }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="panel p-5"
              >
                <div className="w-8 h-8 rounded border border-secondary/30 bg-secondary/10 flex items-center justify-center mb-4">
                  <Users size={15} className="text-secondary" />
                </div>
                <p
                  className="text-brand-50 text-sm font-semibold leading-tight"
                  style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, letterSpacing: "0.01em" }}
                >
                  {name}
                </p>
                <p className="text-brand-500 text-xs mt-1.5"
                   style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                  {role.toUpperCase()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden panel border-t-2 border-accent/50 p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            <div className="relative">
              <p className="overline mb-6 justify-center flex items-center gap-2">
                <span className="w-8 h-px bg-accent inline-block" />
                SIAP KONSULTASI?
                <span className="w-8 h-px bg-accent inline-block" />
              </p>
              <h2 className="display-heading text-5xl md:text-7xl text-brand-50 mb-6">
                DAPATKAN REKOMENDASI<br />
                <span className="text-gradient">YANG AKURAT</span>
              </h2>
              <p className="text-brand-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Jawab 4 pertanyaan sederhana. Sistem akan menghitung Certainty Factor
                dan merekomendasikan level support yang paling tepat untuk Anda.
              </p>
              <Link href="/konsultasi" className="btn-amber text-base px-10 py-4">
                Mulai Konsultasi Sekarang
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
