const APPWRITE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,35}$/;

export function clampFinite(value, fallback = 0, min = -Infinity, max = Infinity) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(min, Math.min(max, numeric));
}

export function safeJsonParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed === undefined ? fallback : parsed;
  } catch {
    return fallback;
  }
}

export function readStorageString(storage, key, fallback = "") {
  const value = storage?.getItem?.(key);
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function readStorageNumber(storage, key, fallback = 0, min = -Infinity, max = Infinity) {
  return clampFinite(readStorageString(storage, key, String(fallback)), fallback, min, max);
}

export function readStorageJson(storage, key, fallback) {
  const raw = readStorageString(storage, key, "");
  if (!raw) return fallback;
  return safeJsonParse(raw, fallback);
}

export function isValidAppwriteId(value) {
  return APPWRITE_ID_PATTERN.test(String(value || ""));
}

export function sanitizeAppwriteId(value, fallback = "") {
  const next = String(value || "").trim();
  return isValidAppwriteId(next) ? next : fallback;
}

export function sanitizeAppwriteEndpoint(value, fallback = "") {
  const next = String(value || "").trim();
  if (!next) return fallback;
  try {
    const url = new URL(next);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString().replace(/\/$/, "") : fallback;
  } catch {
    return fallback;
  }
}

if (typeof window !== "undefined") {
  window.clampFinite = clampFinite;
  window.safeJsonParse = safeJsonParse;
  window.readStorageString = readStorageString;
  window.readStorageNumber = readStorageNumber;
  window.readStorageJson = readStorageJson;
  window.isValidAppwriteId = isValidAppwriteId;
  window.sanitizeAppwriteId = sanitizeAppwriteId;
  window.sanitizeAppwriteEndpoint = sanitizeAppwriteEndpoint;
}
