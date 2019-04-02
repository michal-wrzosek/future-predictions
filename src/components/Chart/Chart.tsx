import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, AreaChart } from 'recharts';

import { Data } from '../../lib/getData';

export type ChartProps = {
  data: Data
}

export const IndexChart = ({ data }: ChartProps) => {
  const chartData = data.map((dataTick, index) => ({
    name: `${index}`,
    value: dataTick.close,
  }))

  return (
    <AreaChart width={800} height={400} data={chartData}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export type ProfitDataTick = {
  name: string;
  value?: number;
};

export type ProfitData = ProfitDataTick[];

export type ProfitChartProps = {
  data: ProfitData;
};

export const ProfitChart = ({ data }: ProfitChartProps) => {
  return (
    <AreaChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 10, right: 30, left: 0, bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={['dataMin', 'dataMax']} />
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};
