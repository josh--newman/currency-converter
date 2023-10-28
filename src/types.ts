export interface TimeSeriesAPIResponse {
  success: boolean;
  terms: string;
  privacy: string;
  timeframe: boolean;
  start_date: string;
  end_date: string;
  source: string;
  quotes: {
    [date: string]: {
      [currency: string]: number;
    };
  };
}
