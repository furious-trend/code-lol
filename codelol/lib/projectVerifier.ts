import { executeCodeInBrowser } from './executor';

export type CheckType = 'function_exists' | 'output_contains' | 'dom_element_exists' | 'custom_assertion';

export interface Requirement {
  id: string;
  description: string;
  check_type: CheckType;
  check_code: string;
}

export interface VerificationResult {
  requirementId: string;
  passed: boolean;
  message?: string;
}

export async function checkRequirement(code: string, requirement: Requirement): Promise<VerificationResult> {
  let assertions: Array<{ id: string, code: string }> = [];

  if (requirement.check_type === 'function_exists') {
    assertions = [{ id: requirement.id, code: requirement.check_code }];
  } else if (requirement.check_type === 'custom_assertion') {
    assertions = [{ id: requirement.id, code: requirement.check_code }];
  } else if (requirement.check_type === 'dom_element_exists') {
    assertions = [{ id: requirement.id, code: `!!document.querySelector("${requirement.check_code.replace(/"/g, '\\"')}")` }];
  }

  const result = await executeCodeInBrowser('javascript', code, assertions);

  if (requirement.check_type === 'output_contains') {
    const passed = result.output.includes(requirement.check_code);
    return { requirementId: requirement.id, passed };
  }

  if (result.verificationResults && result.verificationResults.length > 0) {
    const vr = result.verificationResults[0];
    return { requirementId: requirement.id, passed: vr.passed, message: vr.error };
  }

  return { requirementId: requirement.id, passed: false, message: result.error || 'Unknown error' };
}
