'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { acceptFriendRequest } from '@/lib/friends';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  payload: any;
  is_read: boolean;
  created_at: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function fetchNotifications() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (data) setNotifications(data);
    }

    fetchNotifications();

    const setupRealtime = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const channel = supabase
        .channel('public:notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userData.user.id}`,
          },
          (payload) => {
            const newNotif = payload.new as Notification;
            setNotifications((prev) => [newNotif, ...prev]);
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userData.user.id}`,
          },
          (payload) => {
            const updatedNotif = payload.new as Notification;
            setNotifications((prev) =>
              prev.map((n) => (n.id === updatedNotif.id ? updatedNotif : n))
            );
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    let cleanupFn: (() => void) | undefined;
    setupRealtime().then((fn) => {
      if (fn) cleanupFn = fn;
    });

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  const markAsRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const handleAcceptFriend = async (notif: Notification) => {
    if (notif.payload?.friend_id) {
      // Find the request ID by querying pending requests from this friend
      const { data: pending } = await supabase
        .from('friendships')
        .select('id')
        .eq('friend_id', notif.user_id)
        .eq('user_id', notif.payload.friend_id)
        .eq('status', 'pending')
        .single();
        
      if (pending) {
        await acceptFriendRequest(pending.id);
      }
      await markAsRead(notif.id);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 text-zinc-400 hover:text-white transition-colors outline-none origin-top"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center">
              <h3 className="font-bold text-white">Notification Center</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={async () => {
                    const unread = notifications.filter(n => !n.is_read);
                    for (const n of unread) await markAsRead(n.id);
                  }}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {notifications.length > 0 ? (
                notifications.map(notif => (
                  <div key={notif.id} className={`bg-zinc-800/50 p-3 rounded-xl border mb-2 ${notif.is_read ? 'border-zinc-800/30 opacity-70' : 'border-zinc-700/50'}`}>
                    <p className="text-sm font-medium text-white mb-1">{notif.title}</p>
                    
                    {notif.type === 'friend_request' && !notif.is_read && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleAcceptFriend(notif)}
                          className="flex-1 bg-green-500 hover:bg-green-400 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                    {notif.type !== 'friend_request' && !notif.is_read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="mt-2 text-xs text-zinc-400 hover:text-zinc-300"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 text-center py-4">No notifications yet</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
