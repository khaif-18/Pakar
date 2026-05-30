import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCF(cf: number): string {
  return (cf * 100).toFixed(1) + "%";
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function getCFColor(cf: number): string {
  if (cf >= 0.7) return "text-emerald-400";
  if (cf >= 0.4) return "text-yellow-400";
  return "text-red-400";
}

export function getCFBgColor(cf: number): string {
  if (cf >= 0.7) return "bg-emerald-500";
  if (cf >= 0.4) return "bg-yellow-500";
  return "bg-red-500";
}
