import { Inter } from "next/font/google";
import CurrenciesSelector from "./CurrenciesSelector";
import CurrenciesDisplay from "./CurrenciesDisplay";

const inter = Inter({ subsets: ["latin"] });

const App = () => {
  return (
    <main className={`min-h-screen min-w-screen m-4 ${inter.className}`}>
      <CurrenciesSelector />
      <CurrenciesDisplay />
    </main>
  );
};

export default App;
