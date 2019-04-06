export function inverseArray<P>(array: P[]) {
  let invertedArray = [];
  for (let index = array.length - 1; index >= 0; index--) {
    invertedArray.push(array[index]);
  }
  return invertedArray;
}
