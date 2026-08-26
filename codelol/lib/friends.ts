import { createClient } from '@/lib/supabase/client';

export interface Profile {
  id: string;
  display_name: string | null;
  levels_completed: number;
  current_streak: number;
  current_level: number;
  current_tier: string;
}

export interface FriendRequest {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
  profiles: Profile; // Joined data of the user who sent it, or the friend
}

export async function searchUsers(query: string): Promise<Profile[]> {
  if (!query.trim()) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .ilike('display_name', `%${query}%`)
    .limit(10);
    
  if (error) {
    console.error('Error searching users:', JSON.stringify(error, null, 2));
    console.error('Details - message:', error.message, 'code:', error.code, 'details:', error.details);
    return [];
  }
  
  return data as Profile[];
}

export async function sendFriendRequest(friendId: string): Promise<boolean> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  const { error } = await supabase
    .from('friends')
    .insert({
      user_id: userData.user.id,
      friend_id: friendId,
      status: 'pending'
    });

  if (error) {
    console.error('Error sending friend request:', error);
    return false;
  }

  return true;
}

export async function acceptFriendRequest(requestId: string): Promise<boolean> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  // We ensure the user accepting it is the friend_id via RLS, but it's safe to just update by ID
  const { error } = await supabase
    .from('friends')
    .update({ status: 'accepted' })
    .eq('id', requestId)
    .eq('friend_id', userData.user.id);

  if (error) {
    console.error('Error accepting friend request:', error);
    return false;
  }

  return true;
}

export async function getPendingRequests(): Promise<FriendRequest[]> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  // Get requests where I am the friend_id and status is pending
  const { data, error } = await supabase
    .from('friends')
    .select(`
      *,
      profiles!friends_user_id_fkey(*)
    `)
    .eq('friend_id', userData.user.id)
    .eq('status', 'pending');

  if (error) {
    console.error('Error fetching pending requests:', JSON.stringify(error, null, 2));
    console.error('Details - message:', error.message, 'code:', error.code, 'details:', error.details);
    return [];
  }

  return data as FriendRequest[];
}

export async function getFriends(): Promise<FriendRequest[]> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  // Get friends where I am either user_id or friend_id and status is accepted
  const { data, error } = await supabase
    .from('friends')
    .select(`
      *,
      user_profile:profiles!friends_user_id_fkey(*),
      friend_profile:profiles!friends_friend_id_fkey(*)
    `)
    .eq('status', 'accepted')
    .or(`user_id.eq.${userData.user.id},friend_id.eq.${userData.user.id}`);

  if (error) {
    console.error('Error fetching friends:', error);
    return [];
  }

  // Map to a simpler structure where 'profiles' is always the OTHER person
  return data.map((f: any) => {
    const isSender = f.user_id === userData.user.id;
    return {
      ...f,
      profiles: isSender ? f.friend_profile : f.user_profile
    };
  });
}
