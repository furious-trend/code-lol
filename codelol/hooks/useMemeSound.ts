// agent-notes: { ctx: "Hook to trigger meme audio sound effects for code execution and quiz", deps: [], state: active, last: "sato@2026-09-23" }
import { useCallback } from 'react';

// Singletons to prevent overlapping audio if played rapidly
let globalAudioPlayer: HTMLAudioElement | null = null;

export const __resetGlobalAudioPlayer = () => {
  globalAudioPlayer = null;
};

export function useMemeSound() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
  const SOUND_BASE_URL = `${supabaseUrl}/storage/v1/object/public/sounds`;

  const playMemeSound = useCallback((isSuccess: boolean, humorPref: 'general' | 'tamil' = 'general') => {
    if (typeof window === 'undefined') return '';

    const isMuted = localStorage.getItem('sound_muted') === 'true';
    if (isMuted) return ''; // Do not play if muted

    let baseVolume = 1.0;
    const storedVolume = localStorage.getItem('sound_volume');
    if (storedVolume !== null) {
      baseVolume = parseFloat(storedVolume);
    }

    if (!globalAudioPlayer) {
      globalAudioPlayer = new Audio();
    }
    
    // Stop any currently playing sound
    globalAudioPlayer.pause();
    globalAudioPlayer.currentTime = 0;

    globalAudioPlayer.volume = Math.min(1, Math.max(0, 0.6 * baseVolume));

    const generalFailSounds = [
      `${SOUND_BASE_URL}/sounds/general/wrong/faaah.mp3`,
      `${SOUND_BASE_URL}/sounds/general/wrong/896756048.mp3`,
      `${SOUND_BASE_URL}/sounds/general/wrong/tf_nemesis.mp3`,
      `${SOUND_BASE_URL}/sounds/general/wrong/directed-by-robert-b_voI2Z4T.mp3`,
      `${SOUND_BASE_URL}/sounds/general/wrong/dexter-meme.mp3`,
      `${SOUND_BASE_URL}/sounds/general/wrong/faaaaaaaaaaaaaaaaaah.mp3`,
      `${SOUND_BASE_URL}/sounds/general/wrong/let-her-go.mp3`
    ];
    
    const tamilFailSounds = [
      `${SOUND_BASE_URL}/sounds/tamil/wrong/nov-thappa-irrkuthu-naa.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/wrong/aiyo-apdi-chollatha.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/wrong/chei-sirikkira-nee.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/wrong/annaiku_kalaila_6_mani.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/wrong/yarume_illatha_kadaila_yarukuda.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/wrong/vadivelu_winner.mp3`
    ];
    
    const generalSuccessSounds = [
      `${SOUND_BASE_URL}/sounds/general/right/happy-happy-happy-song.mp3`,
      `${SOUND_BASE_URL}/sounds/general/right/indian-song.mp3`,
      `${SOUND_BASE_URL}/sounds/general/right/kids-saying-yay-sound-effect_3.mp3`,
      `${SOUND_BASE_URL}/sounds/general/right/anime-wow-sound-effect.mp3`
    ];

    const tamilSuccessSounds = [
      `${SOUND_BASE_URL}/sounds/tamil/right/thalapathy_kacheri.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/powerhouse_coolie.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/raga_of_revenge.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/evalavo_pannitom.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/if_you_are_bad.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/vadivelu_bomb.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/vadivelu.mp3`,
      `${SOUND_BASE_URL}/sounds/tamil/right/seeman-buhaha.mp3`
    ];

    const failSounds = humorPref === 'tamil' ? tamilFailSounds : generalFailSounds;
    const successSounds = humorPref === 'tamil' ? tamilSuccessSounds : generalSuccessSounds;

    const list = isSuccess ? successSounds : failSounds;
    const soundUrl = list[Math.floor(Math.random() * list.length)];
    
    // Play exactly once and do not loop
    globalAudioPlayer.src = soundUrl;
    globalAudioPlayer.loop = false;
    globalAudioPlayer.play().catch(e => console.error('Audio playback prevented by browser:', e));

    // Hard cutoff at 10 seconds in case the file is longer
    setTimeout(() => {
      if (globalAudioPlayer) {
        globalAudioPlayer.pause();
      }
    }, 10000);

    return soundUrl;
  }, []);

  return { playMemeSound };
}
