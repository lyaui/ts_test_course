/* A password is invalid if: 
  - length is less than 8 chars
  - has no upper case letter 
  - haas no lower case letter

  Requirement 2
  - return the reasons that make a password invalid

  Requirement 3
  - refactor
  - Admin password should also contain a number
*/

export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required!',
  NO_LOWER_CASE = 'Lower case letter required!',
  NO_NUMBER = 'number required!',
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }
  private checkForUppercase(password: string, reasons: PasswordErrors[]) {
    if (password.toLowerCase() === password) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }
  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password.toUpperCase() === password) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    const numRegex = /\d/;
    if (!numRegex.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }

  public checkPassword(password: string): CheckResult {
    const reasons = [];
    this.checkForLength(password, reasons);
    this.checkForUppercase(password, reasons);
    this.checkForLowerCase(password, reasons);

    return {
      valid: reasons.length === 0,
      reasons: reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const baseCheck = this.checkPassword(password);
    this.checkForNumber(password, baseCheck.reasons);

    return {
      valid: baseCheck.reasons.length === 0,
      reasons: baseCheck.reasons,
    };
  }
}
