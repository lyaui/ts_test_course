import { PasswordChecker } from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;
  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('Should not do anything this moment', () => {
    sut.checkPassword();
  });
});
