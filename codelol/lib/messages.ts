// agent-notes: { ctx: "Direct messaging API for chatting with friends and creating message notifications", deps: ["@/lib/supabase/client"], state: active, last: "sato@2026-10-13" }
import { createClient } from '@/lib/supabase/client';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export async function sendMessage(receiverId: string, content: string): Promise<boolean> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return false;

  const { error } = await supabase
    .from('messages')
    .insert({
      sender_id: userData.user.id,
      receiver_id: receiverId,
      content,
      read: false
    });

  if (error) {
    console.error('Error sending message:', error);
    return false;
  }

  // Create notification for receiver
  try {
    let senderName = 'A friend';
    const fromProfiles = supabase.from('profiles');
    if (typeof fromProfiles.select === 'function') {
      const { data: myProfile } = await fromProfiles
        .select('display_name')
        .eq('id', userData.user.id)
        .maybeSingle();
      if (myProfile?.display_name) {
        senderName = myProfile.display_name;
      }
    }

    const preview = content.length > 50 ? content.slice(0, 47) + '...' : content;
    const fromNotifs = supabase.from('notifications');
    if (typeof fromNotifs.insert === 'function') {
      await fromNotifs.insert({
        user_id: receiverId,
        type: 'platform_update',
        title: `Message from ${senderName}`,
        payload: {
          type: 'message',
          message_type: 'direct_message',
          sender_id: userData.user.id,
          friend_id: userData.user.id,
          sender_name: senderName,
          display_name: senderName,
          content,
          preview
        }
      });
    }
  } catch {
    // Non-blocking
  }

  return true;
}

export async function getMessages(friendId: string): Promise<Message[]> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userData.user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userData.user.id})`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data as Message[];
}

export async function markAsRead(friendId: string): Promise<void> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return;

  // Mark all messages from this friend to me as read
  await supabase
    .from('messages')
    .update({ read: true })
    .eq('sender_id', friendId)
    .eq('receiver_id', userData.user.id)
    .eq('read', false);
}
