type Bucket = { stamps: number[] };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_IN_WINDOW = 24;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_PER_DAY = 80;

export function rateLimit(key: string, now = Date.now()): {
  ok: boolean;
  retryAfter: number;
} {
  if (buckets.size > 5000) {
    const oldest = buckets.keys().next().value;
    if (oldest) buckets.delete(oldest);
  }

  const bucket = buckets.get(key) ?? { stamps: [] };
  bucket.stamps = bucket.stamps.filter((stamp) => now - stamp < DAY_MS);

  const inWindow = bucket.stamps.filter((stamp) => now - stamp < WINDOW_MS);
  if (inWindow.length >= MAX_IN_WINDOW || bucket.stamps.length >= MAX_PER_DAY) {
    const anchor = inWindow.length >= MAX_IN_WINDOW ? inWindow[0] : bucket.stamps[0];
    const limit = inWindow.length >= MAX_IN_WINDOW ? WINDOW_MS : DAY_MS;
    buckets.set(key, bucket);
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((anchor + limit - now) / 1000)),
    };
  }

  bucket.stamps.push(now);
  buckets.set(key, bucket);
  return { ok: true, retryAfter: 0 };
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  return ip.slice(0, 80);
}
