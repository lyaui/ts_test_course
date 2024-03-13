jest.mock('../../app/doubles/OtherUtils', () => ({
  // module 內部所有東西都引用原本內容
  ...jest.requireActual('../../app/doubles/OtherUtils'),
  // 只有 calculateComplexity 取代成 custom method
  calculateComplexity() {
    return 10;
  },
}));

jest.mock('uuid', () => ({
  v4() {
    return '123';
  },
}));

import * as OtherUtils from '../../app/doubles/OtherUtils';

// 此時原本的 '../../app/doubles/OtherUtils' 已經被 mock 取代挖空了

describe('module test', () => {
  test('calculate complexity', () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });
  test('calculate complexity', () => {
    const result = OtherUtils.toUpperCase('abc');
    expect(result).toBe('ABC');
  });
  test('string with id', () => {
    const result = OtherUtils.toLowerCaseWithId('ABC');
    expect(result).toBe('abc123');
  });
});
