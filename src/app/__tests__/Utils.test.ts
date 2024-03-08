import { toUpperCase, getStringInfo, StringUtils } from '../Utils';

describe('Utils test suite', () => {
  let sut: StringUtils;

  // initial，確保每次測試都會是 independent
  beforeEach(() => {
    sut = new StringUtils();
    console.log('Setup');
  });

  afterEach(() => {
    // clear mocks
    console.log('Teardown');
  });

  describe('Utils test suite', () => {
    it('Should return correct upperCase', () => {
      const actual = sut.toUpperCase('abc');
      expect(actual).toBe('ABC');
    });

    it('should throw error on invalid argument - function', () => {
      const expected = 'Invalid argument!';
      // 必須將 code 包在 function 中才會吐 error
      function errorFn() {
        sut.toUpperCase('');
      }

      expect(errorFn).toThrow();
      expect(errorFn).toThrow(expected);
    });

    it('should throw error on invalid argument - arrow function', () => {
      const expected = 'Invalid argument!';

      expect(() => {
        sut.toUpperCase('');
      }).toThrow(expected);
    });

    it('should throw error on invalid argument - try catch block', (done) => {
      const expected = 'Invalid argument!';
      try {
        sut.toUpperCase('');
        done('GetStringInfo should throw error for invalid');
      } catch (error) {
        // 如果沒有 throw 也會通過
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', expected);
        done();
      }
    });
  });

  it('should return uppercase', () => {
    // arrange:
    const expected = 'ABC';
    // act:
    const actual = toUpperCase('abc');
    // assertion
    expect(actual).toBe(expected);
  });

  describe('getStringInfo for arg My-String should', () => {
    test('return right length', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters.length).toBe(9);
      expect(actual.characters).toHaveLength(9);
    });

    test('return right lower case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });

    test('return right upper case', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });

    test('return right characters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toContain<string>('M');
      expect(actual.characters).toEqual([
        'M',
        'y',
        '-',
        'S',
        't',
        'r',
        'i',
        'n',
        'g',
      ]);
    });

    test('return right extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toBeDefined();
      expect(actual.extraInfo).toBeTruthy();
    });
  });

  describe('toUpperCase examples', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'My-String', expected: 'MY-STRING' },
      { input: 'def', expected: 'DEF' },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = getStringInfo(input);
      expect(actual.upperCase).toBe(expected);
    });
  });
});
