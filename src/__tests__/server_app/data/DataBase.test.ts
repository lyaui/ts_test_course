import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe('DataBase test suite', () => {
  let sut: DataBase<someTypeWithId>;
  const fakeId = '1234';
  const someObj1 = {
    id: '',
    name: 'someName',
    color: 'blue',
  };

  const someObj2 = {
    id: '',
    name: 'someOtherName',
    color: 'blue',
  };

  beforeEach(() => {
    sut = new DataBase();
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
  });

  // insert
  it('should return id after insert', async () => {
    // 著重測 id 所以精簡 insert 的 stub
    const actual = await sut.insert({ id: '' } as any);
    expect(actual).toBe(fakeId);
  });

  // getBy
  it('should get element after insert', async () => {
    // 著重測的內容所以插入較完整的someObj1
    const id = await sut.insert(someObj1);
    const actual = await sut.getBy('id', id);
    expect(actual).toBe(someObj1); // 儘管 id 不同但 reference 相同
  });

  // findAllBy
  it('should find all elements with the same property', async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);

    const expected = [someObj1, someObj2];
    const actual = await sut.findAllBy('color', 'blue');

    expect(actual).toEqual(expected);
  });

  // update
  it('should change color on object', async () => {
    const id = await sut.insert(someObj1);

    const expectedColor = 'pink';
    await sut.update(id, 'color', expectedColor);
    const actual = await sut.getBy('id', id);

    expect(actual.color).toEqual(expectedColor);
  });

  // delete
  it('should delete object', async () => {
    const id = await sut.insert(someObj1);
    await sut.delete(id);

    const actual = await sut.getBy('id', id);
    expect(actual).toBeUndefined();
  });

  // getAllElement
  it('should get all elements', async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);
    const expected = [someObj1, someObj2];

    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});
