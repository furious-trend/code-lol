import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMicroCelebration } from '../hooks/useMicroCelebration';
import confetti from 'canvas-confetti';

vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

describe('useMicroCelebration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('initializes with hasCelebrated false if not in localStorage', () => {
    const { result } = renderHook(() => useMicroCelebration('test_feature'));
    
    expect(result.current.hasCelebrated).toBe(false);
  });

  it('initializes with hasCelebrated true if in localStorage', () => {
    localStorage.setItem('codelol_celebrated_test_feature_2', 'true');
    const { result } = renderHook(() => useMicroCelebration('test_feature_2'));
    
    expect(result.current.hasCelebrated).toBe(true);
  });

  it('triggers celebration and updates localStorage when called', () => {
    const { result } = renderHook(() => useMicroCelebration('test_feature_3'));
    
    expect(result.current.hasCelebrated).toBe(false);
    
    act(() => {
      result.current.triggerCelebration();
    });

    expect(confetti).toHaveBeenCalledTimes(1);
    expect(result.current.hasCelebrated).toBe(true);
    expect(localStorage.getItem('codelol_celebrated_test_feature_3')).toBe('true');
  });

  it('does not trigger celebration if already celebrated', () => {
    localStorage.setItem('codelol_celebrated_test_feature_4', 'true');
    const { result } = renderHook(() => useMicroCelebration('test_feature_4'));
    
    act(() => {
      result.current.triggerCelebration();
    });

    expect(confetti).not.toHaveBeenCalled();
  });
});
