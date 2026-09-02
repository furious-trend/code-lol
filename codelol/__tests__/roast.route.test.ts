import { POST } from '../app/api/roast/route';
import { NextRequest } from 'next/server';
import { checkRateLimit } from '../lib/rateLimit';

// Mock dependencies
vi.mock('../lib/rateLimit', () => ({
  checkRateLimit: vi.fn(() => ({ success: true }))
}));

// Mock process.env
const originalEnv = process.env;

describe('/api/roast route', () => {
  let fetchMock: any;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, GEMINI_API_KEY: 'test-api-key' };
    
    // Mock global fetch
    fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          candidates: [{ content: { parts: [{ text: 'ROAST: Test roast\nFIX: Test fix\nMOOD: facepalm' }] } }]
        })
      })
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    process.env = originalEnv;
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

  it('uses general prompt by default for errors', async () => {
    const request = createRequest({ code: 'console.log(', output: 'SyntaxError', isSuccess: false });
    const response = await POST(request);
    
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    
    const callArgs = fetchMock.mock.calls[0][1];
    const body = JSON.parse(callArgs.body);
    const prompt = body.contents[0].parts[0].text;
    
    // Should NOT contain the Tamil instruction block
    expect(prompt).not.toContain('Kollywood movie-reference energy');
  });

  it('uses Tamil prompt when humorPref=tamil for errors', async () => {
    const request = createRequest({ code: 'console.log(', output: 'SyntaxError', isSuccess: false, humorPref: 'tamil' });
    const response = await POST(request);
    
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    
    const callArgs = fetchMock.mock.calls[0][1];
    const body = JSON.parse(callArgs.body);
    const prompt = body.contents[0].parts[0].text;
    
    // SHOULD contain the Tamil instruction block
    expect(prompt).toContain('Kollywood movie-reference energy');
    expect(prompt).toContain('Tamil meme-culture rhythm');
  });
});
