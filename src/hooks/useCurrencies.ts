import fetchTimeSeries from "@/api/fetchTimeSeries";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

// Reads the currencies and date range from the URL query string
// and returns the time series data for the given currencies and date range.
const useCurrencies = () => {
  const router = useRouter();
  const { from, to, start, end } = router.query;

  const query = useQuery({
    queryKey: ["timeSeries", { from, to, start, end }],
    queryFn: fetchTimeSeries({
      from: String(from),
      to: String(to),
      startDate: String(start),
      endDate: String(end),
    }),
  });

  return {
    query,
    from: String(from),
    to: String(to),
    start: String(start),
    end: String(end),
  };
};

export default useCurrencies;
