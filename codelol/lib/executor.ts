export async function executeCodeInBrowser(language: string, code: string): Promise<{ output: string; error?: string }> {
  if (language === 'javascript') {
    return new Promise(async (resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      const win = iframe.contentWindow as any;
      const logs: string[] = [];
      
      win.console.log = (...args: any[]) => {
        logs.push(args.map(a => {
          if (typeof a === 'object') {
            try { return JSON.stringify(a); } catch { return String(a); }
          }
          return String(a);
        }).join(' '));
      };
      
      win.console.error = (...args: any[]) => {
        logs.push("Error: " + args.map(a => {
          if (typeof a === 'object') {
            try { return JSON.stringify(a); } catch { return String(a); }
          }
          return String(a);
        }).join(' '));
      };

      try {
        const result = win.eval(code);
        if (result && typeof result.then === 'function') {
          await result;
        }
        resolve({ output: logs.join('\n') });
      } catch (err: any) {
        resolve({ 
          output: logs.length > 0 ? logs.join('\n') + '\nError: ' + err.message : 'Error: ' + err.message,
          error: err.message
        });
      } finally {
        document.body.removeChild(iframe);
      }
    });
  }
  
  return { output: '', error: `Language '${language}' is not currently supported in the browser.` };
}
