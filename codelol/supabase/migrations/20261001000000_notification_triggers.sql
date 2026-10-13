-- Migration to add triggers for automatic notifications

-- Trigger function for friend requests
CREATE OR REPLACE FUNCTION public.handle_friend_request_notification()
RETURNS TRIGGER AS $$
DECLARE
  sender_name text;
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
    SELECT display_name INTO sender_name FROM public.profiles WHERE id = NEW.user_id;
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (
      NEW.friend_id,
      'friend_request',
      COALESCE('Friend request from ' || sender_name, 'New Friend Request'),
      jsonb_build_object(
        'friend_id', NEW.user_id,
        'sender_id', NEW.user_id,
        'sender_name', sender_name,
        'display_name', sender_name
      )
    );
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'pending' AND NEW.status = 'accepted' THEN
    SELECT display_name INTO sender_name FROM public.profiles WHERE id = NEW.friend_id;
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (
      NEW.user_id,
      'platform_update',
      COALESCE(sender_name || ' accepted your friend request', 'Friend Request Accepted'),
      jsonb_build_object(
        'friend_id', NEW.friend_id,
        'sender_id', NEW.friend_id,
        'sender_name', sender_name,
        'display_name', sender_name
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_friend_request ON public.friendships;
CREATE TRIGGER on_friend_request
  AFTER INSERT OR UPDATE ON public.friendships
  FOR EACH ROW EXECUTE FUNCTION public.handle_friend_request_notification();

-- Create trigger function for problem completions (milestones)
CREATE OR REPLACE FUNCTION public.handle_milestone_notification()
RETURNS TRIGGER AS $$
DECLARE
  completed_count INT;
BEGIN
  SELECT COUNT(*) INTO completed_count FROM public.problem_completions WHERE user_id = NEW.user_id;
  IF completed_count = 5 THEN
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (NEW.user_id, 'streak_milestone', '5 Problems Completed!', jsonb_build_object('count', 5));
  ELSIF completed_count = 10 THEN
    INSERT INTO public.notifications (user_id, type, title, payload)
    VALUES (NEW.user_id, 'streak_milestone', '10 Problems Completed!', jsonb_build_object('count', 10));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_problem_completion ON public.problem_completions;
CREATE TRIGGER on_problem_completion
  AFTER INSERT ON public.problem_completions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_milestone_notification();
