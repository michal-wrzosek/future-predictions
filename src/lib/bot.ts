import { Data } from "./getData";
import { averageSlopeIndicatorForData } from "./averageIndicatorForData";
import { inverseArray } from "./inverseArray";
import { slopeIndicator } from "./slopeIndicator";

export type State = {
  currentIndex: number;
  buyingIndex: number | undefined;
  sellingIndex: number | undefined;
  pastData: Data;
}

export type GetDecisionProps = {
  state: State;
}

export type DECISION = "BUY" | "SELL" | "WAIT";

export const DECISIONS = {
  BUY: 'BUY' as 'BUY',
  SELL: 'SELL' as 'SELL',
  WAIT: 'WAIT' as 'WAIT',
};

const tax = 0.8;

export const getDecision = ({ state }: GetDecisionProps): DECISION => {
  const { currentIndex, buyingIndex, sellingIndex, pastData } = state;
  
  const averageSlope = pastData.map((_d, index) => {
    const interval = 30;
    const pastIndex = index - interval;
    return averageSlopeIndicatorForData(
      pastData.slice(index < interval ? 0 : index - interval, index + 1),
      pastData.slice(pastIndex < interval ? 0 : pastIndex - interval, pastIndex + 1)
    );
  });

  const slopeOfAverageSlope = slopeIndicator(averageSlope);
  const invertedSlopeOfAverageSlope = inverseArray(slopeOfAverageSlope);

  // SELLING
  if (buyingIndex) {
    const buyingTick = pastData[buyingIndex];

    // SELL if trend is changing
    if (invertedSlopeOfAverageSlope[0] < 0) {
      return DECISIONS.SELL;
    }
    
    return DECISIONS.WAIT;


  // BUYING
  } else {
    if (typeof sellingIndex !== 'undefined' && currentIndex - sellingIndex >= 15) {
      if (
        averageSlope[currentIndex] > 0 &&
        invertedSlopeOfAverageSlope[0] > 0 &&
        invertedSlopeOfAverageSlope[1] > 0 &&
        invertedSlopeOfAverageSlope[2] > 0 &&
        invertedSlopeOfAverageSlope[3] > 0 &&
        invertedSlopeOfAverageSlope[4] > 0 &&
        invertedSlopeOfAverageSlope[5] > 0 &&
        invertedSlopeOfAverageSlope[6] > 0 &&
        invertedSlopeOfAverageSlope[7] > 0 &&
        invertedSlopeOfAverageSlope[8] > 0 &&
        invertedSlopeOfAverageSlope[9] > 0 &&
        invertedSlopeOfAverageSlope[10] > 0 &&
        invertedSlopeOfAverageSlope[11] > 0 &&
        invertedSlopeOfAverageSlope[12] > 0 &&
        invertedSlopeOfAverageSlope[13] > 0
      ) {
        return DECISIONS.BUY;
      }
    }

    if (typeof sellingIndex === 'undefined' && currentIndex > 20) {
      return DECISIONS.BUY;
    }

    return DECISIONS.WAIT;
  }
};
