export async function executeCodeInBrowser(
  language: string, 
  code: string,
  assertions?: Array<{ id: string, code: string }>
): Promise<{ output: string; error?: string, verificationResults?: Array<{ id: string, passed: boolean, error?: string }> }> {
  if (language === 'javascript') {
    // JSDOM does not execute scripts inside srcdoc iframes or support sandbox well
    if (typeof navigator !== 'undefined' && navigator.userAgent.includes('jsdom')) {
      return new Promise((resolve) => {
        const logs: string[] = [];
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        const win = iframe.contentWindow as any;
        
        const originalOuterLog = console.log;
        const originalOuterError = console.error;
        let finalCode = code;
        if (win) {
          win._captureLog = (...args: any[]) => logs.push(args.join(' '));
          finalCode = `
            console.log = _captureLog;
            console.error = (...args) => _captureLog("Error: " + args.join(' '));
            ${code}
          `;
        } else {
          console.log = (...args: any[]) => logs.push(args.join(' '));
          console.error = (...args: any[]) => logs.push("Error: " + args.join(' '));
        }
        
        let errStr: string | undefined;
        try {
          if (win && win.eval) {
            win.eval(finalCode);
          } else {
            eval(finalCode);
          }
        } catch (e: any) {
          errStr = e.message;
        }
        console.log = originalOuterLog;
        console.error = originalOuterError;
        
        const verificationResults = [];
        if (assertions && assertions.length > 0) {
          for (const assertion of assertions) {
            try {
              const passed = (win && win.eval) ? win.eval(assertion.code) : eval(assertion.code);
              verificationResults.push({ id: assertion.id, passed: !!passed });
            } catch(e: any) {
              verificationResults.push({ id: assertion.id, passed: false, error: e.message });
            }
          }
        }
        
        if (iframe.parentNode) {
          document.body.removeChild(iframe);
        }
        resolve({ output: logs.join('\\n'), error: errStr, verificationResults });
      });
    }

    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      if (iframe.sandbox && typeof iframe.sandbox.add === 'function') {
        iframe.sandbox.add('allow-scripts');
      } else {
        iframe.setAttribute('sandbox', 'allow-scripts');
      }
      
      const executionId = Math.random().toString(36).substring(2);
      
      const messageHandler = (event: MessageEvent) => {
        // Sandboxed iframes have "null" origin in real browsers, but might differ in JSDOM
        if (event.origin !== "null" && typeof window !== 'undefined' && event.origin !== window.origin && event.origin !== "") return; 
        if (event.data?.executionId !== executionId) return;
        
        window.removeEventListener('message', messageHandler);
        
        if (iframe.parentNode) {
          document.body.removeChild(iframe);
        }
        
        resolve({
          output: event.data.output,
          error: event.data.error,
          verificationResults: event.data.verificationResults
        });
      };
      
      window.addEventListener('message', messageHandler);
      
      // Escape script tags and other HTML inside the JSON string
      const escapedCode = JSON.stringify(code).replace(/</g, '\\u003c');
      
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <script>
              const logs = [];
              
              console.log = (...args) => {
                logs.push(args.map(a => {
                  if (typeof a === 'object') {
                    try { return JSON.stringify(a); } catch { return String(a); }
                  }
                  return String(a);
                }).join(' '));
              };
              
              console.error = (...args) => {
                logs.push("Error: " + args.map(a => {
                  if (typeof a === 'object') {
                    try { return JSON.stringify(a); } catch { return String(a); }
                  }
                  return String(a);
                }).join(' '));
              };

              window.onerror = (msg) => {
                logs.push("Error: " + msg);
              };

              async function run() {
                let errStr = undefined;
                try {
                  const result = eval(${escapedCode});
                  if (result && typeof result.then === 'function') {
                    await result;
                  }
                } catch (e) {
                  errStr = e.message;
                  logs.push("Error: " + e.message);
                }
                
                const verificationResults = [];
                ${assertions && assertions.length > 0 ? `
                  const assertionsToRun = ${JSON.stringify(assertions)};
                  for (const assertion of assertionsToRun) {
                    try {
                      const passed = eval(assertion.code);
                      verificationResults.push({ id: assertion.id, passed: !!passed });
                    } catch(e) {
                      verificationResults.push({ id: assertion.id, passed: false, error: e.message });
                    }
                  }
                ` : ''}

                window.parent.postMessage({
                  executionId: "${executionId}",
                  output: logs.join('\\n'),
                  error: errStr,
                  verificationResults
                }, "*");
              }
              
              run();
            </script>
          </head>
          <body></body>
        </html>
      `;
      
      document.body.appendChild(iframe);
    });
  }
  
  return { output: '', error: `Language '${language}' is not currently supported in the browser.` };
}
