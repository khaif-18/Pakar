import type {
  ConfidenceLabel,
  CaseType,
  FormData,
  ConsultationResult,
  SupportLevel,
  FactorResult,
} from "./types";

export const CF_MAP: Record<ConfidenceLabel, number> = {
  "Sangat Yakin": 1.0,
  "Yakin": 0.8,
  "Cukup Yakin": 0.6,
  "Kurang Yakin": 0.4,
  "Tidak Tahu": 0.2,
  "Kurang Tidak Yakin": -0.4,
  "Cukup Tidak Yakin": -0.6,
  "Tidak Yakin": -0.8,
  "Sangat Tidak Yakin": -1.0,
};

export const CONFIDENCE_LABELS: ConfidenceLabel[] = [
  "Sangat Yakin",
  "Yakin",
  "Cukup Yakin",
  "Kurang Yakin",
  "Tidak Tahu",
  "Kurang Tidak Yakin",
  "Cukup Tidak Yakin",
  "Tidak Yakin",
  "Sangat Tidak Yakin",
];

export const SUPPORT_LEVEL_META: Record<
  SupportLevel,
  { color: string; badge: string; priority: number }
> = {
  "Level High Support": {
    color: "red",
    badge: "PRIORITAS TINGGI",
    priority: 1,
  },
  "Level Medium Support": {
    color: "orange",
    badge: "PRIORITAS SEDANG",
    priority: 2,
  },
  "Level Standard Support": {
    color: "blue",
    badge: "STANDAR",
    priority: 3,
  },
  "Information Other": {
    color: "purple",
    badge: "INFORMASI",
    priority: 4,
  },
  "Non Member Support": {
    color: "gray",
    badge: "NON-MEMBER",
    priority: 5,
  },
};

function computeMemberFactor(
  memberStatus: boolean,
  hasSubId: boolean,
  cfMember: number,
  cfSubId: number
): FactorResult {
  if (memberStatus && hasSubId) {
    const cf = Math.min(cfMember, cfSubId) * 0.8;
    return {
      label: "Status Member Terverifikasi",
      cf,
      rule: "R1",
      explanation: `Member aktif dengan ID Langganan valid. CF = min(${cfMember.toFixed(2)}, ${cfSubId.toFixed(2)}) × 0.8 = ${cf.toFixed(3)}`,
    };
  }
  if (memberStatus && !hasSubId) {
    const cf = Math.min(cfMember, cfSubId) * 0.7;
    return {
      label: "Member Tanpa ID Langganan",
      cf,
      rule: "R2",
      explanation: `Member aktif namun ID Langganan tidak ditemukan. CF = min(${cfMember.toFixed(2)}, ${cfSubId.toFixed(2)}) × 0.7 = ${cf.toFixed(3)}`,
    };
  }
  const cf = cfMember * 0.65;
  return {
    label: "Non-Member",
    cf,
    rule: "R3",
    explanation: `Pelanggan tidak terdaftar sebagai member. CF = ${cfMember.toFixed(2)} × 0.65 = ${cf.toFixed(3)}`,
  };
}

function computeProblemFactor(
  insideDamage: boolean,
  outsideDamage: boolean,
  cfInside: number,
  cfOutside: number
): FactorResult & { severity: string } {
  if (insideDamage) {
    const cf = Math.min(cfInside, cfOutside) * 0.9;
    return {
      label: "Kerusakan Internal Terdeteksi",
      cf,
      rule: "R4",
      severity: "High Risk",
      explanation: `Kerusakan di dalam kendaraan terdeteksi — risiko tinggi. CF = min(${cfInside.toFixed(2)}, ${cfOutside.toFixed(2)}) × 0.9 = ${cf.toFixed(3)}`,
    };
  }
  if (!insideDamage && outsideDamage) {
    const cf = Math.min(cfInside, cfOutside) * 0.8;
    return {
      label: "Kerusakan Eksternal Saja",
      cf,
      rule: "R5",
      severity: "High Risk",
      explanation: `Hanya kerusakan luar yang ditemukan. CF = min(${cfInside.toFixed(2)}, ${cfOutside.toFixed(2)}) × 0.8 = ${cf.toFixed(3)}`,
    };
  }
  const cf = Math.min(cfInside, cfOutside) * 0.6;
  return {
    label: "Tidak Ada Kerusakan Signifikan",
    cf,
    rule: "R6",
    severity: "No Risk",
    explanation: `Tidak ada kerusakan terdeteksi. CF = min(${cfInside.toFixed(2)}, ${cfOutside.toFixed(2)}) × 0.6 = ${cf.toFixed(3)}`,
  };
}

function computeCaseFactor(
  caseType: CaseType,
  cfCase: number
): FactorResult {
  const absVal = Math.abs(cfCase);
  const labels: Record<CaseType, string> = {
    "Kasus Baru": "Kasus Baru",
    "Kasus Lanjutan": "Kasus Lanjutan / Follow-up",
    "Informasi Lain": "Permintaan Informasi",
  };
  return {
    label: labels[caseType],
    cf: absVal,
    rule: "R7",
    explanation: `Tipe kasus: ${caseType}. CF = |${cfCase.toFixed(2)}| = ${absVal.toFixed(3)}`,
  };
}

export function runExpertSystem(form: FormData): ConsultationResult {
  const cfMemberVal = CF_MAP[form.cfMember];
  const cfSubIdVal = CF_MAP[form.cfSubId];
  const cfCaseVal = CF_MAP[form.cfCase];
  const cfInsideVal = CF_MAP[form.cfInside];
  const cfOutsideVal = CF_MAP[form.cfOutside];

  const memberFactor = computeMemberFactor(
    form.memberStatus!,
    form.hasSubId!,
    cfMemberVal,
    cfSubIdVal
  );

  const caseFactor = computeCaseFactor(form.caseType!, cfCaseVal);

  const problemFactorRaw = computeProblemFactor(
    form.insideDamage!,
    form.outsideDamage!,
    cfInsideVal,
    cfOutsideVal
  );
  const { severity, ...problemFactor } = problemFactorRaw;

  const memberOK = form.memberStatus! && form.hasSubId!;

  let recommendation: SupportLevel;
  let ruleApplied: string;
  let description: string;
  let cfRule: number;

  if (!memberOK) {
    recommendation = "Non Member Support";
    ruleApplied = "R8";
    cfRule = 0.6;
    description =
      "Layanan dasar untuk pelanggan yang belum terdaftar sebagai member aktif. Daftarkan diri untuk mendapatkan prioritas layanan yang lebih tinggi.";
  } else if (form.caseType === "Informasi Lain") {
    recommendation = "Information Other";
    ruleApplied = "R9";
    cfRule = 0.65;
    description =
      "Permintaan informasi umum. Tim customer support kami siap memberikan informasi yang Anda butuhkan mengenai layanan bengkel.";
  } else if (form.caseType === "Kasus Baru" && severity === "High Risk") {
    recommendation = "Level High Support";
    ruleApplied = "R10";
    cfRule = 0.9;
    description =
      "Kendaraan Anda memerlukan penanganan segera! Kerusakan terdeteksi pada kasus baru ini. Teknisi senior kami akan segera menangani masalah ini dengan prioritas tertinggi.";
  } else if (form.caseType === "Kasus Baru" && severity === "No Risk") {
    recommendation = "Level Medium Support";
    ruleApplied = "R11";
    cfRule = 0.85;
    description =
      "Layanan premium member untuk kasus baru tanpa kerusakan serius. Anda akan mendapatkan layanan standar member dengan teknisi berpengalaman.";
  } else if (form.caseType === "Kasus Lanjutan" && severity === "High Risk") {
    recommendation = "Level High Support";
    ruleApplied = "R12";
    cfRule = 1.0;
    description =
      "Kasus lanjutan dengan kerusakan parah yang memerlukan eskalasi segera. Teknisi senior akan memeriksa ulang dan menangani kerusakan yang belum terselesaikan.";
  } else {
    recommendation = "Level Standard Support";
    ruleApplied = "R13";
    cfRule = 0.7;
    description =
      "Kasus lanjutan tanpa kerusakan tambahan. Pemeriksaan standar dan penanganan rutin untuk memastikan kendaraan Anda dalam kondisi prima.";
  }

  const cfFinal =
    Math.min(memberFactor.cf, caseFactor.cf, problemFactor.cf) * cfRule;

  return {
    recommendation,
    cfFinal,
    cfMemberFactor: memberFactor,
    cfCaseFactor: caseFactor,
    cfProblemFactor: problemFactor,
    description,
    ruleApplied,
    memberStatusResult: memberOK,
    severityResult: severity,
    timestamp: new Date().toISOString(),
    id: crypto.randomUUID(),
  };
}

export const KNOWLEDGE_BASE_RULES = [
  {
    id: "R1",
    condition: "Member = Ya DAN ID Langganan = Ya",
    result: " → Status Member = Terverifikasi",
    cfRule: 0.8,
    formula: "CF = min(CF_member, CF_subId) × 0.8",
    category: "Member",
    description: "Pelanggan aktif dengan ID langganan yang valid mendapat status member penuh.",
  },
  {
    id: "R2",
    condition: "Member = Ya DAN ID Langganan = Tidak",
    result: " → Status Member = Tidak Valid",
    cfRule: 0.7,
    formula: "CF = min(CF_member, CF_subId) × 0.7",
    category: "Member",
    description: "Member terdaftar namun ID langganan tidak ditemukan di sistem.",
  },
  {
    id: "R3",
    condition: "Member = Tidak",
    result: " → Status Member = Non-Member",
    cfRule: 0.65,
    formula: "CF = CF_member × 0.65",
    category: "Member",
    description: "Pelanggan belum terdaftar sebagai member bengkel.",
  },
  {
    id: "R4",
    condition: "Kerusakan Dalam = Ya",
    result: " → Severity = High Risk",
    cfRule: 0.9,
    formula: "CF = min(CF_dalam, CF_luar) × 0.9",
    category: "Problem",
    description: "Kerusakan internal pada kendaraan mengindikasikan risiko tinggi yang perlu penanganan segera.",
  },
  {
    id: "R5",
    condition: "Kerusakan Dalam = Tidak DAN Kerusakan Luar = Ya",
    result: " → Severity = High Risk",
    cfRule: 0.8,
    formula: "CF = min(CF_dalam, CF_luar) × 0.8",
    category: "Problem",
    description: "Hanya kerusakan eksterior yang ditemukan, namun tetap dikategorikan berisiko tinggi.",
  },
  {
    id: "R6",
    condition: "Kerusakan Dalam = Tidak DAN Kerusakan Luar = Tidak",
    result: " → Severity = No Risk",
    cfRule: 0.6,
    formula: "CF = min(CF_dalam, CF_luar) × 0.6",
    category: "Problem",
    description: "Tidak ada kerusakan yang terdeteksi pada kendaraan.",
  },
  {
    id: "R7",
    condition: "Tipe Kasus = [Kasus Baru / Lanjutan / Informasi Lain]",
    result: " → CF_kasus = |CF_input|",
    cfRule: 1.0,
    formula: "CF = |CF_kasus|",
    category: "Case",
    description: "Tingkat keyakinan terhadap tipe kasus diambil nilai absolutnya.",
  },
  {
    id: "R8",
    condition: "Status Member = Tidak Valid / Non-Member",
    result: " → Non Member Support",
    cfRule: 0.6,
    formula: "CF = min(CF_member, CF_kasus, CF_problem) × 0.6",
    category: "Recommendation",
    description: "Pelanggan non-member mendapatkan layanan dasar tanpa prioritas.",
  },
  {
    id: "R9",
    condition: "Member = Valid DAN Kasus = Informasi Lain",
    result: " → Information Other",
    cfRule: 0.65,
    formula: "CF = min(CF_member, CF_kasus, CF_problem) × 0.65",
    category: "Recommendation",
    description: "Member yang hanya membutuhkan informasi umum diarahkan ke layanan informasi.",
  },
  {
    id: "R10",
    condition: "Member = Valid DAN Kasus Baru DAN Severity = High Risk",
    result: " → Level High Support",
    cfRule: 0.9,
    formula: "CF = min(CF_member, CF_kasus, CF_problem) × 0.9",
    category: "Recommendation",
    description: "Kasus baru dengan kerusakan parah memerlukan penanganan prioritas tinggi.",
  },
  {
    id: "R11",
    condition: "Member = Valid DAN Kasus Baru DAN Severity = No Risk",
    result: " → Level Medium Support",
    cfRule: 0.85,
    formula: "CF = min(CF_member, CF_kasus, CF_problem) × 0.85",
    category: "Recommendation",
    description: "Kasus baru tanpa kerusakan mendapat layanan medium premium member.",
  },
  {
    id: "R12",
    condition: "Member = Valid DAN Kasus Lanjutan DAN Severity = High Risk",
    result: " → Level High Support",
    cfRule: 1.0,
    formula: "CF = min(CF_member, CF_kasus, CF_problem) × 1.0",
    category: "Recommendation",
    description: "Kasus lanjutan dengan kerusakan serius memerlukan eskalasi ke support tertinggi.",
  },
  {
    id: "R13",
    condition: "Member = Valid DAN Kasus Lanjutan DAN Severity = No Risk",
    result: " → Level Standard Support",
    cfRule: 0.7,
    formula: "CF = min(CF_member, CF_kasus, CF_problem) × 0.7",
    category: "Recommendation",
    description: "Kasus lanjutan rutin tanpa masalah serius mendapat layanan standar.",
  },
];
