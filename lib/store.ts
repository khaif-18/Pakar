"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormData, ConsultationResult, HistoryItem } from "./types";

interface ConsultationStore {
  formData: FormData;
  result: ConsultationResult | null;
  history: HistoryItem[];
  currentStep: number;

  setFormData: (data: Partial<FormData>) => void;
  setResult: (result: ConsultationResult) => void;
  setStep: (step: number) => void;
  saveToHistory: (result: ConsultationResult, form: FormData) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  resetForm: () => void;
}

const defaultForm: FormData = {
  memberStatus: null,
  hasSubId: null,
  caseType: null,
  insideDamage: null,
  outsideDamage: null,
  cfMember: "Cukup Yakin",
  cfSubId: "Cukup Yakin",
  cfCase: "Cukup Yakin",
  cfInside: "Cukup Yakin",
  cfOutside: "Cukup Yakin",
};

export const useStore = create<ConsultationStore>()(
  persist(
    (set) => ({
      formData: defaultForm,
      result: null,
      history: [],
      currentStep: 0,

      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      setResult: (result) => set({ result }),

      setStep: (step) => set({ currentStep: step }),

      saveToHistory: (result, form) =>
        set((state) => ({
          history: [{ ...result, formSnapshot: form }, ...state.history].slice(
            0,
            50
          ),
        })),

      deleteHistoryItem: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),

      clearHistory: () => set({ history: [] }),

      resetForm: () =>
        set({ formData: defaultForm, result: null, currentStep: 0 }),
    }),
    {
      name: "ebengkel-store",
      partialize: (state) => ({ history: state.history }),
    }
  )
);
