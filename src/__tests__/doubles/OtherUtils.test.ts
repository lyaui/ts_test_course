import {
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
  // Stubs
  it('Calculates complexity', () => {
    // 只在物件中設定測試會用到的屬性，其他屬性直接省略
    const extraInfo = {
      length: 5,
      extraInfo: {
        key1: 'foo',
        key2: 'bar',
      },
    };
    // 因為是 stub 所以簡化了會不符合 ts 的設定，所以寫成 any 以便測試
    const actual = calculateComplexity(extraInfo as any);
    expect(actual).toBe(10);
  });

  // Fakes
  it('ToUpperCase - calls callback for invalid argument', () => {
    const actual = toUpperCaseWithCb('', () => {});
    expect(actual).toBeUndefined();
  });

  it('ToUpperCase - calls callback for valid argument', () => {
    const actual = toUpperCaseWithCb('abc', () => {});
    expect(actual).toBe('ABC');
  });

  describe('Tracking callbacks', () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callbackMock(string) {
      cbArgs.push(string);
      timesCalled++;
    }

    beforeEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it('calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callbackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain('Invalid argument!');
      expect(timesCalled).toBe(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callbackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).toContain(`called function with abc`);
      expect(timesCalled).toBe(1);
    });
  });

  describe('Tracking callbacks with Jest mocks', () => {
    const callbackMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callbackMock);
      expect(actual).toBeUndefined();
      expect(callbackMock).toHaveBeenCalledWith('Invalid argument!');
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callbackMock);
      expect(actual).toBe('ABC');
      expect(callbackMock).toHaveBeenCalledWith(`called function with abc`);
      expect(callbackMock).toHaveBeenCalledTimes(1);
    });
  });
});
