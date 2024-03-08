/* A password is invalid if: 
  - length is less than 8 chars
  - has no upper case letter 
  - haas no lower case letter

  Requirement 2
  - return the reasons that make a password invalid
*/

export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required!',
  NO_LOWER_CASE = 'Lower case letter required!',
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons = [];
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
    if (password.toLowerCase() === password) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
    if (password.toUpperCase() === password) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
    return { valid: reasons.length === 0, reasons };
  }
}
