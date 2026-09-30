import { createClient } from "@/lib/supabase/server";
import LearnPageClient from "./LearnPageClient";
import { getAllLessons } from "@/lib/lessons";
import { Suspense } from "react";
import Loading from "./loading";

export default async function LearnPage() {
  const supabase = await createClient();


  let currentLevel = 1;
  let humorPref: 'general' | 'tamil' = 'general';
  let learningLanguage = 'javascript';

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_level, humor_preference, learning_language')
      .eq('id', user.id)
      .single();
      
    if (profile?.learning_language) {
      learningLanguage = profile.learning_language;
    }

    if (profile?.current_level) {
      const lessons = getAllLessons(learningLanguage);
      const maxLevel = Math.min(profile.current_level, lessons.length);
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
        learningLanguage={learningLanguage}
      />
    </Suspense>
  );
}
