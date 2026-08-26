import { createClient } from '@/lib/supabase/client';

export type BattleStatus = 'waiting' | 'active' | 'finished';

export interface Battle {
  id: string;
  created_by: string;
  problem_id: string;
  status: BattleStatus;
  max_players: number;
  time_limit_seconds: number;
  started_at: string | null;
  room_code: string;
  created_at: string;
}

export interface BattleParticipant {
  id: string;
  battle_id: string;
  user_id: string;
  joined_at: string;
  solved_at: string | null;
  passed_tests: number;
  total_tests: number | null;
  submission_code: string | null;
  finished: boolean;
  profiles?: {
    id: string;
    display_name: string | null;
    current_level: number;
  };
}

function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createBattle(problemId: string, maxPlayers: number, timeLimitSeconds: number): Promise<{ id: string, room_code: string } | null> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const roomCode = generateRoomCode();

  const { data, error } = await supabase
    .from('battles')
    .insert({
      created_by: userData.user.id,
      problem_id: problemId,
      max_players: maxPlayers,
      time_limit_seconds: timeLimitSeconds,
      room_code: roomCode,
      status: 'waiting'
    })
    .select('id, room_code')
    .single();

  if (error) {
    console.error('Error creating battle:', JSON.stringify(error, null, 2));
    console.error('Details - message:', error.message, 'code:', error.code, 'details:', error.details);
    return null;
  }

  // Automatically join the battle
  await joinBattle(roomCode);

  return data;
}

export async function getBattleByRoomCode(roomCode: string): Promise<Battle | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('battles')
    .select('*')
    .eq('room_code', roomCode.toUpperCase())
    .single();

  if (error) {
    return null;
  }

  return data as Battle;
}

export async function joinBattle(roomCode: string): Promise<boolean> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  const battle = await getBattleByRoomCode(roomCode);
  if (!battle || battle.status !== 'waiting') return false;

  const { error } = await supabase
    .from('battle_participants')
    .insert({
      battle_id: battle.id,
      user_id: userData.user.id
    });

  if (error) {
    // If unique constraint violated (already joined), we just return true
    if (error.code === '23505') return true;
    console.error('Error joining battle:', JSON.stringify(error, null, 2));
    return false;
  }

  return true;
}

export async function startBattle(battleId: string): Promise<boolean> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  const { error } = await supabase
    .from('battles')
    .update({ 
      status: 'active',
      started_at: new Date().toISOString()
    })
    .eq('id', battleId)
    .eq('created_by', userData.user.id);

  if (error) {
    console.error('Error starting battle:', error);
    return false;
  }

  return true;
}

export async function updateParticipantProgress(battleId: string, passedTests: number, totalTests: number, code: string, finished: boolean, solvedAt?: string): Promise<boolean> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return false;

  const updateData: any = {
    passed_tests: passedTests,
    total_tests: totalTests,
    submission_code: code,
    finished
  };

  if (solvedAt) {
    updateData.solved_at = solvedAt;
  }

  const { error } = await supabase
    .from('battle_participants')
    .update(updateData)
    .eq('battle_id', battleId)
    .eq('user_id', userData.user.id);

  if (error) {
    console.error('Error updating progress:', error);
    return false;
  }

  return true;
}

export async function getBattleParticipants(battleId: string): Promise<BattleParticipant[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('battle_participants')
    .select('*, profiles(id, display_name, current_level)')
    .eq('battle_id', battleId);

  if (error) {
    console.error('Error fetching participants:', error);
    return [];
  }

  return data as BattleParticipant[];
}

export async function finishBattle(battleId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('battles')
    .update({ status: 'finished' })
    .eq('id', battleId);

  return !error;
}
