import { PasswordChecker } from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('password with less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual).toBe(false);
  });

  it('password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('12345678abc');
    expect(actual).toBe(false);
  });

  it('password with upper case letter is ok', () => {
    const actual = sut.checkPassword('12345678abcA');
    expect(actual).toBe(true);
  });

  it('password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('12345678ABC');
    expect(actual).toBe(false);
  });

  it('password with lower case letter is ok', () => {
    const actual = sut.checkPassword('12345678ABCa');
    expect(actual).toBe(true);
  });
});
