import { useCallback } from 'react';

export function useMemeSound() {
  const playMemeSound = useCallback((isSuccess: boolean) => {
    if (typeof window === 'undefined') return '';

    // Create 2 parallel audio players as was done in playground
    const audioPlayer = new Audio();
    audioPlayer.volume = 0.6;
    
    const audioPlayer2 = new Audio();
    audioPlayer2.volume = 0.8;

    const generalFailSounds = [
      "/sounds/general/faaah.mp3",
      "/sounds/general/896756048.mp3",
      "/sounds/general/tf_nemesis.mp3",
      "/sounds/general/directed-by-robert-b_voI2Z4T.mp3",
      "/sounds/general/dexter-meme.mp3",
      "/sounds/general/faaaaaaaaaaaaaaaaaah.mp3"
    ];
    
    const tamilFailSounds = [
      "/sounds/tamil/wrong/nov-thappa-irrkuthu-naa.mp3",
      "/sounds/tamil/wrong/aiyo-apdi-chollatha.mp3",
      "https://www.myinstants.com/media/sounds/chei-sirikkira-nee-77266.mp3"
    ];
    
    const successSounds = [
      "https://www.myinstants.com/en/instant/chei-sirikkira-nee-77266/?utm_source=copy&utm_medium=share",
      "https://tamilsoundboard.com/share/227",
      "https://tamilsoundboard.com/share/168",
      "https://tamilsoundboard.com/share/165",
      "https://mobcup.fm/ringtone/jana-nayagan-thalapathy-kacheri-song-bgm-79m4mwVm?utm_source=share&utm_medium=web&utm_name=list",
      "https://mobcup.fm/ringtone/powerhouse-coolie-oTxTYZm4?utm_source=share&utm_medium=web&utm_name=list",
      "https://mobcup.fm/ringtone/sandakozhi-the-glow-of-angel-bgm-rvmw5SZW?utm_source=share&utm_medium=web&utm_name=list",
      "https://mobcup.fm/ringtone/pa-da-ni-ga-re-sa-re-ni-sa-raga-of-revenge-dc-movie-rrk8SCo9?utm_source=share&utm_medium=web&utm_name=list",
      "/sounds/tamil/right/seeman-buhaha.mp3"
    ];

    // Use Tamil sounds by default to match the gif behavior
    const failSounds = tamilFailSounds;

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
      }, 8000); // 8s absolute maximum limit
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
