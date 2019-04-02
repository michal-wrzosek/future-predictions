import { Data } from "./getData";

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
  const changeAtTick = (index: number) => pastData[index].close - pastData[index - 1].close;

  const currentTick = pastData[currentIndex];

  if (buyingIndex) {
    const buyingTick = pastData[buyingIndex];
    
    const isWinning = currentTick.close - buyingTick.close > 3;
    const isLoosing = currentTick.close - buyingTick.close < -5;

    if (isWinning) {
      return DECISIONS.SELL;
    }

    if (isLoosing) {
      return DECISIONS.SELL;
    }
    
    return DECISIONS.WAIT;
  } else {
    if (typeof sellingIndex !== 'undefined' && currentIndex - sellingIndex >= 10) {
      if (
        currentIndex > 20 &&
        changeAtTick(currentIndex) > 0 &&
        changeAtTick(currentIndex - 1) < -1 &&
        changeAtTick(currentIndex - 2) < -1 &&
        changeAtTick(currentIndex - 3) < -1
      ) {
        return DECISIONS.BUY;
      }

      if (
        currentIndex > 20 &&
        changeAtTick(currentIndex) > 0 &&
        changeAtTick(currentIndex - 1) > 0 &&
        changeAtTick(currentIndex - 2) > 0 &&
        changeAtTick(currentIndex - 3) > 0 &&
        changeAtTick(currentIndex - 4) > 0 &&
        changeAtTick(currentIndex - 5) > 0
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
