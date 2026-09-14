const TIMEZONE = "Asia/Kolkata";

export function getNowIST(): Date {
  // Native Date always stores UTC internally; formatting below forces IST.
  return new Date();
}

export function formatDateIST(
  dateInput?: string | number | Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: TIMEZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(d);
}

export function formatDateTimeIST(
  dateInput?: string | number | Date | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: TIMEZONE,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(d);
}

export function formatTimeIST(dateInput?: string | number | Date | null): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export function formatDateInputIST(dateInput: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateInput);
}

/* ------------------------------------------------------------------ */
/*  IST-aware month-boundary helpers (replace startOfMonth / endOfMonth) */
/* ------------------------------------------------------------------ */

/** Extract the IST year–month as `"YYYY"` / `"MM"` / `"DD"` parts. */
function toISTParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  const [y, m, d] = parts.split("-").map(Number);
  return { y, m, d };
}

/** Returns a Date representing the very first instant of the IST month that contains `date` (IST midnight → UTC instant). */
export function getISTMonthStart(date: Date = new Date()): Date {
  const { y, m } = toISTParts(date);
  return new Date(`${y}-${String(m).padStart(2, "0")}-01T00:00:00+05:30`);
}

/** Returns a Date representing the very last millisecond of the IST month that contains `date`. */
export function getISTMonthEnd(date: Date = new Date()): Date {
  const { y, m } = toISTParts(date);
  // Compute next IST month's first instant, then subtract 1 ms.
  const nextM = m === 12 ? 1 : m + 1;
  const nextY = m === 12 ? y + 1 : y;
  const nextMonthStart = new Date(
    `${nextY}-${String(nextM).padStart(2, "0")}-01T00:00:00+05:30`,
  );
  return new Date(nextMonthStart.getTime() - 1);
}

/* ------------------------------------------------------------------ */
/*  IST-aware day-boundary helpers                                     */
/* ------------------------------------------------------------------ */

/**
 * Returns the UTC instant that corresponds to **IST midnight** (00:00)
 * of the calendar day that contains `date` in the Asia/Kolkata timezone.
 *
 * Use this when querying a database for "today in IST" instead of the
 * broken `date.setHours(0,0,0,0)` pattern, which operates on the
 * server's local timezone and silently produces wrong boundaries.
 */
export function getISTDayStart(date: Date = new Date()): Date {
  const { y, m, d } = toISTParts(date);
  return new Date(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T00:00:00+05:30`);
}

/**
 * Returns the UTC instant that corresponds to the **very last
 * millisecond** of the IST calendar day containing `date`.
 * Equivalent to IST 23:59:59.999 for range queries.
 */
export function getISTDayEnd(date: Date = new Date()): Date {
  const { y, m, d } = toISTParts(date);
  // The next day's IST midnight, minus one millisecond.
  // Use proper calendar math instead of `d + 1` which overflows on the
  // last day of the month (e.g. Jan 31 → "32" → invalid date string).
  const nextDay = new Date(
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T12:00:00+05:30`,
  );
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  // Format the resulting date back to IST parts for the midnight string.
  const np = toISTParts(nextDay);
  const nextDayStart = new Date(
    `${np.y}-${String(np.m).padStart(2, "0")}-${String(np.d).padStart(2, "0")}T00:00:00+05:30`,
  );
  return new Date(nextDayStart.getTime() - 1);
}

/**
 * Returns `n` IST calendar days ago at IST midnight.
 * Useful for "last N days" range queries.
 */
export function getISTDayStartDaysAgo(n: number): Date {
  // Build a temporary Date in IST, then subtract n days worth of ms.
  // We use toISTParts to figure out the IST date, then do calendar math.
  const d = new Date();
  const parts = toISTParts(d);
  const target = new Date(`${parts.y}-${String(parts.m).padStart(2, "0")}-${String(parts.d).padStart(2, "0")}T00:00:00+05:30`);
  target.setTime(target.getTime() - n * 86_400_000);
  return target;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00Z`).getTime();
  const end = new Date(`${checkOut}T00:00:00Z`).getTime();
  if (isNaN(start) || isNaN(end) || end <= start) return 0;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

/**
 * Parse a date-only ISO string ("YYYY-MM-DD") into a Date at **local**
 * midnight. Date-only strings must NOT go through `parseISO` (UTC midnight),
 * or the rendered calendar/trigger drifts a day for users outside UTC.
 * Returns `undefined` for missing or malformed input so consumers can fall
 * back to a clean placeholder instead of rendering `Invalid Date`.
 */
export function parseLocalDateISO(iso?: string | null): Date | undefined {
  if (!iso) return undefined;
  const parts = iso.split("-");
  if (parts.length !== 3) return undefined;
  const [y, m, d] = parts.map(Number);
  if ([y, m, d].some((p) => !Number.isInteger(p))) return undefined;
  const date = new Date(y, m - 1, d);
  // Reject impossible calendar days (e.g. 2026-02-30) via a round-trip check.
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return undefined;
  }
  return date;
}

/**
 * Returns tomorrow's date as `YYYY-MM-DD` **on the hotel's calendar**
 * (Asia/Kolkata). `new Date().setDate(+1).toISOString()` is UTC-based and
 * drifts: for guests in IST between 00:00–05:30 it returns *today*, and for
 * US/Pacific evenings it returns *day-after-tomorrow*.
 */
export function getTomorrowISO(): string {
  const { y, m, d } = toISTParts(new Date());
  // Build at IST midday, then add one calendar day — midnight boundaries
  // are DST-free in India but midday is the safest move regardless.
  const istTomorrow = new Date(
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T12:00:00+05:30`,
  );
  istTomorrow.setUTCDate(istTomorrow.getUTCDate() + 1);
  return istTomorrow.toISOString().slice(0, 10);
}

export function getNDaysLaterISO(n = 3, fromDate?: string): string {
  const base = fromDate ? new Date(`${fromDate}T00:00:00Z`) : new Date();
  base.setDate(base.getDate() + n);
  return base.toISOString().slice(0, 10);
}

export default {
  getNowIST,
  formatDateIST,
  formatDateTimeIST,
  formatTimeIST,
  formatDateInputIST,
  parseLocalDateISO,
  getISTMonthStart,
  getISTMonthEnd,
  getISTDayStart,
  getISTDayEnd,
  getISTDayStartDaysAgo,
  calculateNights,
  getTomorrowISO,
  getNDaysLaterISO,
};

