import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import ProblemsDashboardClient from "./ProblemsDashboardClient";
import { Suspense } from "react";
import Loading from "./loading";

export default async function ProblemsDashboard() {
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
        },
      },
    }
  );

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
