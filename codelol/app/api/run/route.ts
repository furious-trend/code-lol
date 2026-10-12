// agent-notes: { ctx: "API proxy for OnlineCompiler.io multi-language code execution", deps: ["next/server"], state: active, last: "sato@2026-10-12" }
import { NextResponse } from 'next/server';

const COMPILER_MAP: Record<string, string> = {
  // Python
  'python': 'python-3.14',
  'python-3.14': 'python-3.14',
  'py': 'python-3.14',

  // JavaScript & TypeScript via OnlineCompiler.io
  'javascript': 'typescript-deno',
  'js': 'typescript-deno',
  'typescript': 'typescript-deno',
  'ts': 'typescript-deno',
  'typescript-deno': 'typescript-deno',

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

  // Additional OnlineCompiler supported environments
  'csharp': 'dotnet-csharp-9',
  'cs': 'dotnet-csharp-9',
  'dotnet-csharp-9': 'dotnet-csharp-9',
  'php': 'php-8.5',
  'php-8.5': 'php-8.5',
  'ruby': 'ruby-4.0',
  'ruby-4.0': 'ruby-4.0',
  'go': 'go-1.26',
  'go-1.26': 'go-1.26',
  'rust': 'rust-1.93',
  'rust-1.93': 'rust-1.93'
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
    const body = await request.json();
    const { language, code, assertions } = body;

    const compiler = COMPILER_MAP[language];
    if (!compiler) {
      return NextResponse.json(
        { error: `Language '${language}' is not supported.` },
        { status: 400 }
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
    if (compiler === 'typescript-deno' && assertions && Array.isArray(assertions) && assertions.length > 0) {
      finalCode += `\n\nconsole.log("___VERIFICATION_START___");\nconst __vr = [];\n`;
      for (const a of assertions) {
        finalCode += `try { __vr.push({ id: ${JSON.stringify(a.id)}, passed: Boolean(eval(${JSON.stringify(a.code)})) }); } catch(e) { __vr.push({ id: ${JSON.stringify(a.id)}, passed: false, error: (e as any)?.message || String(e) }); }\n`;
      }
      finalCode += `console.log(JSON.stringify(__vr));\nconsole.log("___VERIFICATION_END___");\n`;
    } else if (compiler === 'python-3.14' && assertions && Array.isArray(assertions) && assertions.length > 0) {
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
