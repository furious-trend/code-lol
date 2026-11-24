import { describe, it, expect } from 'vitest';
import { translateBeginnerError } from '@/lib/beginnerErrors';

describe('translateBeginnerError', () => {
  it('returns null for empty or invalid input', () => {
    expect(translateBeginnerError('')).toBeNull();
    expect(translateBeginnerError(null as any)).toBeNull();
  });

  it('translates Python missing colon syntax errors', () => {
    const tip = translateBeginnerError("SyntaxError: expected ':' on line 2", 'python');
    expect(tip).not.toBeNull();
    expect(tip?.title).toContain('Missing Colon');
    expect(tip?.hint).toContain('def');
  });

  it('translates Python NameError typos', () => {
    const tip = translateBeginnerError("NameError: name 'prin' is not defined", 'python');
    expect(tip).not.toBeNull();
    expect(tip?.title).toContain('Typo in print');
    expect(tip?.hint).toContain('print()');
  });

  it('translates Python IndentationError', () => {
    const tip = translateBeginnerError('IndentationError: unexpected indent', 'python');
    expect(tip).not.toBeNull();
    expect(tip?.title).toContain('Indentation Error');
  });

  it('translates JavaScript ReferenceError', () => {
    const tip = translateBeginnerError('ReferenceError: myVar is not defined', 'javascript');
    expect(tip).not.toBeNull();
    expect(tip?.title).toContain('myVar');
    expect(tip?.hint).toContain('const myVar');

    const tipFromExecutor = translateBeginnerError('Error: myVar is not defined', 'javascript');
    expect(tipFromExecutor).not.toBeNull();
    expect(tipFromExecutor?.title).toContain('myVar');
  });

  it('translates JavaScript illegal return statement', () => {
    const tip = translateBeginnerError('Error: Illegal return statement', 'javascript');
    expect(tip).not.toBeNull();
    expect(tip?.title).toContain('Return Outside Function');
  });

  it('translates unauthorized cloud compilation errors', () => {
    const tip = translateBeginnerError('Unauthorized. Please log in to run code on our servers.', 'python');
    expect(tip).not.toBeNull();
    expect(tip?.title).toContain('Sign In Required');
    expect(tip?.hint).toContain('JavaScript');
  });
});
