// agent-notes: { ctx: "DB-backed rate limiting with in-memory fallback for user API actions", deps: ["@/lib/rateLimit"], state: active, last: "sato@2026-10-16" }
import { checkRateLimit } from '@/lib/rateLimit';

export interface RateLimitResult {
  allowed: boolean;
  error?: string;
}

export async function checkUserRateLimit(
  supabase: any,
  userId: string,
  maxRequests = 20,
  windowSeconds = 60
): Promise<RateLimitResult> {
  try {
    const now = new Date();

    const { data, error } = await supabase
      .from('api_rate_limits')
      .select('request_count, window_start')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      // Table might not exist or network glitch; fallback to in-memory limiter
      const fallback = checkRateLimit(userId);
      return {
        allowed: fallback.success,
        error: fallback.error,
      };
    }

    if (!data || new Date(data.window_start).getTime() <= now.getTime() - windowSeconds * 1000) {
      await supabase
        .from('api_rate_limits')
        .upsert({ user_id: userId, request_count: 1, window_start: now.toISOString() });
      return { allowed: true };
    }

    if (data.request_count >= maxRequests) {
      return {
        allowed: false,
        error: 'Too many requests. Please wait a few seconds before running code again 🐢',
      };
    }

    await supabase
      .from('api_rate_limits')
      .update({ request_count: data.request_count + 1 })
      .eq('user_id', userId);

    return { allowed: true };
  } catch {
    const fallback = checkRateLimit(userId);
    return {
      allowed: fallback.success,
      error: fallback.error,
    };
  }
}
