// agent-notes: { ctx: "Learn page routing with deterministic language cascade, mounting interactive library platform", deps: ["./LearnPageClient", "./LearnPagePythonClient", "@/lib/lessons", "@/lib/supabase/server"], state: active, last: "sato@2026-10-13" }
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import LearnPageClient from "./LearnPageClient";
import LearnPagePythonClient from "./LearnPagePythonClient";
import { getAllLessons } from "@/lib/lessons";
import { Suspense } from "react";
import Loading from "./loading";
import { HumorPreference } from "@/lib/python/types";

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('learning_language')?.value;

  let currentLevel = 1;
  let highestUnlockedLevel = 1;
  let humorPref: HumorPreference = 'general';
  let learningLanguage = 'python';
  let initialLevelId = 'ch1-l1';

  const requestedLang = (params.lang || params.language) as string | undefined;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && user.id !== 'local-guest') {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_level, python_current_level, humor_preference, learning_language')
      .eq('id', user.id)
      .single();

    // Cascade: 1. searchParams, 2. profile.learning_language, 3. cookie, 4. default
    if (requestedLang && ['python', 'javascript', 'c', 'cpp', 'java'].includes(requestedLang)) {
      learningLanguage = requestedLang;
    } else if (profile?.learning_language) {
      learningLanguage = profile.learning_language;
    } else if (cookieLang && ['python', 'javascript', 'c', 'cpp', 'java'].includes(cookieLang)) {
      learningLanguage = cookieLang;
    }

    const activeLevel =
      learningLanguage === 'python' && profile?.python_current_level
        ? profile.python_current_level
        : profile?.current_level;

    if (activeLevel) {
      const lessons = getAllLessons(learningLanguage);
      const maxLevel = Math.min(Number(activeLevel) || 1, lessons.length);
      highestUnlockedLevel = Math.max(1, maxLevel);
      currentLevel = highestUnlockedLevel;

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
  } else {
    // Guest cascade: 1. searchParams, 2. cookie, 3. default
    if (requestedLang && ['python', 'javascript', 'c', 'cpp', 'java'].includes(requestedLang)) {
      learningLanguage = requestedLang;
    } else if (cookieLang && ['python', 'javascript', 'c', 'cpp', 'java'].includes(cookieLang)) {
      learningLanguage = cookieLang;
    }

    if (params.level && typeof params.level === 'string') {
      const requestedLevel = parseInt(params.level, 10);
      if (!isNaN(requestedLevel) && requestedLevel >= 1) {
        currentLevel = requestedLevel;
      }
    }
  }

  if (params.topic && typeof params.topic === 'string') {
    initialLevelId = params.topic;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-zinc-950">
      <Suspense fallback={<Loading />}>
        {learningLanguage === "python" ? (
          <LearnPagePythonClient
            initialLevelId={initialLevelId}
            initialHumorPref={humorPref}
          />
        ) : (
          <LearnPageClient
            initialLevel={currentLevel}
            highestUnlockedLevel={highestUnlockedLevel}
            initialHumorPref={humorPref}
            learningLanguage={learningLanguage}
          />
        )}
      </Suspense>
    </div>
  );
}
