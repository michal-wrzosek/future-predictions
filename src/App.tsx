import React from 'react';
import { getData, Data } from './lib/getData';
import { IndexChart, ProfitChart, ChartData, IndicatorChart } from './components/Chart/Chart';
import { simulate } from './lib/simulate';
import { getDecision } from './lib/bot';
import { averageIndicatorForData, averageSlopeIndicatorForData } from './lib/averageIndicatorForData';
import { slopeIndicator } from './lib/slopeIndicator';

const App = () => {
  const data = getData();

  const timeInSeconds = 60 * 60 * 12;
  const selectedData = data.slice(timeInSeconds * -1);
  
  const {profit, nrOfWins, nrOfLosses, profitData} = simulate({ getBotDecision: getDecision, data: selectedData, tax: 0.8 });
  
  const average = selectedData.map((_d, index) => {
    const interval = 30;
    const averageSample = selectedData.slice(index < interval ? 0 : index - interval, index + 1);
    return averageIndicatorForData(averageSample);
  });

  const averageChartData: ChartData = average.map((value, index) => ({
    name: index,
    value,
  }));

  const averageSlope = selectedData.map((_d, index) => {
    const interval = 30;
    const pastIndex = index - interval;
    const currentAverageSample = selectedData.slice(index < interval ? 0 : index - interval, index + 1);
    const pastAverageSample = selectedData.slice(pastIndex < interval ? 0 : pastIndex - interval, pastIndex + 1);
    return averageSlopeIndicatorForData(currentAverageSample, pastAverageSample);
  });

  const averageSlopeChartData: ChartData = averageSlope.map((value, index) => ({
    name: index,
    value,
  }));

  const slopeOfAverageSlope = slopeIndicator(averageSlope)
  const slopeOfAverageSlopeChartData = slopeOfAverageSlope.map((value, index) => ({
    name: index,
    value,
  }))
  
  return (
    <div style={{ margin: 20 }}>
      <div>Forex Predictions</div>
      <div>Index:</div>
      <IndexChart data={selectedData} />
      <div>Averge (interval: 30sec):</div>
      <IndicatorChart data={averageChartData} />
      <div>Averge Slope (interval: 30sec):</div>
      <IndicatorChart data={averageSlopeChartData} />
      <div>Slope of Averge Slope:</div>
      <IndicatorChart data={slopeOfAverageSlopeChartData} />
      <ProfitChart data={profitData} />
      <div>selected data time: {selectedData.length / 60}min.</div>
      <div>profit: {profit}</div>
      <div>nrOfWins: {nrOfWins}</div>
      <div>nrOfLosses: {nrOfLosses}</div>
    </div>
  );
};

export default App;
