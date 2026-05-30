export type ConfidenceLabel =
  | "Sangat Yakin"
  | "Yakin"
  | "Cukup Yakin"
  | "Kurang Yakin"
  | "Tidak Tahu"
  | "Kurang Tidak Yakin"
  | "Cukup Tidak Yakin"
  | "Tidak Yakin"
  | "Sangat Tidak Yakin";

export type CaseType = "Kasus Baru" | "Kasus Lanjutan" | "Informasi Lain";

export type SupportLevel =
  | "Level High Support"
  | "Level Medium Support"
  | "Level Standard Support"
  | "Information Other"
  | "Non Member Support";

export interface FormData {
  memberStatus: boolean | null;
  hasSubId: boolean | null;
  caseType: CaseType | null;
  insideDamage: boolean | null;
  outsideDamage: boolean | null;
  cfMember: ConfidenceLabel;
  cfSubId: ConfidenceLabel;
  cfCase: ConfidenceLabel;
  cfInside: ConfidenceLabel;
  cfOutside: ConfidenceLabel;
}

export interface FactorResult {
  label: string;
  cf: number;
  rule: string;
  explanation: string;
}

export interface ConsultationResult {
  recommendation: SupportLevel;
  cfFinal: number;
  cfMemberFactor: FactorResult;
  cfCaseFactor: FactorResult;
  cfProblemFactor: FactorResult;
  description: string;
  ruleApplied: string;
  memberStatusResult: boolean;
  severityResult: string;
  timestamp: string;
  id: string;
}

export interface HistoryItem extends ConsultationResult {
  formSnapshot: FormData;
}
