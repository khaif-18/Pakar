"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  Brain,
  ShieldCheck,
  BarChart3,
  History,
  BookOpen,
  ArrowRight,
  Zap,
  Users,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";
import MagneticWrapper from "@/components/MagneticWrapper";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const features = [
  {
    icon: Brain,
    title: "Certainty Factor Engine",
    desc: "Algoritma CF yang menghitung tingkat keyakinan dari setiap jawaban Anda untuk memberikan rekomendasi yang akurat.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "Multi-step Wizard",
    desc: "Form konsultasi 4 langkah yang intuitif dengan validasi real-time dan indikator progres yang jelas.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics & Visualisasi",
    desc: "Gauge CF dan breakdown per faktor dalam bentuk chart interaktif untuk memahami hasil rekomendasi.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: History,
    title: "Riwayat Konsultasi",
    desc: "Simpan dan kelola riwayat semua konsultasi. Bandingkan hasil dan ekspor data kapan saja.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    desc: "Lihat seluruh basis pengetahuan sistem — semua rule IF-THEN ditampilkan secara transparan dan visual.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: ShieldCheck,
    title: "5 Level Support",
    desc: "Output berupa 5 tingkat rekomendasi support yang jelas mulai dari Non-Member hingga High Support.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
];

const steps = [
  {
    num: "01",
    title: "Isi Data Keanggotaan",
    desc: "Masukkan status member dan ID langganan Anda, serta tingkat keyakinan terhadap jawaban.",
  },
  {
    num: "02",
    title: "Tentukan Tipe Kasus",
    desc: "Pilih apakah ini kasus baru, lanjutan, atau hanya permintaan informasi.",
  },
  {
    num: "03",
    title: "Laporkan Kondisi Kendaraan",
    desc: "Informasikan ada tidaknya kerusakan di dalam maupun luar kendaraan.",
  },
  {
    num: "04",
    title: "Dapatkan Rekomendasi",
    desc: "Sistem pakar menghitung CF dan memberikan rekomendasi level support yang paling sesuai.",
  },
];

const supportLevels = [
  { level: "High Support", color: "bg-red-500", desc: "Prioritas tertinggi, teknisi senior" },
  { level: "Medium Support", color: "bg-orange-500", desc: "Layanan premium member" },
  { level: "Standard Support", color: "bg-blue-500", desc: "Penanganan standar member" },
  { level: "Information Other", color: "bg-purple-500", desc: "Permintaan informasi umum" },
  { level: "Non Member Support", color: "bg-gray-500", desc: "Layanan dasar non-member" },
];

const team = [
  { name: "M. Khalifah Erian", role: "Lead Developer & PM" },
  { name: "Jerrel Adriel A. H.", role: "Expert Frontend Developer" },
  { name: "M. Noufal Rifqi Iman", role: "Knowledge Engineer" },
  { name: "Iqbal Fanosa Wiotama", role: "UI/UX Designer" },
  { name: "Pahriza Andresta", role: "System Architect" },
];

export default function Home() {
  return (
    <div className="bg-grid min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
                <Wrench size={14} />
                Sistem Pakar Otomotif
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl font-black leading-tight mb-6"
            >
              Temukan Level{" "}
              <span className="text-gradient">Support Tepat</span>
              <br />
              Untuk Kendaraanmu
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-brand-200 text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              E-Bengkel menggunakan metode{" "}
              <strong className="text-primary">Certainty Factor</strong> untuk
              menganalisis kondisi kendaraan dan kebutuhan Anda, lalu
              merekomendasikan tingkat layanan bengkel yang paling sesuai.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticWrapper>
                <Link
                  href="/konsultasi"
                  className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-secondary/30 group"
                >
                  Mulai Konsultasi Sekarang
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </MagneticWrapper>
              <MagneticWrapper>
                <Link
                  href="/knowledge-base"
                  className="inline-flex items-center justify-center gap-2 border border-primary/30 text-primary hover:bg-primary/10 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200"
                >
                  <BookOpen size={20} />
                  Lihat Knowledge Base
                </Link>
              </MagneticWrapper>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { val: "13", label: "Rule Pengetahuan" },
              { val: "5", label: "Level Support" },
              { val: "9", label: "Skala Keyakinan" },
              { val: "CF", label: "Metode Inferensi" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="glass-card p-4 text-center rounded-xl"
              >
                <p className="text-3xl font-black text-primary">{val}</p>
                <p className="text-brand-300 text-xs mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-brand-50 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-brand-200 text-lg max-w-xl mx-auto">
              Dibangun dengan teknologi modern untuk pengalaman konsultasi yang
              mulus dan informatif.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <TiltCard key={title} className="relative rounded-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-6 hover:bg-white/10 transition-colors duration-300 group h-full"
                >
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={22} className={color} />
                  </div>
                  <h3 className="text-brand-50 font-bold text-lg mb-2">{title}</h3>
                  <p className="text-brand-300 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-brand-700/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-brand-50 mb-4">
              Cara Kerja
            </h2>
            <p className="text-brand-200 text-lg">
              4 langkah sederhana untuk mendapatkan rekomendasi yang akurat.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-secondary/50 to-transparent z-10" />
                )}
                <div className="glass-card p-6 relative z-20">
                  <div className="text-5xl font-black text-secondary/60 mb-4 select-none">
                    {num}
                  </div>
                  <h3 className="text-brand-50 font-bold text-base mb-2">{title}</h3>
                  <p className="text-brand-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Levels */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-brand-50 mb-4">
              5 Level Rekomendasi
            </h2>
            <p className="text-brand-200 text-lg">
              Sistem akan menentukan satu dari lima level support berikut.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            {supportLevels.map(({ level, color, desc }, i) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card px-5 py-4 flex items-center gap-4"
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
                <div className="flex-1">
                  <p className="text-brand-50 font-semibold text-sm">{level}</p>
                  <p className="text-brand-300 text-xs">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-brand-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-brand-700/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-brand-50 mb-4">
              Tim Pengembang
            </h2>
            <p className="text-brand-200 text-lg">
              Dibangun oleh mahasiswa berprestasi yang berdedikasi.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {team.map(({ name, role }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card px-6 py-5 flex items-center gap-4 min-w-[260px]"
              >
                <div className="w-11 h-11 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-brand-50 font-semibold text-sm leading-tight">{name}</p>
                  <p className="text-brand-300 text-xs mt-0.5">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl" />
              <div className="relative">
                <CheckCircle2 size={48} className="text-primary mx-auto mb-6" />
                <h2 className="text-4xl font-black text-brand-50 mb-4">
                  Siap Konsultasi?
                </h2>
                <p className="text-brand-200 text-lg mb-8">
                  Hanya 4 langkah untuk mendapatkan rekomendasi level support
                  yang tepat untuk kendaraan Anda. Gratis dan akurat.
                </p>
                <Link
                  href="/konsultasi"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-brand-500 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-secondary/30 group"
                >
                  Mulai Sekarang
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
