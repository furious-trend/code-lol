// agent-notes: { ctx: "Server Component for problems dashboard prefetching user completions", deps: ["@/lib/supabase/server", "./ProblemsDashboardClient"], state: active, last: "sato@2026-09-23" }
import { createClient } from "@/lib/supabase/server";
import ProblemsDashboardClient from "./ProblemsDashboardClient";
import { Suspense } from "react";
import Loading from "./loading";

export default async function ProblemsDashboard() {
  const supabase = await createClient();


  let completedProblems: string[] = [];

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from('problem_completions')
      .select('problem_id')
      .eq('user_id', user.id);
      
    if (data) {
      completedProblems = data.map(row => row.problem_id);
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProblemsDashboardClient initialCompletedProblems={completedProblems} />
    </Suspense>
  );
}
