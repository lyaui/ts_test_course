import {
  PasswordChecker,
  PasswordErrors,
} from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('password with less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual.valid).toBe(false);
    // toContain 測試 array 中是否包含
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it('password with more than 8 chars is ok', () => {
    const actual = sut.checkPassword('12345678');
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('12345678abc');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('password with upper case letter is ok', () => {
    const actual = sut.checkPassword('12345678abcA');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('12345678ABC');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('password with lower case letter is ok', () => {
    const actual = sut.checkPassword('BCa');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Complex password is valid', () => {
    const actual = sut.checkPassword('Pass1234');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });

  it('Admin password with no number is invalid', () => {
    const actual = sut.checkAdminPassword('Pass');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
  });

  it('Admin password with number is valid', () => {
    const actual = sut.checkAdminPassword('Pass123');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
