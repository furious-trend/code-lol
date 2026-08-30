import { describe, it, expect } from 'vitest';
import { checkRequirement, Requirement } from '../lib/projectVerifier';

// agent-notes: { ctx: "TDD red phase for projectVerifier", deps: [lib/projectVerifier.ts], state: active, last: "tara@2026-08-27" }

describe('projectVerifier', () => {
  it('should pass function_exists requirement when function is defined', async () => {
    const req: Requirement = {
      id: 'req-1',
      description: 'Define function',
      check_type: 'function_exists',
      check_code: 'typeof testFunc === "function"'
    };
    const code = 'function testFunc() {}';
    
    const result = await checkRequirement(code, req);
    expect(result.passed).toBe(true);
    expect(result.requirementId).toBe('req-1');
  });

  it('should fail function_exists requirement when function is missing', async () => {
    const req: Requirement = {
      id: 'req-1',
      description: 'Define function',
      check_type: 'function_exists',
      check_code: 'typeof testFunc === "function"'
    };
    const code = 'function otherFunc() {}';
    
    const result = await checkRequirement(code, req);
    expect(result.passed).toBe(false);
  });

  it('should pass output_contains requirement when output matches', async () => {
    const req: Requirement = {
      id: 'req-2',
      description: 'Output check',
      check_type: 'output_contains',
      check_code: 'hello world'
    };
    const code = 'console.log("hello world");';
    
    const result = await checkRequirement(code, req);
    expect(result.passed).toBe(true);
  });

  it('should pass custom_assertion requirement', async () => {
    const req: Requirement = {
      id: 'req-3',
      description: 'Custom logic',
      check_type: 'custom_assertion',
      check_code: 'typeof testFunc === "function" && testFunc() === 42'
    };
    const code = 'function testFunc() { return 42; }';
    
    const result = await checkRequirement(code, req);
    expect(result.passed).toBe(true);
  });

  it('should catch runtime errors and return failed', async () => {
    const req: Requirement = {
      id: 'req-4',
      description: 'Error check',
      check_type: 'custom_assertion',
      check_code: 'invalidFunctionCall()'
    };
    const code = 'const a = 1;';
    
    const result = await checkRequirement(code, req);
    expect(result.passed).toBe(false);
  });
});
