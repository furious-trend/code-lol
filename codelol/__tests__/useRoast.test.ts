import { renderHook, act } from '@testing-library/react';
import { useRoast } from '../hooks/useRoast';

describe('useRoast', () => {
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          roast: 'Test roast',
          fix: 'Test fix',
          mood: 'facepalm',
        }),
      })
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('passes humorPref to the API request', async () => {
    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('console.log(', 'error', false, '', 'tamil');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe('/api/roast');
    
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.humorPref).toBe('tamil');
  });

  it('defaults to general humorPref if not provided', async () => {
    const { result } = renderHook(() => useRoast());

    await act(async () => {
      await result.current.handleRoast('console.log(', 'error', false, '');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    const body = JSON.parse(fetchArgs[1].body);
    expect(body.humorPref).toBe('general');
  });
});
