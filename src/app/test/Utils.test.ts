import { toUpperCase, getStringInfo } from '../Utils';

describe('Utils test suite', () => {
  it('should return uppercase', () => {
    // arrange:
    const sut = toUpperCase;
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

  describe.only('toUpperCase examples', () => {
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
