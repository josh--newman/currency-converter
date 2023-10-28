import fetchTimeSeries from "@/api/fetchTimeSeries";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import CurrenciesSelector from "./CurrenciesSelector";

const inter = Inter({ subsets: ["latin"] });

const App = () => {
  const router = useRouter();
  const { from, to, start, end } = router.query;

  const query = useQuery({
    queryKey: ["exchangeRates", { from, to }],
    queryFn: fetchTimeSeries({
      from: String(from),
      to: String(to),
      startDate: String(start),
      endDate: String(end),
    }),
  });

  return (
    <main className={`min-h-screen w-fit ${inter.className}`}>
      <CurrenciesSelector fromCurrency={String(from)} toCurrency={String(to)} />
    </main>
  );
};

export default App;
