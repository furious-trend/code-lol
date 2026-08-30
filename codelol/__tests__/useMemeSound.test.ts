import { renderHook } from '@testing-library/react';
import { useMemeSound } from '../hooks/useMemeSound';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useMemeSound', () => {
  let playStub: any;
  let pauseStub: any;

  beforeEach(() => {
    vi.useFakeTimers();
    playStub = vi.fn().mockResolvedValue(undefined);
    pauseStub = vi.fn();
    
    // Mock the Audio object
    const AudioMock = vi.fn().mockImplementation(function() {
      return {
        play: playStub,
        pause: pauseStub,
        addEventListener: vi.fn((event, cb) => {
          if (event === 'ended') {
            // Store the callback to trigger it manually if needed
          }
        }),
        removeEventListener: vi.fn(),
        src: '',
        volume: 1,
        loop: false,
        currentTime: 0,
      };
    });
    
    vi.stubGlobal('Audio', AudioMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should play success sound when isSuccess is true', () => {
    const { result } = renderHook(() => useMemeSound());
    const soundUrl = result.current.playMemeSound(true);
    
    // Expected success sounds including the user requested ones
    const expectedSuccessSounds = [
      "https://www.myinstants.com/en/instant/chei-sirikkira-nee-77266/?utm_source=copy&utm_medium=share",
      "https://tamilsoundboard.com/share/227",
      "https://tamilsoundboard.com/share/168",
      "https://tamilsoundboard.com/share/165",
      "https://mobcup.fm/ringtone/jana-nayagan-thalapathy-kacheri-song-bgm-79m4mwVm?utm_source=share&utm_medium=web&utm_name=list",
      "https://mobcup.fm/ringtone/powerhouse-coolie-oTxTYZm4?utm_source=share&utm_medium=web&utm_name=list",
      "https://mobcup.fm/ringtone/sandakozhi-the-glow-of-angel-bgm-rvmw5SZW?utm_source=share&utm_medium=web&utm_name=list",
      "https://mobcup.fm/ringtone/pa-da-ni-ga-re-sa-re-ni-sa-raga-of-revenge-dc-movie-rrk8SCo9?utm_source=share&utm_medium=web&utm_name=list",
      "/sounds/general/anime-wow-sound-effect.mp3",
      "/sounds/tamil/seeman-buhaha.mp3",
      "/sounds/general/indian-song.mp3",
      "/sounds/general/kids-saying-yay-sound-effect_3.mp3",
      "/sounds/general/happy-happy-happy-song.mp3",
      "/sounds/general/let-her-go.mp3"
    ];

    expect(expectedSuccessSounds).toContain(soundUrl);
  });

  it('should pause audio at 8 seconds exactly', () => {
    const { result } = renderHook(() => useMemeSound());
    result.current.playMemeSound(false);
    
    // Wait for initial setTimeout
    vi.advanceTimersByTime(50);
    
    expect(pauseStub).not.toHaveBeenCalled();
    
    // Advance to just before 8 seconds
    vi.advanceTimersByTime(7900);
    expect(pauseStub).not.toHaveBeenCalled();
    
    // Advance to 8 seconds exactly
    vi.advanceTimersByTime(100);
    expect(pauseStub).toHaveBeenCalled();
  });
});
