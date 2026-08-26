import { createClient } from './supabase/client';

/**
 * Marks a problem as completed for the current user.
 * Falls back to localStorage if the user is not logged in.
 */
export async function saveProblemCompletion(problemId: string) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('problem_completions').upsert({
        user_id: user.id,
        problem_id: problemId,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id, problem_id' });
    }

    // Always fallback/sync with local storage
    const saved = localStorage.getItem('completedProblems');
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(problemId)) {
      completed.push(problemId);
      localStorage.setItem('completedProblems', JSON.stringify(completed));
    }
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('codelol-progress-update'));
    }
  } catch (err) {
    console.error('Error saving problem completion:', err);
  }
}

/**
 * Updates the user's current level and tier for the lesson progression.
 */
export async function saveLessonProgress(currentLevel: number) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const nextLevel = currentLevel + 1;
      const nextTier = nextLevel <= 25 ? 'Beginner' : nextLevel <= 50 ? 'Intermediate' : 'Expert';
      
      await supabase.from('profiles').update({
        current_level: nextLevel,
        current_tier: nextTier
      }).eq('id', user.id);
      
      // Update levels_completed as well to not break legacy tracking
      const { data: profile } = await supabase.from('profiles').select('levels_completed').eq('id', user.id).single();
      const currentCompleted = profile?.levels_completed || 0;
      if (currentCompleted < currentLevel) {
        await supabase.from('profiles').update({ levels_completed: currentLevel }).eq('id', user.id);
      }
    }
  } catch (err) {
    console.error('Error saving lesson progress:', err);
  }
}

/**
 * Updates the user's quiz streak and levels completed.
 */
export async function saveQuizProgress() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let currentLevels = 0;
    let currentStreak = 0;

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('levels_completed, current_streak')
        .eq('id', user.id)
        .single();

      currentLevels = profile?.levels_completed || 0;
      currentStreak = profile?.current_streak || 0;

      await supabase.from('profiles').upsert({
        id: user.id,
        levels_completed: currentLevels + 1,
        current_streak: currentStreak + 1,
      });
    } else {
      const local = JSON.parse(localStorage.getItem('userProfile') || '{"levels_completed":0,"current_streak":0}');
      currentLevels = local.levels_completed || 0;
      currentStreak = local.current_streak || 0;
    }

    // Always update local storage as a fallback
    localStorage.setItem('userProfile', JSON.stringify({
      levels_completed: currentLevels + 1,
      current_streak: currentStreak + 1
    }));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('codelol-progress-update'));
    }
  } catch (err) {
    console.error('Error saving quiz progress:', err);
  }
}
