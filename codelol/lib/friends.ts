// agent-notes: { ctx: "Friend system API for searching, requesting, and managing friendships", deps: ["@/lib/supabase/client"], state: active, last: "sato@2026-10-13" }
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

export async function searchUsers(query: string, client?: any): Promise<Profile[]> {
  if (!query.trim()) return [];
  const supabase = client || createClient();
  
  const { data: userData } = await supabase.auth.getUser();

  let dbQuery = supabase
    .from('profiles')
    .select('*')
    .ilike('display_name', `%${query.trim()}%`)
    .limit(10);
    
  if (userData?.user?.id) {
    dbQuery = dbQuery.neq('id', userData.user.id);
  }

  const { data, error } = await dbQuery;
    
  if (error) {
    console.error('Error searching users:', JSON.stringify(error, null, 2));
    console.error('Details - message:', error.message, 'code:', error.code, 'details:', error.details);
    return [];
  }
  
  return data as Profile[];
}

export async function sendFriendRequest(friendId: string, client?: any): Promise<{ success: boolean; error?: string }> {
  const supabase = client || createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return { success: false, error: 'Not authenticated' };

  if (userData.user.id === friendId) {
    return { success: false, error: 'Cannot add yourself as a friend' };
  }

  // Pre-check if relationship already exists if select is available on client
  try {
    const fromFriendships = supabase.from('friendships');
    if (typeof fromFriendships.select === 'function') {
      const { data: existing } = await fromFriendships
        .select('id, user_id, friend_id, status')
        .or(`and(user_id.eq.${userData.user.id},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userData.user.id})`)
        .maybeSingle();

      if (existing) {
        if (existing.status === 'accepted') {
          return { success: false, error: 'You are already friends with this user' };
        }
        if (existing.status === 'pending') {
          // If the other person already sent a pending request to us, auto-accept it!
          if (existing.user_id === friendId && existing.friend_id === userData.user.id) {
            const accepted = await acceptFriendRequest(existing.id, supabase);
            return { success: accepted, error: accepted ? undefined : 'Failed to accept friend request' };
          }
          return { success: false, error: 'Friend request already sent' };
        }
      }
    }
  } catch {
    // Non-blocking fallback to insert
  }

  const { error } = await supabase
    .from('friendships')
    .insert({
      user_id: userData.user.id,
      friend_id: friendId,
      status: 'pending'
    });

  if (error) {
    console.error('Error sending friend request:', JSON.stringify(error, null, 2));
    
    // Check for unique constraint violation (duplicate friend request)
    if (error.code === '23505') {
      return { success: false, error: 'Friend request already sent' };
    }
    
    // Check for RLS policy violation
    if (error.code === '42501') {
      return { success: false, error: 'Row-level security policy violation (Migrations not pushed?)' };
    }
    
    return { success: false, error: error.message };
  }

  // Proactively insert notification with sender display name in case trigger didn't run
  try {
    const { data: myProfile } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', userData.user.id)
      .maybeSingle();

    const senderName = myProfile?.display_name || 'Someone';

    await supabase.from('notifications').insert({
      user_id: friendId,
      type: 'friend_request',
      title: `Friend request from ${senderName}`,
      payload: {
        friend_id: userData.user.id,
        sender_id: userData.user.id,
        sender_name: senderName,
        display_name: senderName
      }
    });
  } catch {
    // Non-blocking
  }

  return { success: true };
}

export async function acceptFriendRequest(requestId: string, client?: any): Promise<boolean> {
  const supabase = client || createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return false;

  const { error } = await supabase
    .from('friendships')
    .update({ status: 'accepted' })
    .eq('id', requestId);

  if (error) {
    console.error('Error accepting friend request:', error);
    return false;
  }

  return true;
}

export async function getPendingRequests(client?: any): Promise<FriendRequest[]> {
  const supabase = client || createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  // Get requests where I am the friend_id and status is pending
  const { data, error } = await supabase
    .from('friendships')
    .select(`
      *,
      profiles!friendships_user_id_fkey(*)
    `)
    .eq('friend_id', userData.user.id)
    .eq('status', 'pending');

  if (error) {
    console.error('Error fetching pending requests:', JSON.stringify(error, null, 2));
    console.error('Details - message:', error.message, 'code:', error.code, 'details:', error.details);
    return [];
  }

  return (data || []) as FriendRequest[];
}

export async function getOutgoingRequests(client?: any): Promise<FriendRequest[]> {
  const supabase = client || createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  const { data, error } = await supabase
    .from('friendships')
    .select(`
      *,
      friend_profile:profiles!friendships_friend_id_fkey(*)
    `)
    .eq('user_id', userData.user.id)
    .eq('status', 'pending');

  if (error) {
    console.error('Error fetching outgoing requests:', error);
    return [];
  }

  return (data || []).map((f: any) => ({
    ...f,
    profiles: f.friend_profile || f.profiles
  })) as FriendRequest[];
}

export async function getFriends(client?: any): Promise<FriendRequest[]> {
  const supabase = client || createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return [];

  // Get friends where I am either user_id or friend_id and status is accepted
  const { data, error } = await supabase
    .from('friendships')
    .select(`
      *,
      user_profile:profiles!friendships_user_id_fkey(*),
      friend_profile:profiles!friendships_friend_id_fkey(*)
    `)
    .eq('status', 'accepted')
    .or(`user_id.eq.${userData.user.id},friend_id.eq.${userData.user.id}`);

  if (error) {
    console.error('Error fetching friends:', error);
    return [];
  }

  // Map to a simpler structure where 'profiles' is always the OTHER person
  return (data || []).map((f: any) => {
    const isSender = f.user_id === userData.user.id;
    return {
      ...f,
      profiles: isSender ? f.friend_profile : f.user_profile
    };
  });
}

