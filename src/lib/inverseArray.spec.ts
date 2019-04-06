import { inverseArray } from "./inverseArray";

describe('lib/inverseArray', () => {
  it('properly inverse given array', () => {
    const array = [1, 2, 3, 4];
    const invertedArray = [4, 3, 2, 1];

    expect(inverseArray(array)).toEqual(invertedArray);
    expect(inverseArray([])).toEqual([]);
  });
});
