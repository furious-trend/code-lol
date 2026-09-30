import { createClient } from './supabase/client';

interface CompletionOptions {
  solveTimeMs?: number;
  timeComplexity?: string;
  spaceComplexity?: string;
  pointsAwarded?: number;
}

/**
 * Marks a problem as completed for the current user.
 * Falls back to localStorage if the user is not logged in.
 */
export async function saveProblemCompletion(problemId: string, options?: CompletionOptions, language: string = 'javascript') {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const actualProblemId = language === 'python' ? `${problemId}-python` : problemId;
      await supabase.from('problem_completions').upsert({
        user_id: user.id,
        problem_id: actualProblemId,
        completed_at: new Date().toISOString(),
        ...(options?.solveTimeMs !== undefined && { solve_time_ms: options.solveTimeMs }),
        ...(options?.timeComplexity && { time_complexity: options.timeComplexity }),
        ...(options?.spaceComplexity && { space_complexity: options.spaceComplexity }),
        ...(options?.pointsAwarded !== undefined && { points_awarded: options.pointsAwarded }),
      }, { onConflict: 'user_id, problem_id' });
    }

    // Always fallback/sync with local storage
    const localKey = language === 'python' ? 'completedProblems_python' : 'completedProblems';
    const saved = localStorage.getItem(localKey);
    const completed = saved ? JSON.parse(saved) : [];
    if (!completed.includes(problemId)) {
      completed.push(problemId);
      localStorage.setItem(localKey, JSON.stringify(completed));
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
export async function saveLessonProgress(currentLevel: number, language: string = 'javascript') {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const nextLevel = currentLevel + 1;
      const nextTier = nextLevel <= 25 ? 'Beginner' : nextLevel <= 50 ? 'Intermediate' : 'Expert';
      
      const levelCol = language === 'python' ? 'python_current_level' : 'current_level';
      const tierCol = language === 'python' ? 'python_current_tier' : 'current_tier';
      const completedCol = language === 'python' ? 'python_levels_completed' : 'levels_completed';

      await supabase.from('profiles').update({
        [levelCol]: nextLevel,
        [tierCol]: nextTier
      }).eq('id', user.id);
      
      // Update levels_completed as well to not break legacy tracking
      const { data: profile } = await supabase.from('profiles').select(completedCol).eq('id', user.id).single();
      const currentCompleted = (profile as any)?.[completedCol] || 0;
      if (currentCompleted < currentLevel) {
        await supabase.from('profiles').update({ [completedCol]: currentLevel }).eq('id', user.id);
      }
    }
  } catch (err) {
    console.error('Error saving lesson progress:', err);
  }
}

/**
 * Updates the user's quiz streak and levels completed.
 */
export async function saveQuizProgress(language: string = 'javascript') {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let currentLevels = 0;
    let currentStreak = 0;
    let lastActivity = '';
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const completedCol = language === 'python' ? 'python_levels_completed' : 'levels_completed';
    const localProfileKey = language === 'python' ? 'userProfile_python' : 'userProfile';

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select(`${completedCol}, current_streak`)
        .eq('id', user.id)
        .single();

      currentLevels = (profile as any)?.[completedCol] || 0;
      currentStreak = profile?.current_streak || 0;

      let newStreak = currentStreak;
      if (lastActivity === yesterday) {
        newStreak += 1;
      } else if (lastActivity !== today) {
        newStreak = 1; // Reset if older than yesterday or no activity
      }

      await supabase.from('profiles').upsert({
        id: user.id,
        [completedCol]: currentLevels + 1,
        current_streak: newStreak,
      });
      
      currentStreak = newStreak;
    } else {
      const localStr = localStorage.getItem(localProfileKey);
      const local = localStr ? JSON.parse(localStr) : { levels_completed: 0, current_streak: 0, last_activity_date: '' };
      currentLevels = local.levels_completed || 0;
      currentStreak = local.current_streak || 0;
      lastActivity = local.last_activity_date || '';

      if (lastActivity === yesterday) {
        currentStreak += 1;
      } else if (lastActivity !== today) {
        currentStreak = 1;
      }
    }

    // Always update local storage as a fallback
    localStorage.setItem(localProfileKey, JSON.stringify({
      levels_completed: currentLevels + 1,
      current_streak: currentStreak,
      last_activity_date: today,
    }));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('codelol-progress-update'));
    }
  } catch (err) {
    console.error('Error saving quiz progress:', err);
  }
}
