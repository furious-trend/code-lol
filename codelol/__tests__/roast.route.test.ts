import { POST } from '../app/api/roast/route';
import { checkRateLimit } from '../lib/rateLimit';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('../lib/rateLimit', () => ({
  checkRateLimit: vi.fn(() => ({ success: true }))
}));

describe('/api/roast route', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: any) => {
    return new Request('http://localhost:3000/api/roast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
  };

  it('uses general fallback by default for errors', async () => {
    const request = createRequest({ code: 'console.log(', output: 'SyntaxError', isSuccess: false });
    const response = await POST(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    
    expect(data).toHaveProperty('roast');
    expect(data).toHaveProperty('fix');
    expect(data).toHaveProperty('mood');
  });

  it('uses Tamil fallback when humorPref=tamil for errors', async () => {
    const request = createRequest({ code: 'console.log(', output: 'SyntaxError', isSuccess: false, humorPref: 'tamil' });
    const response = await POST(request);
    
    expect(response.status).toBe(200);
    const data = await response.json();
    
    expect(data).toHaveProperty('roast');
    expect(data).toHaveProperty('fix');
    expect(data).toHaveProperty('mood');
  });
});

