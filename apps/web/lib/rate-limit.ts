type Bucket = { count: number; resetAt: number };

// In-memory store — resets on server restart (acceptable for Railway single-instance)
const store = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Per-user sliding-window rate limiter.
 * @param userId  - The authenticated user's ID
 * @param key     - Endpoint bucket key (e.g. 'chat', 'interpret', 'ingest')
 * @param max     - Max requests allowed in the window
 * @param windowMs - Window duration in ms (default: 24 hours)
 */
export function checkRateLimit(
  userId: string,
  key: string,
  max: number,
  windowMs = 86_400_000
): RateLimitResult {
  const storeKey = `${key}:${userId}`;
  const now = Date.now();

  let bucket = store.get(storeKey);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    store.set(storeKey, bucket);
  }

  bucket.count += 1;
  const allowed = bucket.count <= max;

  return {
    allowed,
    remaining: Math.max(0, max - bucket.count),
    resetAt: bucket.resetAt,
  };
}
