import { useCallback } from 'react';

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

    // Create 2 parallel audio players as was done in playground
    const audioPlayer = new Audio();
    audioPlayer.volume = Math.min(1, Math.max(0, 0.6 * baseVolume));
    
    const audioPlayer2 = new Audio();
    audioPlayer2.volume = Math.min(1, Math.max(0, 0.8 * baseVolume));

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
    
    const playWithLimit = (p: HTMLAudioElement, src: string, maxRepeats: number = 0) => {
      p.src = src;
      if (maxRepeats > 0) {
        p.loop = false;
        let plays = 0;
        const onEnded = () => {
          plays++;
          if (plays < maxRepeats) p.play().catch(() => {});
          else p.removeEventListener('ended', onEnded);
        };
        p.addEventListener('ended', onEnded);
        p.play().catch(e => console.error('Audio playback prevented by browser:', e));
      } else {
        p.loop = true;
        p.play().catch(e => console.error('Audio playback prevented by browser:', e));
      }
      setTimeout(() => {
        p.pause();
        p.currentTime = 0;
      }, 10000); // 10s absolute maximum limit
    };

    // Synchronously create and unlock TWO audio players on click
    const unlockAudio = (p: HTMLAudioElement) => {
        p.src = "data:audio/mp3;base64,//OwgAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAJwAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAw";
        p.play().catch(() => {});
    };
    unlockAudio(audioPlayer);
    unlockAudio(audioPlayer2);
    
    // Slight delay to allow unlock to process before setting actual source
    setTimeout(() => {
        playWithLimit(audioPlayer, soundUrl, 1);
    }, 50);

    return soundUrl;
  }, []);

  return { playMemeSound };
}
