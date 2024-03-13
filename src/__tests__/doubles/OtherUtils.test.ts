import {
  calculateComplexity,
  toUpperCaseWithCb,
  OtherStringUtils,
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

  // Mocks
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

  // Spies
  describe('OtherStringUtils tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    it('Use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('abc');
      expect(toUpperCaseSpy).toHaveBeenCalledWith('abc');
    });

    it('Use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });

    // 測試 private method
    it('Use a spy to replace the implementation of a method', () => {
      // jest.spyOn(sut, 'callExternalService') 會報錯，因為是 primate method 不能在外面呼叫
      // 測試用的奧步呼叫 private method
      const callExternalServiceSpy = jest
        .spyOn(sut as any, 'callExternalService')
        .mockImplementation(() => {
          console.log('Calling mocked implementation!!!');
        });
      (sut as any).callExternalService();
    });
  });
});
