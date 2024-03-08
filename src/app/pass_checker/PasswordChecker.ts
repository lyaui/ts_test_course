/* A password is invalid if: 
  - length is less than 8 chars
  - has no upper case letter 
  - haas no lower case letter
 */

export class PasswordChecker {
  public checkPassword(password: string): boolean {
    if (password.length < 8) return false;
    if (password.toLowerCase() === password) return false;
    if (password.toUpperCase() === password) return false;
    return true;
  }
}
