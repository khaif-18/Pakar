"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { FormData, ConfidenceLabel } from "@/lib/types";
import {
  User,
  Tag,
  Car,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { runExpertSystem } from "@/lib/expertSystem";
import ConfidenceSelector from "@/components/ConfidenceSelector";

const STEPS = [
  { id: 0, title: "Status Keanggotaan", icon: User, desc: "Data member & ID langganan" },
  { id: 1, title: "Tipe Kasus", icon: Tag, desc: "Jenis layanan yang dibutuhkan" },
  { id: 2, title: "Kondisi Kendaraan", icon: Car, desc: "Informasi kerusakan kendaraan" },
  { id: 3, title: "Konfirmasi & Submit", icon: CheckSquare, desc: "Review jawaban Anda" },
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

function RadioOption({
  value,
  selected,
  onChange,
  label,
  sublabel,
}: {
  value: boolean;
  selected: boolean | null;
  onChange: (v: boolean) => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex-1 p-4 rounded-xl border text-left transition-all duration-200 ${
        selected === value
          ? "border-secondary bg-secondary/20 text-brand-50"
          : "border-white/15 bg-white/5 text-brand-300 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
            selected === value
              ? "border-secondary bg-secondary"
              : "border-brand-400"
          }`}
        />
        <div>
          <p className="font-semibold text-sm">{label}</p>
          {sublabel && <p className="text-xs opacity-60 mt-0.5">{sublabel}</p>}
        </div>
      </div>
    </button>
  );
}

type StepProps = {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
};

/* ── Step 1: Member Status ─────────────────────────────────────── */
function Step1({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Member status */}
      <div className="space-y-4">
        <div>
          <h3 className="text-brand-50 font-semibold text-base mb-1">
            Apakah Anda terdaftar sebagai member?
          </h3>
          <p className="text-brand-300 text-sm">
            Member adalah pelanggan yang telah mendaftar resmi di bengkel kami.
          </p>
        </div>
        <div className="flex gap-3">
          <RadioOption
            value={true}
            selected={formData.memberStatus}
            onChange={(v) => setFormData({ memberStatus: v })}
            label="Ya, saya member"
            sublabel="Terdaftar di sistem"
          />
          <RadioOption
            value={false}
            selected={formData.memberStatus}
            onChange={(v) => setFormData({ memberStatus: v })}
            label="Tidak, saya non-member"
            sublabel="Belum terdaftar"
          />
        </div>
        <ConfidenceSelector
          value={formData.cfMember}
          onChange={(v) => setFormData({ cfMember: v })}
          label="Tingkat keyakinan terhadap jawaban di atas:"
        />
      </div>

      {/* Sub ID */}
      <div className="space-y-4">
        <div>
          <h3 className="text-brand-50 font-semibold text-base mb-1">
            Apakah Anda memiliki ID Langganan?
          </h3>
          <p className="text-brand-300 text-sm">
            ID Langganan adalah nomor unik yang diberikan saat pertama kali mendaftar.
          </p>
        </div>
        <div className="flex gap-3">
          <RadioOption
            value={true}
            selected={formData.hasSubId}
            onChange={(v) => setFormData({ hasSubId: v })}
            label="Ya, punya ID"
            sublabel="ID tersedia"
          />
          <RadioOption
            value={false}
            selected={formData.hasSubId}
            onChange={(v) => setFormData({ hasSubId: v })}
            label="Tidak punya"
            sublabel="ID tidak ada / lupa"
          />
        </div>
        <ConfidenceSelector
          value={formData.cfSubId}
          onChange={(v) => setFormData({ cfSubId: v })}
          label="Tingkat keyakinan terhadap jawaban di atas:"
        />
      </div>
    </div>
  );
}

/* ── Step 2: Case Type ─────────────────────────────────────────── */
const CASE_OPTIONS: { val: FormData["caseType"]; label: string; desc: string }[] = [
  {
    val: "Kasus Baru",
    label: "Kasus Baru",
    desc: "Masalah atau kerusakan yang pertama kali dilaporkan.",
  },
  {
    val: "Kasus Lanjutan",
    label: "Kasus Lanjutan",
    desc: "Follow-up dari kasus sebelumnya yang belum selesai.",
  },
  {
    val: "Informasi Lain",
    label: "Permintaan Informasi",
    desc: "Hanya ingin bertanya atau mendapatkan informasi.",
  },
];

function Step2({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-brand-50 font-semibold text-base mb-1">
            Apa tipe kasus yang Anda alami?
          </h3>
          <p className="text-brand-300 text-sm">
            Pilih yang paling sesuai dengan situasi kendaraan Anda saat ini.
          </p>
        </div>
        <div className="grid gap-3">
          {CASE_OPTIONS.map(({ val, label, desc }) => (
            <button
              key={val}
              type="button"
              onClick={() => setFormData({ caseType: val })}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                formData.caseType === val
                  ? "border-secondary bg-secondary/20"
                  : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                    formData.caseType === val
                      ? "border-secondary bg-secondary"
                      : "border-brand-400"
                  }`}
                />
                <div>
                  <p className="text-brand-50 font-semibold text-sm">{label}</p>
                  <p className="text-brand-300 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <ConfidenceSelector
          value={formData.cfCase}
          onChange={(v: ConfidenceLabel) => setFormData({ cfCase: v })}
          label="Tingkat keyakinan terhadap jawaban di atas:"
        />
      </div>
    </div>
  );
}

/* ── Step 3: Damage Assessment ─────────────────────────────────── */
function Step3({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-8">
      {/* Inside damage */}
      <div className="space-y-4">
        <div>
          <h3 className="text-brand-50 font-semibold text-base mb-1">
            Apakah ada kerusakan di dalam kendaraan?
          </h3>
          <p className="text-brand-300 text-sm">
            Kerusakan internal: mesin, transmisi, sistem kelistrikan, AC, dashboard, dll.
          </p>
        </div>
        <div className="flex gap-3">
          <RadioOption
            value={true}
            selected={formData.insideDamage}
            onChange={(v) => setFormData({ insideDamage: v })}
            label="Ya, ada kerusakan dalam"
            sublabel="Terdeteksi masalah internal"
          />
          <RadioOption
            value={false}
            selected={formData.insideDamage}
            onChange={(v) => setFormData({ insideDamage: v })}
            label="Tidak ada"
            sublabel="Bagian dalam baik-baik saja"
          />
        </div>
        <ConfidenceSelector
          value={formData.cfInside}
          onChange={(v: ConfidenceLabel) => setFormData({ cfInside: v })}
          label="Tingkat keyakinan:"
        />
      </div>

      {/* Outside damage */}
      <div className="space-y-4">
        <div>
          <h3 className="text-brand-50 font-semibold text-base mb-1">
            Apakah ada kerusakan di luar kendaraan?
          </h3>
          <p className="text-brand-300 text-sm">
            Kerusakan eksternal: bodi, cat, kaca, ban, bumper, lampu, dll.
          </p>
        </div>
        <div className="flex gap-3">
          <RadioOption
            value={true}
            selected={formData.outsideDamage}
            onChange={(v) => setFormData({ outsideDamage: v })}
            label="Ya, ada kerusakan luar"
            sublabel="Terdeteksi kerusakan eksterior"
          />
          <RadioOption
            value={false}
            selected={formData.outsideDamage}
            onChange={(v) => setFormData({ outsideDamage: v })}
            label="Tidak ada"
            sublabel="Eksterior dalam kondisi baik"
          />
        </div>
        <ConfidenceSelector
          value={formData.cfOutside}
          onChange={(v: ConfidenceLabel) => setFormData({ cfOutside: v })}
          label="Tingkat keyakinan:"
        />
      </div>
    </div>
  );
}

/* ── Step 4: Review ────────────────────────────────────────────── */
function Step4({ formData }: { formData: FormData }) {
  const rows = [
    { label: "Status Member", val: formData.memberStatus === null ? "—" : formData.memberStatus ? "Ya" : "Tidak", cf: formData.cfMember },
    { label: "ID Langganan", val: formData.hasSubId === null ? "—" : formData.hasSubId ? "Ya" : "Tidak", cf: formData.cfSubId },
    { label: "Tipe Kasus", val: formData.caseType ?? "—", cf: formData.cfCase },
    { label: "Kerusakan Dalam", val: formData.insideDamage === null ? "—" : formData.insideDamage ? "Ya" : "Tidak", cf: formData.cfInside },
    { label: "Kerusakan Luar", val: formData.outsideDamage === null ? "—" : formData.outsideDamage ? "Ya" : "Tidak", cf: formData.cfOutside },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-brand-50 font-semibold text-base mb-1">
          Review Jawaban Anda
        </h3>
        <p className="text-brand-300 text-sm">
          Pastikan semua jawaban sudah benar sebelum mengirimkan konsultasi.
        </p>
      </div>

      <div className="space-y-3">
        {rows.map(({ label, val, cf }) => (
          <div
            key={label}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div>
              <p className="text-brand-300 text-xs">{label}</p>
              <p className="text-brand-50 font-semibold text-sm mt-0.5">{val}</p>
            </div>
            <div className="text-right">
              <p className="text-brand-400 text-xs">Keyakinan</p>
              <p className="text-primary text-xs font-medium mt-0.5">{cf}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
        <p className="text-brand-200 text-sm">
          Dengan menekan <strong>Proses Konsultasi</strong>, sistem akan menghitung
          nilai Certainty Factor dan merekomendasikan level support yang sesuai.
        </p>
      </div>
    </div>
  );
}

/* ── Main Wizard ────────────────────────────────────────────────── */
export default function KonsultasiPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const { formData, setFormData, setResult, saveToHistory } = useStore();
  const router = useRouter();

  const isStepValid = () => {
    if (step === 0) return formData.memberStatus !== null && formData.hasSubId !== null;
    if (step === 1) return formData.caseType !== null;
    if (step === 2) return formData.insideDamage !== null && formData.outsideDamage !== null;
    return true;
  };

  const goNext = () => {
    if (!isStepValid()) return;
    if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = runExpertSystem(formData);
    setResult(result);
    saveToHistory(result, formData);
    router.push("/hasil");
  };

  const stepComponents = [
    <Step1 key="s1" formData={formData} setFormData={setFormData} />,
    <Step2 key="s2" formData={formData} setFormData={setFormData} />,
    <Step3 key="s3" formData={formData} setFormData={setFormData} />,
    <Step4 key="s4" formData={formData} />,
  ];

  return (
    <div className="min-h-screen bg-grid pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-black text-brand-50 mb-2">Konsultasi</h1>
          <p className="text-brand-200">
            Jawab 4 pertanyaan berikut untuk mendapatkan rekomendasi level support.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map(({ id, icon: Icon, title }) => (
            <div key={id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  step === id
                    ? "bg-secondary text-white"
                    : step > id
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-white/5 text-brand-400"
                }`}
              >
                <Icon size={16} />
                <span className="text-xs font-semibold hidden sm:inline">{title}</span>
              </div>
              {id < STEPS.length - 1 && (
                <div className={`w-6 h-px ${step > id ? "bg-emerald-500/50" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Card */}
        <div className="glass-card p-6 md:p-8 min-h-[400px] relative overflow-hidden">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Langkah {step + 1} dari {STEPS.length}</span>
            </div>
            <h2 className="text-xl font-bold text-brand-50">
              {STEPS[step].title}
            </h2>
            <p className="text-brand-300 text-sm">{STEPS[step].desc}</p>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {stepComponents[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-brand-300 hover:text-brand-50 hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
          >
            <ChevronLeft size={18} />
            Kembali
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              disabled={!isStepValid()}
              className="flex items-center gap-2 bg-secondary hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
            >
              Lanjut
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-secondary hover:bg-brand-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CheckSquare size={18} />
                  Proses Konsultasi
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
