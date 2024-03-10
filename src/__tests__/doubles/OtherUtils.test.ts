import { calculateComplexity } from '../../app/doubles/OtherUtils';

describe('OtherUtils test suite', () => {
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
});
