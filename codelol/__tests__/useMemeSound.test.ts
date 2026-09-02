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

  it('should play tamil success sound when isSuccess is true and humorPref is tamil', () => {
    const { result } = renderHook(() => useMemeSound());
    const soundUrl = result.current.playMemeSound(true, 'tamil');
    
    const expectedSuccessSounds = [
      "/sounds/tamil/right/thalapathy_kacheri.mp3",
      "/sounds/tamil/right/powerhouse_coolie.mp3",
      "/sounds/tamil/right/raga_of_revenge.mp3",
      "/sounds/tamil/right/evalavo_pannitom.mp3",
      "/sounds/tamil/right/if_you_are_bad.mp3",
      "/sounds/tamil/right/vadivelu_bomb.mp3",
      "/sounds/tamil/right/vadivelu.mp3"
    ];

    expect(expectedSuccessSounds).toContain(soundUrl);
  });

  it('should play general success sound when isSuccess is true and humorPref is general', () => {
    const { result } = renderHook(() => useMemeSound());
    const soundUrl = result.current.playMemeSound(true, 'general');
    
    const expectedSuccessSounds = [
      "/sounds/general/right/happy-happy-happy-song.mp3",
      "/sounds/general/right/indian-song.mp3",
      "/sounds/general/right/kids-saying-yay-sound-effect_3.mp3",
      "/sounds/general/right/anime-wow-sound-effect.mp3"
    ];

    expect(expectedSuccessSounds).toContain(soundUrl);
  });

  it('should play general fail sound when isSuccess is false and humorPref is general', () => {
    const { result } = renderHook(() => useMemeSound());
    const soundUrl = result.current.playMemeSound(false, 'general');
    
    const expectedFailSounds = [
      "/sounds/general/wrong/faaah.mp3",
      "/sounds/general/wrong/896756048.mp3",
      "/sounds/general/wrong/tf_nemesis.mp3",
      "/sounds/general/wrong/directed-by-robert-b_voI2Z4T.mp3",
      "/sounds/general/wrong/dexter-meme.mp3",
      "/sounds/general/wrong/faaaaaaaaaaaaaaaaaah.mp3"
    ];

    expect(expectedFailSounds).toContain(soundUrl);
  });

  it('should pause audio at 10 seconds exactly', () => {
    const { result } = renderHook(() => useMemeSound());
    result.current.playMemeSound(false);
    
    // Wait for initial setTimeout
    vi.advanceTimersByTime(50);
    
    expect(pauseStub).not.toHaveBeenCalled();
    
    // Advance to just before 10 seconds
    vi.advanceTimersByTime(9900);
    expect(pauseStub).not.toHaveBeenCalled();
    
    // Advance to 10 seconds exactly
    vi.advanceTimersByTime(100);
    expect(pauseStub).toHaveBeenCalled();
  });
});
