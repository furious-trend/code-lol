// agent-notes: { ctx: "Server Component for learn page prefetching initial progress", deps: ["@/lib/supabase/server", "./LearnPageClient"], state: active, last: "sato@2026-09-23" }
import { createClient } from "@/lib/supabase/server";
import LearnPageClient from "./LearnPageClient";
import { allLessons } from "@/lib/lessons";
import { Suspense } from "react";
import Loading from "./loading";

export default async function LearnPage() {
  const supabase = await createClient();


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
