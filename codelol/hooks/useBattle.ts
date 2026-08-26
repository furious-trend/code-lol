import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Battle, BattleParticipant, getBattleByRoomCode, getBattleParticipants } from '@/lib/battles';

export function useBattle(roomCode: string | null) {
  const [battle, setBattle] = useState<Battle | null>(null);
  const [participants, setParticipants] = useState<BattleParticipant[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!roomCode) return;
    setLoading(true);
    
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setCurrentUserId(data.user.id);
    }

    const b = await getBattleByRoomCode(roomCode);
    setBattle(b);
    
    if (b) {
      const p = await getBattleParticipants(b.id);
      setParticipants(p);
    }
    
    setLoading(false);
  }, [roomCode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!battle) return;

    const supabase = createClient();

    // Listen to battle updates (e.g., status changing to 'active' or 'finished')
    const battleChannel = supabase
      .channel(`battle-${battle.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'battles', filter: `id=eq.${battle.id}` },
        (payload) => {
          setBattle(payload.new as Battle);
        }
      )
      // Listen to participants joining or updating progress
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'battle_participants', filter: `battle_id=eq.${battle.id}` },
        async (payload) => {
          console.log('Realtime battle participant payload received:', payload);
          // It's easiest to just refetch participants to ensure we get their profile data
          // since INSERT/UPDATE payloads on battle_participants don't include joined relations (profiles).
          const p = await getBattleParticipants(battle.id);
          setParticipants(p);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(battleChannel);
    };
  }, [battle?.id]);

  return {
    battle,
    participants,
    loading,
    currentUserId
  };
}
