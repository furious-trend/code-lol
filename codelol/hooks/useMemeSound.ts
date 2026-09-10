import { useCallback } from 'react';

// Singletons to prevent overlapping audio if played rapidly
let globalAudioPlayer: HTMLAudioElement | null = null;

export const __resetGlobalAudioPlayer = () => {
  globalAudioPlayer = null;
};

export function useMemeSound() {
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
      "/sounds/general/wrong/faaah.mp3",
      "/sounds/general/wrong/896756048.mp3",
      "/sounds/general/wrong/tf_nemesis.mp3",
      "/sounds/general/wrong/directed-by-robert-b_voI2Z4T.mp3",
      "/sounds/general/wrong/dexter-meme.mp3",
      "/sounds/general/wrong/faaaaaaaaaaaaaaaaaah.mp3"
    ];
    
    const tamilFailSounds = [
      "/sounds/tamil/wrong/nov-thappa-irrkuthu-naa.mp3",
      "/sounds/tamil/wrong/aiyo-apdi-chollatha.mp3",
      "/sounds/tamil/wrong/chei-sirikkira-nee.mp3",
      "/sounds/tamil/wrong/annaiku_kalaila_6_mani.mp3",
      "/sounds/tamil/wrong/yarume_illatha_kadaila_yarukuda.mp3",
      "/sounds/tamil/wrong/vadivelu_winner.mp3"
    ];
    
    const generalSuccessSounds = [
      "/sounds/general/right/happy-happy-happy-song.mp3",
      "/sounds/general/right/indian-song.mp3",
      "/sounds/general/right/kids-saying-yay-sound-effect_3.mp3",
      "/sounds/general/right/anime-wow-sound-effect.mp3"
    ];

    const tamilSuccessSounds = [
      "/sounds/tamil/right/thalapathy_kacheri.mp3",
      "/sounds/tamil/right/powerhouse_coolie.mp3",
      "/sounds/tamil/right/raga_of_revenge.mp3",
      "/sounds/tamil/right/evalavo_pannitom.mp3",
      "/sounds/tamil/right/if_you_are_bad.mp3",
      "/sounds/tamil/right/vadivelu_bomb.mp3",
      "/sounds/tamil/right/vadivelu.mp3"
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
