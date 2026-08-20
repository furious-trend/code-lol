import { NextResponse } from 'next/server';

type Runtime = { language: string; version: string; aliases?: string[]; runtime?: string };
let runtimesCache: Runtime[] | null = null;
let runtimesLastFetched = 0;

// Basic in-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

const LANGUAGE_MAP: Record<string, string> = {
  javascript: "node",
  python: "python",
  typescript: "typescript",
  java: "java",
  c: "gcc",
  "c++": "gcc",
  csharp: "dotnet",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  kotlin: "kotlin",
  swift: "swift",
  bash: "bash",
  sqlite: "sqlite3",
  sql: "sqlite3"
};

// Specific configuration for compiling/running certain languages
const LANGUAGE_CONFIGS: Record<string, { fileName: string; compileArgs?: string[] }> = {
  javascript: { fileName: "main.js" },
  python: { fileName: "main.py" },
  ruby: { fileName: "main.rb" },
  php: { fileName: "main.php" },
  bash: { fileName: "main.sh" },
  java: { fileName: "Main.java" },
  c: { fileName: "main.c", compileArgs: ["-O3"] },
  "c++": { fileName: "main.cpp", compileArgs: ["-std=c++17", "-O3"] },
  rust: { fileName: "main.rs" },
  go: { fileName: "main.go" },
  csharp: { fileName: "Program.cs" },
  typescript: { fileName: "main.ts" },
  sqlite: { fileName: "schema.sql" }
};

async function getRuntimes(baseUrl: string) {
  const now = Date.now();
  // Cache for 5 minutes
  if (runtimesCache && (now - runtimesLastFetched < 5 * 60 * 1000)) {
    return runtimesCache;
  }
  
  const headers: Record<string, string> = {};
  if (process.env.PISTON_SECRET) {
    headers['X-Piston-Secret'] = process.env.PISTON_SECRET;
  }

  try {
    const endpoint = baseUrl.includes('emkc.org') ? `${baseUrl}/runtimes` : `${baseUrl}/api/v2/runtimes`;
    const res = await fetch(endpoint, { headers });
    if (!res.ok) throw new Error('Failed to fetch runtimes');
    runtimesCache = await res.json();
    runtimesLastFetched = now;
    return runtimesCache;
  } catch (e) {
    throw new Error(`Failed to connect to execution engine: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
}

export async function POST(request: Request) {
  try {
    // Basic Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    
    if (record && now < record.resetAt) {
      if (record.count >= RATE_LIMIT_MAX) {
        return NextResponse.json({ error: 'Slow down! Too many runs, try again in a moment 🐢' }, { status: 429 });
      }
      record.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }

    const { language, code } = await request.json();

    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    const requestedLang = language.toLowerCase();
    
    /*
    // --- JUDGE0 IMPLEMENTATION ---
    // Minimal scope: JS and Python only
    const judge0LangMap: Record<string, number> = {
      javascript: 63,
      python: 71,
    };

    const language_id = judge0LangMap[requestedLang];
    if (!language_id) {
      return NextResponse.json({ 
        error: `Language ${language} is not supported by the current Judge0 configuration.` 
      }, { status: 400 });
    }

    const apiKey = process.env.JUDGE0_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'JUDGE0_API_KEY is not configured.' }, { status: 500 });
    }

    const endpoint = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
    const payload = {
      source_code: code,
      language_id,
      stdin: ""
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.text();
      return NextResponse.json({ error: 'Judge0 execution failed', details: errData }, { status: response.status });
    }

    const data = await response.json();

    // Parse stdout, stderr, compile_output into the shape the frontend expects
    const output = data.stdout || '';
    const error = data.stderr || data.compile_output || '';
    // Let's use status.id as the code (e.g., 3 is Accepted, others are errors)
    const statusCode = data.status?.id || 0;

    return NextResponse.json({
      output,
      error,
      code: statusCode
    });

    // --- END JUDGE0 IMPLEMENTATION ---
    */

    return NextResponse.json({ error: 'External execution is disabled. Use in-browser execution.' }, { status: 400 });

    /*
    // --- BYPASSED PISTON IMPLEMENTATION ---
    const baseUrl = process.env.PISTON_API_URL || 'http://localhost:2000';
    
    let runtimes;
    try {
      runtimes = await getRuntimes(baseUrl);
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 503 });
    }

    // Find the installed version by matching either the language name or its aliases
    const runtime = runtimes?.find((r: Runtime) => 
      r.language === requestedLang || r.aliases?.includes(requestedLang) || r.runtime === requestedLang || (LANGUAGE_MAP[requestedLang] && (r.language === LANGUAGE_MAP[requestedLang] || r.runtime === LANGUAGE_MAP[requestedLang] || r.aliases?.includes(LANGUAGE_MAP[requestedLang])))
    );

    if (!runtime) {
      return NextResponse.json({ 
        error: `Runtime for ${language} is not installed on the execution engine yet.` 
      }, { status: 400 });
    }

    const config = LANGUAGE_CONFIGS[requestedLang] || { fileName: \`main.\${runtime.language}\` };

    const payload: Record<string, unknown> = {
      language: runtime.language,
      version: runtime.version,
      files: [
        {
          name: config.fileName,
          content: code,
        },
      ],
    };

    if (config.compileArgs) {
      payload.compile = { args: config.compileArgs };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (process.env.PISTON_SECRET) {
      headers['X-Piston-Secret'] = process.env.PISTON_SECRET;
    }

    const endpoint = baseUrl.includes('emkc.org') ? \`\${baseUrl}/execute\` : \`\${baseUrl}/api/v2/execute\`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.run) {
      return NextResponse.json({
        output: data.run.stdout,
        error: data.run.stderr,
        code: data.run.code,
      });
    }

    return NextResponse.json({ error: 'Execution failed', details: data }, { status: 500 });
    // --- END PISTON IMPLEMENTATION ---
    */
  } catch (error) {
    console.error('Error executing code:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Execution failed' }, { status: 500 });
  }
}

