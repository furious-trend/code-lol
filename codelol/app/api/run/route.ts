// agent-notes: { ctx: "API proxy for OnlineCompiler.io Python, C, C++, and Java execution with client-side JS enforcement", deps: ["next/server", "@/lib/supabase/server", "@/lib/userRateLimit"], state: active, last: "sato@2026-10-28" }
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkUserRateLimit } from '@/lib/userRateLimit';

const COMPILER_MAP: Record<string, string> = {
  // Python
  'python': 'python-3.14',
  'python-3.14': 'python-3.14',
  'py': 'python-3.14',

  // C
  'c': 'gcc-15',
  'gcc-15': 'gcc-15',

  // C++
  'cpp': 'g++-15',
  'c++': 'g++-15',
  'g++-15': 'g++-15',

  // Java
  'java': 'openjdk-25',
  'openjdk-25': 'openjdk-25',
};

async function fetchWithTimeout(resource: string, options: RequestInit & { timeout?: number }) {
  const { timeout = 30000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Timeout');
    }
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // 1. Supabase server auth verification
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to run code.' },
        { status: 401 }
      );
    }

    // 2. Parse and enforce body bounds
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const { language, code, assertions } = body || {};

    if (!language || typeof language !== 'string') {
      return NextResponse.json(
        { error: 'Language is required.' },
        { status: 400 }
      );
    }

    const normalizedLang = language.toLowerCase();
    if (normalizedLang === 'javascript' || normalizedLang === 'js') {
      return NextResponse.json(
        { error: 'JavaScript must execute client-side in the browser.' },
        { status: 400 }
      );
    }

    const compiler = COMPILER_MAP[normalizedLang];
    if (!compiler) {
      return NextResponse.json(
        { error: `Language '${language}' is not supported.` },
        { status: 400 }
      );
    }

    if (code === undefined || code === null || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Code string is required.' },
        { status: 400 }
      );
    }

    // Enforce body bounds: max 20,000 characters (~20KB)
    if (code.length > 20000) {
      return NextResponse.json(
        { error: 'Code exceeds maximum allowed size (20KB limit).' },
        { status: 400 }
      );
    }

    // Bounds on assertions
    if (assertions !== undefined && !Array.isArray(assertions)) {
      return NextResponse.json(
        { error: 'Assertions must be an array.' },
        { status: 400 }
      );
    }

    if (Array.isArray(assertions) && assertions.length > 20) {
      return NextResponse.json(
        { error: 'Too many assertions (maximum 20 allowed).' },
        { status: 400 }
      );
    }

    // 3. DB-backed rate limiting
    const rateLimit = await checkUserRateLimit(supabase, user.id, 20, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: rateLimit.error || 'Too many requests. Please wait a moment before running code again 🐢' },
        { status: 429 }
      );
    }

    const apiKey = process.env.ONLINECOMPILER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error. API key missing.' },
        { status: 500 }
      );
    }

    let finalCode = code;
    if (compiler === 'python-3.14' && assertions && Array.isArray(assertions) && assertions.length > 0) {
      finalCode += `\n\nprint("___VERIFICATION_START___")\nimport json\n__vr = []\n`;
      for (const a of assertions) {
        finalCode += `try:\n    __vr.append({"id": ${JSON.stringify(a.id)}, "passed": bool(${a.code})})\nexcept Exception as e:\n    __vr.append({"id": ${JSON.stringify(a.id)}, "passed": False, "error": str(e)})\n`;
      }
      finalCode += `print(json.dumps(__vr))\nprint("___VERIFICATION_END___")\n`;
    }

    let retries = 1;
    let lastStatus = 500;
    while (retries >= 0) {
      try {
        console.log('Sending request to onlinecompiler:', { compiler, code, input: '' }, 'APIKey:', apiKey);
        const response = await fetchWithTimeout('https://api.onlinecompiler.io/api/run-code-sync/', {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ compiler, code: finalCode, input: '' }),
          timeout: 30000,
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          let output = data.output || '';
          let verificationResults = [];
          
          if (output.includes("___VERIFICATION_START___") && output.includes("___VERIFICATION_END___")) {
            const parts = output.split("___VERIFICATION_START___");
            const rawCodeOutput = parts[0];
            const verifPart = parts[1].split("___VERIFICATION_END___")[0];
            try {
               verificationResults = JSON.parse(verifPart.trim());
            } catch (e) {}
            // Clean up any trailing newlines from before the verification start
            output = rawCodeOutput.replace(/\n$/, '');
          }
          
          return NextResponse.json({ output, error: data.error || '', verificationResults }, { status: 200 });
        }

        if (response.status === 429) {
          lastStatus = 429;
          if (retries > 0) {
            await new Promise(r => setTimeout(r, 1000));
            retries--;
            continue;
          }
          return NextResponse.json(
            { error: 'Too many people compiling right now — try again in a few seconds.' },
            { status: 500 }
          );
        }
        
        // Other errors
        return NextResponse.json(
          { error: `Execution failed with status ${response.status}` },
          { status: response.status }
        );
      } catch (error: any) {
        if (error.message === 'Timeout') {
          return NextResponse.json(
            { error: 'Compilation timed out. Try simpler code.' },
            { status: 504 }
          );
        }
        throw error; // Let outer catch handle it
      }
    }

    return NextResponse.json(
      { error: 'Unexpected error during execution.' },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to parse request or internal error.' },
      { status: 500 }
    );
  }
}
