// agent-notes: { ctx: "Server Component for problems dashboard prefetching user completions and library progress in parallel", deps: ["@/lib/supabase/server", "@/lib/problems", "./ProblemsDashboardClient"], state: active, last: "sato@2026-10-28" }
import { createClient } from "@/lib/supabase/server";
import { resolveActiveLanguage } from "@/lib/problems";
import ProblemsDashboardClient from "./ProblemsDashboardClient";
import { Suspense } from "react";
import Loading from "./loading";

interface PageProps {
  searchParams?: Promise<{ lang?: string; language?: string }>;
}

export default async function ProblemsDashboard({ searchParams }: PageProps) {
  const supabase = await createClient();

  const resolvedParams = searchParams ? await searchParams : {};
  const requestedLang = resolvedParams.lang || resolvedParams.language;

  let completedProblems: string[] = [];
  let learnedTopics: string[] = [];
  let userLearningLang: string | null = null;

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const [profileRes, probRes, progRes] = await Promise.all([
      supabase.from('profiles').select('learning_language').eq('id', user.id).single(),
      supabase.from('problem_completions').select('problem_id').eq('user_id', user.id),
      supabase.from('library_progress').select('item_id').eq('user_id', user.id).eq('learned', true),
    ]);

    if (profileRes.data?.learning_language) {
      userLearningLang = profileRes.data.learning_language;
    }
    if (probRes.data) {
      completedProblems = probRes.data.map(row => row.problem_id);
    }
    if (progRes.data) {
      learnedTopics = progRes.data.map(row => row.item_id);
    }
  }

  const effectiveLang = resolveActiveLanguage(requestedLang, userLearningLang, null);

  return (
    <Suspense fallback={<Loading />}>
      <ProblemsDashboardClient
        initialLanguage={effectiveLang}
        initialCompletedProblems={completedProblems}
        initialLearnedTopics={learnedTopics}
      />
    </Suspense>
  );
}
