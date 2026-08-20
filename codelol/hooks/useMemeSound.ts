import { useCallback } from 'react';

export function useMemeSound() {
  const playMemeSound = useCallback((isSuccess: boolean) => {
    if (typeof window === 'undefined') return '';

    // Create 2 parallel audio players as was done in playground
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.6;
    
    const audioPlayer2 = new Audio();
    audioPlayer2.volume = 0.8;

    const failSounds = [
      "https://www.myinstants.com/media/sounds/seeman-buhaha.mp3",
      "https://www.myinstants.com/media/sounds/nov-thappa-irrkuthu-naa.mp3",
      "https://www.myinstants.com/media/sounds/thambi-keela-erangu-pa.mp3",
      "https://www.myinstants.com/media/sounds/aiyo-apdi-chollatha.mp3",
      "https://www.myinstants.com/media/sounds/faaah.mp3",
      "https://www.myinstants.com/media/sounds/896756048.mp3",
      "https://www.myinstants.com/media/sounds/tf_nemesis.mp3",
      "https://www.myinstants.com/media/sounds/directed-by-robert-b_voI2Z4T.mp3",
      "https://www.myinstants.com/media/sounds/dexter-meme.mp3",
      "https://www.myinstants.com/media/sounds/faaaaaaaaaaaaaaaaaah.mp3"
    ];
    
    const successSounds = [
      "https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3",
      "https://www.myinstants.com/media/sounds/seeman-buhaha.mp3",
      "https://www.myinstants.com/media/sounds/indian-song.mp3",
      "https://www.myinstants.com/media/sounds/kids-saying-yay-sound-effect_3.mp3",
      "https://www.myinstants.com/media/sounds/happy-happy-happy-song.mp3",
      "https://www.myinstants.com/media/sounds/let-her-go.mp3",
      "https://www.myinstants.com/media/sounds/level-up-super-mario.mp3"
    ];

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
        p.play().catch(e => console.log('Audio playback prevented by browser:', e));
      } else {
        p.loop = true;
        p.play().catch(e => console.log('Audio playback prevented by browser:', e));
        setTimeout(() => {
          p.pause();
          p.currentTime = 0;
        }, 10000); // 10s default limit
      }
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
        
        // For success, optionally play an extra sound like seeman laugh or level up
        if (isSuccess && Math.random() > 0.5) {
            playWithLimit(audioPlayer2, "https://www.myinstants.com/media/sounds/seeman-buhaha.mp3", 1);
        }
    }, 50);

    return soundUrl;
  }, []);

  return { playMemeSound };
}
