import { getDecision, State, DECISIONS } from "./bot";
import { Data } from "./getData";
import { ChartData } from "../components/Chart/Chart";

export type SimulateProps = {
  getBotDecision: typeof getDecision;
  data: Data;
  tax: number
}

export type SimulateResult = {
  profit: number;
  nrOfWins: number;
  nrOfLosses: number;
  profitData: ChartData;
}

export const simulate = ({ getBotDecision, data, tax }: SimulateProps): SimulateResult => {
  let profit: number = 0;
  let buyingIndex: number | undefined = undefined;
  let sellingIndex: number | undefined = undefined;
  let nrOfWins = 0;
  let nrOfLosses = 0;
  let profitData: ChartData = [];
  
  data.forEach((dataTick, currentIndex) => {
    const pastData = data.slice(0, currentIndex + 1);
    const state: State = {
      currentIndex,
      buyingIndex,
      sellingIndex,
      pastData,
    }
    const decision = getBotDecision({ state });

    if (decision === DECISIONS.BUY) {
      profitData.push({ name: currentIndex, value: 0 });

      buyingIndex = currentIndex;
    } else if (decision === DECISIONS.SELL && buyingIndex) {
      const buyingValue = data[buyingIndex].close;
      const sellingValue = data[currentIndex].close;
      const sellingProfit = (sellingValue - buyingValue) - tax;

      buyingIndex = undefined;
      sellingIndex = currentIndex;
      profit = profit + sellingProfit;

      profitData.push({ name: currentIndex, value: sellingProfit });

      if (sellingProfit >= 0) {
        nrOfWins = nrOfWins + 1;
      } else {
        nrOfLosses = nrOfLosses + 1;
      }
    } else if (decision === DECISIONS.WAIT && buyingIndex) {
      const buyingValue = data[buyingIndex].close;
      const sellingValue = data[currentIndex].close;
      const sellingProfit = (sellingValue - buyingValue) - tax;

      profitData.push({ name: currentIndex, value: sellingProfit });
    } else if (decision === DECISIONS.WAIT && !buyingIndex) {
      profitData.push({ name: currentIndex });
    }
  });

  return {
    profit, nrOfWins, nrOfLosses, profitData
  };
};
