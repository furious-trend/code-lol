// agent-notes: { ctx: "Supabase-backed user rate limiting and in-memory guest rate limiting", deps: ["@/lib/supabase/server"], state: "active", last: "sato@2026-11-26" }
import { createClient } from '@/lib/supabase/server';

export interface RateLimitResult {
  success: boolean;
  allowed: boolean;
  error?: string;
}

export const RATE_LIMIT_ERROR = 'Slow down! Too many requests, try again in a minute 🐢';

const guestBuckets = new Map<string, { count: number; resetAt: number }>();

/** Throttles unauthenticated guest requests per key in a bounded in-memory window. */
export function checkGuestRateLimit(
  key: string,
  maxRequests: number = 20,
  windowMs: number = 60_000
): RateLimitResult {
  const now = Date.now();
  const safeMax = maxRequests > 0 ? maxRequests : 20;
  const safeWindow = windowMs > 0 ? windowMs : 60_000;

  if (guestBuckets.size > 5000) {
    for (const [k, v] of guestBuckets.entries()) {
      if (now >= v.resetAt) guestBuckets.delete(k);
    }
  }

  const existing = guestBuckets.get(key);
  if (!existing || now >= existing.resetAt) {
    guestBuckets.set(key, { count: 1, resetAt: now + safeWindow });
    return { success: true, allowed: true };
  }

  if (existing.count >= safeMax) {
    return { success: false, allowed: false, error: RATE_LIMIT_ERROR };
  }

  existing.count += 1;
  return { success: true, allowed: true };
}

export async function checkRateLimit(
  clientOrRoute?: any,
  routeOrMax: string | number = '/api/roast',
  maxRequests: number = 10,
  windowSeconds: number = 60
): Promise<RateLimitResult> {
  let supabase: any;
  let route: string;
  let max: number;
  let window: number;

  if (clientOrRoute && typeof clientOrRoute === 'object' && typeof clientOrRoute.rpc === 'function') {
    supabase = clientOrRoute;
    route = typeof routeOrMax === 'string' ? routeOrMax : '/api/run';
    max = typeof maxRequests === 'number' ? maxRequests : 10;
    window = typeof windowSeconds === 'number' ? windowSeconds : 60;
  } else if (typeof clientOrRoute === 'string') {
    route = clientOrRoute;
    max = typeof routeOrMax === 'number' ? routeOrMax : 10;
    window = typeof maxRequests === 'number' ? maxRequests : 60;
    supabase = await createClient();
  } else {
    route = typeof routeOrMax === 'string' ? routeOrMax : '/api/roast';
    max = typeof maxRequests === 'number' ? maxRequests : 10;
    window = typeof windowSeconds === 'number' ? windowSeconds : 60;
    supabase = await createClient();
  }

  try {
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_route: route,
      p_max: max,
      p_window_seconds: window,
    });

    if (error || data === false) {
      return {
        success: false,
        allowed: false,
        error: RATE_LIMIT_ERROR,
      };
    }

    return {
      success: true,
      allowed: true,
    };
  } catch {
    return {
      success: false,
      allowed: false,
      error: RATE_LIMIT_ERROR,
    };
  }
}
