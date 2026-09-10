import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import LearnPageClient from "./LearnPageClient";
import { allLessons } from "@/lib/lessons";
import { Suspense } from "react";
import Loading from "./loading";

export default async function LearnPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // This is a Server Component, so we can't set cookies directly here
        },
      },
    }
  );

  let currentLevel = 1;
  let humorPref: 'general' | 'tamil' = 'general';

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_level, humor_preference')
      .eq('id', user.id)
      .single();
      
    if (profile?.current_level) {
      const maxLevel = Math.min(profile.current_level, allLessons.length);
      currentLevel = Math.max(1, maxLevel);
    }
    if (profile?.humor_preference === 'tamil' || profile?.humor_preference === 'general') {
      humorPref = profile.humor_preference;
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <LearnPageClient 
        initialLevel={currentLevel} 
        initialHumorPref={humorPref} 
      />
    </Suspense>
  );
}
