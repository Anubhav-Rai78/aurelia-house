import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IST = "Asia/Kolkata";

export function formatCurrency(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
}

/**
 * Whole-rupee currency formatting (no decimals) — used by the MORA menu where
 * prices are displayed as clean whole numbers ("₹850").
 */
export function formatINRWhole(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    dateStyle: "medium",
  }).format(new Date(date));
}

export function formatTime(date: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: IST,
    timeStyle: "short",
  }).format(new Date(date));
}
