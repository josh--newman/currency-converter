import { Inter } from "next/font/google";
import CurrenciesSelector from "./CurrenciesSelector";
import CurrenciesDisplay from "./CurrenciesDisplay";
import DateFilters from "./DateFilters";
import TimelineGraph from "./TimelineGraph";

const inter = Inter({ subsets: ["latin"] });

const App = () => {
  return (
    <main className={`min-h-screen min-w-screen m-4 ${inter.className}`}>
      <CurrenciesSelector />
      <CurrenciesDisplay />
      <DateFilters />
      <TimelineGraph />
    </main>
  );
};

export default App;
