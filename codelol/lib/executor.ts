
// agent-notes: { ctx: "Universal code executor routing all languages to OnlineCompiler API with fallback", deps: [], state: active, last: "sato@2026-10-12" }

function executeLocalJs(code: string, assertions?: Array<{ id: string, code: string }>) {
  let output = '';
  const originalLog = console.log;
  try {
    console.log = (...args) => {
      output += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
    };
    let fullCode = code + '\n';
    fullCode += 'const __vr = [];\n';
    if (assertions && assertions.length > 0) {
      for (const a of assertions) {
        fullCode += `try { __vr.push({ id: ${JSON.stringify(a.id)}, passed: Boolean(${a.code}) }); } catch(e) { __vr.push({ id: ${JSON.stringify(a.id)}, passed: false, error: e ? (e.message || String(e)) : 'Error' }); }\n`;
      }
    }
    fullCode += 'return __vr;\n';
    // eslint-disable-next-line no-new-func
    const func = new Function(fullCode);
    const verificationResults = func();
    return { output: output.trim(), verificationResults: verificationResults || [] };
  } catch (e: any) {
    return { output: output.trim(), error: e?.message || 'Execution error' };
  } finally {
    console.log = originalLog;
  }
}

export async function executeCode(
  language: string, 
  code: string,
  assertions?: Array<{ id: string, code: string }>
): Promise<{ output: string; error?: string, verificationResults?: Array<{ id: string, passed: boolean, error?: string }> }> {
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code, assertions })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { output: '', error: data.error || `Execution failed with status ${response.status}` };
    }
    
    return {
      output: data.output || '',
      error: data.error,
      verificationResults: data.verificationResults || []
    };
  } catch (e: any) {
    // If online compiler API is unreachable (e.g. offline or test environment), fallback for JS
    if (language === 'javascript' || language === 'js') {
      return executeLocalJs(code, assertions);
    }
    return { output: '', error: 'Failed to execute code. Check your connection or try again later.' };
  }
}


