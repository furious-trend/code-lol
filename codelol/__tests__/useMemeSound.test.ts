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
    
    const expectedSuccessSounds = [
      "https://www.myinstants.com/media/sounds/chei-sirikkira-nee.mp3"
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
