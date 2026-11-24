// agent-notes: { ctx: "Translates raw compiler, syntax, and runtime errors into warm, plain-English guidance for Day-1 beginners", deps: [], state: active, last: "antigravity@2026-11-24" }

export interface BeginnerTip {
  title: string;
  hint: string;
}

export function translateBeginnerError(
  rawError: string | null | undefined,
  language: string = 'javascript'
): BeginnerTip | null {
  if (!rawError || typeof rawError !== 'string') return null;

  const err = rawError.trim();
  const lang = language.toLowerCase();

  // 1. Auth & Cloud Compilation Boundary
  if (err.includes('Unauthorized') || err.includes('Please log in')) {
    return {
      title: 'Sign In Required for Cloud Runners',
      hint: `Running ${language.toUpperCase()} executes on our cloud servers and requires logging in to prevent server abuse. It's completely free! You can also switch to JavaScript to run code instantly in your browser without an account.`,
    };
  }

  // 2. Timeout / Infinite Loop
  if (err.toLowerCase().includes('timed out') || err.toLowerCase().includes('timeout')) {
    return {
      title: 'Infinite Loop or Slow Execution',
      hint: "Your code ran for too long without finishing! Check if you have a `while` loop that never stops, or recursive calls that never reach an end condition.",
    };
  }

  // 3. Python Error Patterns
  if (lang === 'python' || lang === 'py') {
    if (err.includes("SyntaxError: expected ':'") || (err.includes('SyntaxError') && err.includes(':'))) {
      return {
        title: 'Missing Colon ( : )',
        hint: 'In Python, statements like `def my_func():`, `if condition:`, `for x in list:`, and `while test:` must always end with a colon `:` at the end of the line.',
      };
    }

    if (err.includes('IndentationError')) {
      return {
        title: 'Indentation Error',
        hint: 'Python uses indentation (usually 2 or 4 spaces) to know what code belongs inside a function or loop. Check that all lines inside your block align neatly!',
      };
    }

    if (err.includes('Missing parentheses in call to')) {
      return {
        title: 'Missing Parentheses ( )',
        hint: 'In Python 3, `print` is a function! Put what you want to output inside parentheses, for example: `print("Hello CodeLOL")`.',
      };
    }

    const nameMatch = err.match(/NameError: name '([^']+)' is not defined/);
    if (nameMatch) {
      const missingName = nameMatch[1];
      if (missingName === 'prin' || missingName === 'prnt') {
        return {
          title: 'Typo in print',
          hint: `You wrote \`${missingName}\`. The built-in Python command is spelled \`print()\`.`,
        };
      }
      return {
        title: `Unknown Word: "${missingName}"`,
        hint: `The computer doesn't recognize \`${missingName}\`. Did you misspell it, or forget to define it before using it? If it was meant to be text, wrap it in quotes like \`"${missingName}"\`.`,
      };
    }

    if (err.includes('EOL while scanning string literal') || err.includes('unterminated string literal')) {
      return {
        title: 'Unclosed Quote Mark',
        hint: 'You opened a piece of text with a quote mark (`"` or `\'`) but didn\'t close it before the line ended. Make sure every opening quote has a matching closing quote.',
      };
    }

    if (err.includes('TypeError: unsupported operand type')) {
      return {
        title: 'Type Mismatch',
        hint: 'You tried to combine two different types that cannot be mixed directly (like adding words to numbers). Try converting the number to text with `str(number)`.',
      };
    }
  }

  // 4. JavaScript Error Patterns
  if (lang === 'javascript' || lang === 'js') {
    if (err.includes('Unexpected token')) {
      return {
        title: 'Unexpected Symbol',
        hint: 'There is an extra, missing, or misplaced character (such as a semicolon `;`, comma `,`, or bracket). Check the line where the error occurred.',
      };
    }

    if (err.includes('Illegal return statement')) {
      return {
        title: 'Return Outside Function',
        hint: 'The `return` statement can only be used inside a function. If you want to see output in the terminal, use `console.log(...)` instead!',
      };
    }

    if (err.includes('Unexpected identifier')) {
      return {
        title: 'Syntax Error (Unexpected Word)',
        hint: 'The computer found a word where it was not expecting one. Check for missing operators (like `+` or `=`), unclosed quotes, or missing commas.',
      };
    }

    const jsRefMatch = err.match(/(?:ReferenceError:\s*|Error:\s*)?([$\w]+) is not defined/i);
    if (jsRefMatch) {
      const varName = jsRefMatch[1];
      return {
        title: `Undefined Variable: "${varName}"`,
        hint: `You referenced \`${varName}\` before declaring it. Did you forget \`const ${varName} = ...\` or is there a spelling mistake?`,
      };
    }

    if (err.includes('is not a function')) {
      return {
        title: 'Calling Non-Function',
        hint: 'You tried to call something as a function with `()`, but it is currently a number, string, or undefined value.',
      };
    }

    if (err.includes('Unexpected end of input')) {
      return {
        title: 'Missing Closing Bracket or Parenthesis',
        hint: 'You opened a curly bracket `{` or parenthesis `(` somewhere in your code that was never closed before the end of the file.',
      };
    }
  }

  // 5. Test Assertion Failures
  if (err.includes('FAIL') || err.includes('Expected')) {
    return {
      title: 'Result Mismatch',
      hint: 'Your code ran, but the answer did not match what the test expected. Review the input values in the test log above and test your logic with simple numbers.',
    };
  }

  return null;
}
