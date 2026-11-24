// agent-notes: { ctx: "Supabase-backed rate limiting per user ID via check_rate_limit Postgres function", deps: ["@/lib/supabase/server"], state: active, last: "antigravity@2026-11-24" }
import { createClient } from '@/lib/supabase/server';

export interface RateLimitResult {
  success: boolean;
  allowed: boolean;
  error?: string;
}

export const RATE_LIMIT_ERROR = 'Slow down! Too many requests, try again in a minute 🐢';

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
