export async function executeCodeInBrowser(language: string, code: string): Promise<{ output: string; error?: string }> {
  if (language === 'javascript') {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.sandbox.add('allow-scripts');
      
      const executionId = Math.random().toString(36).substring(2);
      
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== "null") return; // Sandboxed iframes have "null" origin
        if (event.data?.executionId !== executionId) return;
        
        window.removeEventListener('message', messageHandler);
        
        if (iframe.parentNode) {
          document.body.removeChild(iframe);
        }
        
        resolve({
          output: event.data.output,
          error: event.data.error
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
                
                window.parent.postMessage({
                  executionId: "${executionId}",
                  output: logs.join('\\n'),
                  error: errStr
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
