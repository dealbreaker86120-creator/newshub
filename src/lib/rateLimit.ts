// In-memory rate limiter for NewsAPI free tier (100 requests/day)
interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

export function createRateLimiter(limit: number, windowMs: number) {
  return function rateLimiter(identifier: string): boolean {
    const now = Date.now();
    const key = identifier;

    if (!store[key] || store[key].resetTime < now) {
      store[key] = { count: 1, resetTime: now + windowMs };
      return true;
    }

    store[key].count++;
    return store[key].count <= limit;
  };
}

// 100 requests per day (86400000 ms) for NewsAPI free tier
export const dailyLimiter = createRateLimiter(100, 86400000);
