-- Policies for friendships
CREATE POLICY "Users can view their friendships" 
ON public.friendships FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can send friend requests" 
ON public.friendships FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can accept or reject friend requests" 
ON public.friendships FOR UPDATE 
USING (auth.uid() = friend_id);

CREATE POLICY "Users can delete their friendships" 
ON public.friendships FOR DELETE 
USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Policies for direct_messages
CREATE POLICY "Users can view their messages" 
ON public.direct_messages FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" 
ON public.direct_messages FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

-- Policies for notifications
CREATE POLICY "Users can view their notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert notifications for themselves" 
ON public.notifications FOR INSERT 
WITH CHECK (auth.uid() = user_id);
