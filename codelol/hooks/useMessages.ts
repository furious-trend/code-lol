import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getMessages, sendMessage, markAsRead, Message } from '@/lib/messages';

export function useMessages(friendId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial messages
  const loadMessages = useCallback(async () => {
    if (!friendId) return;
    setLoading(true);
    const msgs = await getMessages(friendId);
    setMessages(msgs);
    await markAsRead(friendId);
    setLoading(false);
  }, [friendId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!friendId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`messages-${friendId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          // Note: Realtime filters on UUIDs require the format column=eq.uuid
          // But it's simpler to listen to all and filter in JS if complex, 
          // or just listen to all for this friend
        },
        (payload: any) => {
          const newMsg = payload.new as Message;
          // Only add if it belongs to this conversation
          if (
            (newMsg.sender_id === friendId) || 
            (newMsg.receiver_id === friendId)
          ) {
            setMessages((prev) => {
              if (prev.find(m => m.id === newMsg.id)) return prev;
              return [...prev, newMsg];
            });
            // If we received it, mark as read
            if (newMsg.sender_id === friendId) {
              markAsRead(friendId);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [friendId]);

  const send = async (content: string) => {
    if (!friendId || !content.trim()) return false;
    return await sendMessage(friendId, content);
  };

  return {
    messages,
    loading,
    send,
  };
}
