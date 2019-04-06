export function slopeIndicator(data: number[]) {
  return data.map((value, index) => index > 0 ? value - data[index - 1] : 0);
}
