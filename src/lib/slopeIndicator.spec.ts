import { slopeIndicator } from "./slopeIndicator";


describe('lib/slopeIndicator', () => {
  it('properly calculates slope of a given data set', () => {
    const data = [1, 2, 2, 1, 1, 0, 0.5, 0.2];
    const slope = [0, 1, 0, -1, 0, -1, 0.5, -0.3];
    expect(slopeIndicator(data)).toEqual(slope);
  })
});
