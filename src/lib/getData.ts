import sourceData from './data.json';

type SourceDataTick = {
  "Date": string;
  "Timestamp": string;
  "Open": number;
  "High": number;
  "Low": number;
  "Close": number;
  "Volume": number;
}

type SourceData = SourceDataTick[]

export type DataTick = {
  open: number;
  high: number;
  low: number;
  close: number;
}

export type Data = DataTick[]

const toPip = (value: number) => value * 10000;

export const getData = () => (sourceData as SourceData).map(sourceDataTick => ({
  open: toPip(sourceDataTick['Open']),
  high: toPip(sourceDataTick['High']),
  low: toPip(sourceDataTick['Low']),
  close: toPip(sourceDataTick['Close']),
})) as Data;
