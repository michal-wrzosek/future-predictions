import React from 'react';
import { getData, Data } from './lib/getData';
import { IndexChart, ProfitChart } from './components/Chart/Chart';
import { simulate } from './lib/simulate';
import { getDecision } from './lib/bot';

const App = () => {
  const data = getData();

  const timeInMinutes = 60 * 24 * 30;
  const selectedData = data.slice(timeInMinutes * -1);
  
  const {profit, nrOfSellingWithProfit, profitData} = simulate({ getBotDecision: getDecision, data: selectedData, tax: 0.8 });
  console.log('profitData', profitData.filter(tick => !!tick.value));
  
  return (
    <div style={{ margin: 20 }}>
      <div>Forex Predictions</div>
      <IndexChart data={selectedData} />
      <ProfitChart data={profitData} />
      <div>profit: {profit}</div>
      <div>nrOfSellingWithProfit: {nrOfSellingWithProfit}</div>
    </div>
  );
};

export default App;
