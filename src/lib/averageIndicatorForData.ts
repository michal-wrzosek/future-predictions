import { Data } from "./getData";

export function averageIndicatorForData(data: Data) {
  const sum = data.reduce((sum, n) => sum + n.close, 0);

  return sum / data.length;
}

export function averageSlopeIndicatorForData(recentData: Data, pastData: Data) {
  const recentAverage = averageIndicatorForData(recentData);
  const pastAverage = averageIndicatorForData(pastData);
  return recentAverage - pastAverage;
}
