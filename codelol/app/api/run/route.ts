import { NextResponse } from 'next/server';

type Runtime = { language: string; version: string; aliases?: string[]; runtime?: string };
let runtimesCache: Runtime[] | null = null;
let runtimesLastFetched = 0;

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
  
  try {
    const res = await fetch(`${baseUrl}/api/v2/runtimes`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error('Failed to fetch runtimes');
    runtimesCache = await res.json();
    runtimesLastFetched = now;
    return runtimesCache;
  } catch {
    throw new Error('Code runner is warming up, try again in a moment');
  }
}

export async function POST(request: Request) {
  try {
    const { language, code } = await request.json();

    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    const baseUrl = process.env.PISTON_API_URL || 'http://localhost:2000';
    
    let runtimes;
    try {
      runtimes = await getRuntimes(baseUrl);
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 503 });
    }

    const requestedLang = language.toLowerCase();
    
    // Find the installed version by matching either the language name or its aliases
    const runtime = runtimes?.find((r: Runtime) => 
      r.language === requestedLang || r.aliases?.includes(requestedLang) || r.runtime === requestedLang || (LANGUAGE_MAP[requestedLang] && (r.language === LANGUAGE_MAP[requestedLang] || r.runtime === LANGUAGE_MAP[requestedLang] || r.aliases?.includes(LANGUAGE_MAP[requestedLang])))
    );

    if (!runtime) {
      return NextResponse.json({ 
        error: `Runtime for ${language} is not installed on the execution engine yet.` 
      }, { status: 400 });
    }

    const config = LANGUAGE_CONFIGS[requestedLang] || { fileName: `main.${runtime.language}` };

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

    const response = await fetch(`${baseUrl}/api/v2/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  } catch (error) {
    console.error('Error executing code with Piston:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Execution failed' }, { status: 500 });
  }
}
