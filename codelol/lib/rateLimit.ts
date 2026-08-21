const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export function checkRateLimit(ip: string): { success: boolean; error?: string } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (record && now < record.resetAt) {
    if (record.count >= RATE_LIMIT_MAX) {
      return { success: false, error: 'Slow down! Too many requests, try again in a minute 🐢' };
    }
    record.count += 1;
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }
  
  return { success: true };
}
