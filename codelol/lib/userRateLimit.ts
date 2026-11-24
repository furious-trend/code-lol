// agent-notes: { ctx: "DB-backed rate limiting with Supabase RPC check_rate_limit", deps: ["@/lib/rateLimit"], state: active, last: "antigravity@2026-11-24" }
import { checkRateLimit, RateLimitResult } from '@/lib/rateLimit';

export type { RateLimitResult };

export async function checkUserRateLimit(
  supabase: any,
  _userId?: string,
  maxRequests = 10,
  windowSeconds = 60
): Promise<RateLimitResult> {
  return checkRateLimit(supabase, '/api/run', maxRequests, windowSeconds);
}
