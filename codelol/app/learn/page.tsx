import { createClient } from "@/lib/supabase/server";
import LearnPageClient from "./LearnPageClient";
import { getAllLessons } from "@/lib/lessons";
import { Suspense } from "react";
import Loading from "./loading";

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const supabase = await createClient();
  const params = await searchParams;

  let currentLevel = 1;
  let highestUnlockedLevel = 1;
  let humorPref: 'general' | 'tamil' = 'general';
  let learningLanguage = 'javascript';

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_level, python_current_level, humor_preference, learning_language')
      .eq('id', user.id)
      .single();
      
    if (profile?.learning_language) {
      learningLanguage = profile.learning_language;
    }

    const activeLevel = learningLanguage === 'python' ? profile?.python_current_level : profile?.current_level;

    if (activeLevel) {
      const lessons = getAllLessons(learningLanguage);
      const maxLevel = Math.min(activeLevel, lessons.length);
      highestUnlockedLevel = Math.max(1, maxLevel);
      currentLevel = highestUnlockedLevel;
      
      // Override currentLevel if a valid level query param is provided and unlocked
      if (params.level && typeof params.level === 'string') {
        const requestedLevel = parseInt(params.level, 10);
        if (!isNaN(requestedLevel) && requestedLevel >= 1 && requestedLevel <= highestUnlockedLevel) {
          currentLevel = requestedLevel;
        }
      }
    }
    if (profile?.humor_preference === 'tamil' || profile?.humor_preference === 'general') {
      humorPref = profile.humor_preference;
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <LearnPageClient 
        initialLevel={currentLevel} 
        highestUnlockedLevel={highestUnlockedLevel}
        initialHumorPref={humorPref}
        learningLanguage={learningLanguage}
      />
    </Suspense>
  );
}
