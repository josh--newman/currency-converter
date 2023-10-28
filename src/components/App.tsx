import fetchTimeSeries from "@/api/fetchTimeSeries";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    ></main>
  );
};

export default App;
