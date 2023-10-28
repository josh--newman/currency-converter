interface Params {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
}

const fetchTimeSeries =
  ({ from, to, startDate, endDate }: Params) =>
  async () => {
    const res = await fetch(
      `https://api.exchangerate.host/timeframe?source=${from}&currencies=${to}&start_date=${startDate}&end_date=${endDate}&access_key=${process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY}`
    );
    const data = await res.json();
    console.log({ data });
    return data;
  };

export default fetchTimeSeries;
