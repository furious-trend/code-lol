
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
      return { output: '', error: 'Failed to execute code. Check your connection or try again later.' };
    }

  return { output: '', error: `Language '${language}' is not currently supported.` };
}
