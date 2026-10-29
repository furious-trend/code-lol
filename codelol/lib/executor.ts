// agent-notes: { ctx: "Universal code executor routing JS to sandboxed iframe with postMessage and other languages to /api/run", deps: [], state: active, last: "sato@2026-10-28" }

export interface VerificationResult {
  id: string;
  passed: boolean;
  error?: string;
}

export interface ExecutionResult {
  output: string;
  error?: string;
  verificationResults?: VerificationResult[];
}

export function createSandboxIframe(): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.style.display = 'none';
  return iframe;
}

export function executeSandboxedJs(
  code: string,
  assertions?: Array<{ id: string; code: string }>,
  timeoutMs: number = 5000
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve({ output: '', error: 'Browser environment required for JavaScript execution' });
      return;
    }

    const nonce = 'codelol_' + Math.random().toString(36).slice(2) + '_' + Date.now();
    const iframe = createSandboxIframe();

    let resolved = false;
    let timer: NodeJS.Timeout | number | null = null;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('message', onMessage);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (!event.data || event.data.nonce !== nonce || event.data.type !== 'CODELOL_RUN_RESULT') {
        return;
      }
      resolved = true;
      cleanup();
      resolve({
        output: event.data.output || '',
        error: event.data.error,
        verificationResults: event.data.verificationResults || []
      });
    };

    window.addEventListener('message', onMessage);

    timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({
          output: '',
          error: `Execution timed out after ${timeoutMs}ms.`
        });
      }
    }, timeoutMs);

    const safePayload = JSON.stringify({ nonce, code, assertions: assertions || [] });

    iframe.srcdoc = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
(function() {
  var payload = ${safePayload};
  var output = '';
  var capture = function() {
    var args = Array.prototype.slice.call(arguments);
    output += args.map(function(a) {
      return typeof a === 'object' ? JSON.stringify(a) : String(a);
    }).join(' ') + '\\n';
  };
  console.log = capture;
  console.error = capture;
  console.warn = capture;

  try {
    var fullCode = payload.code + '\\nvar __vr = [];\\n';
    if (payload.assertions && payload.assertions.length > 0) {
      for (var i = 0; i < payload.assertions.length; i++) {
        var a = payload.assertions[i];
        fullCode += 'try { __vr.push({ id: ' + JSON.stringify(a.id) + ', passed: Boolean(' + a.code + ') }); } catch(e) { __vr.push({ id: ' + JSON.stringify(a.id) + ', passed: false, error: e ? (e.message || String(e)) : "Error" }); }\\n';
      }
    }
    fullCode += 'return __vr;';
    var runner = new Function(fullCode);
    var results = runner();
    window.parent.postMessage({
      type: 'CODELOL_RUN_RESULT',
      nonce: payload.nonce,
      output: output.trim(),
      verificationResults: results || []
    }, '*');
  } catch (err) {
    window.parent.postMessage({
      type: 'CODELOL_RUN_RESULT',
      nonce: payload.nonce,
      output: output.trim(),
      error: err ? (err.message || String(err)) : 'Execution error'
    }, '*');
  }
})();
</script>
</body>
</html>`;

    document.body.appendChild(iframe);

    // In JSDOM test environments where iframe.srcdoc script execution is unsupported by JSDOM:
    const isJsdom = typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('jsdom');
    if (isJsdom) {
      setTimeout(() => {
        if (resolved) return;
        try {
          let simulatedOutput = '';
          const simulatedLog = (...args: unknown[]) => {
            simulatedOutput += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
          };
          const vr: VerificationResult[] = [];
          
          const isolatedContext = {
            console: { log: simulatedLog, error: simulatedLog, warn: simulatedLog },
            window: undefined,
            document: undefined,
            localStorage: undefined,
            sessionStorage: undefined,
          };
          
          const scopedKeys = Object.keys(isolatedContext);
          const scopedValues = Object.values(isolatedContext);
          
          let runnerCode = code + '\n';
          if (assertions && assertions.length > 0) {
            for (const a of assertions) {
              runnerCode += `try { __vr.push({ id: ${JSON.stringify(a.id)}, passed: Boolean(${a.code}) }); } catch(e) { __vr.push({ id: ${JSON.stringify(a.id)}, passed: false, error: e ? (e.message || String(e)) : 'Error' }); }\n`;
            }
          }
          runnerCode += 'return __vr;\n';
          
          // eslint-disable-next-line @typescript-eslint/no-implied-eval
          const fn = new Function(...scopedKeys, '__vr', runnerCode);
          fn(...scopedValues, vr);

          window.postMessage({
            type: 'CODELOL_RUN_RESULT',
            nonce,
            output: simulatedOutput.trim(),
            verificationResults: vr
          }, '*');
        } catch (err: any) {
          window.postMessage({
            type: 'CODELOL_RUN_RESULT',
            nonce,
            output: '',
            error: err?.message || 'Execution error'
          }, '*');
        }
      }, 0);
    }
  });
}

export async function executeCode(
  language: string, 
  code: string,
  assertions?: Array<{ id: string, code: string }>
): Promise<ExecutionResult> {
  const normLang = (language || '').toLowerCase();
  
  // JavaScript executes in-browser via sandboxed iframe (free & zero server quota)
  if (normLang === 'javascript' || normLang === 'js') {
    return executeSandboxedJs(code, assertions);
  }

  // Python, C, C++, and Java route to /api/run for server-side compilation
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
    return { output: '', error: 'Failed to execute code. Check your connection or try again later.' };
  }
}
