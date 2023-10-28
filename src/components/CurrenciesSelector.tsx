import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";

const currencyOptions = [
  { value: "AUD", label: "Australian Dollar", icon: "🇦🇺" },
  { value: "USD", label: "US Dollar", icon: "🇺🇸" },
  { value: "EUR", label: "Euro", icon: "🇪🇺" },
  { value: "GBP", label: "British Pound", icon: "🇬🇧" },
  { value: "JPY", label: "Japanese Yen", icon: "🇯🇵" },
  { value: "CAD", label: "Canadian Dollar", icon: "🇨🇦" },
];

interface Props {
  fromCurrency: string;
  toCurrency: string;
}

const CurrencySelector = ({ fromCurrency, toCurrency }: Props) => {
  const router = useRouter();

  const handleBaseCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(
      {
        pathname: "/",
        query: { ...router.query, from: e.target.value },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSecondCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(
      {
        pathname: "/",
        query: { ...router.query, to: e.target.value },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSwapCurrencies = () => {
    router.push(
      {
        pathname: "/",
        query: {
          ...router.query,
          from: toCurrency,
          to: fromCurrency,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="p-4 flex flex-col sm:flex-row w-screen items-center">
      <div className="flex flex-col w-full">
        <label htmlFor="baseCurrency" className="text-sm">
          From
        </label>
        <select
          id="baseCurrency"
          value={fromCurrency}
          onChange={handleBaseCurrencyChange}
          className="bg-white border rounded px-3 py-2"
        >
          {currencyOptions.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.icon}{" "}
              <span className="text-slate-400">{`${currency.value} - ${currency.label}`}</span>
            </option>
          ))}
        </select>
      </div>
      <div className="px-2 self-start my-3 sm:my-0 sm:self-end">
        <button
          className="border border-slate-400 rounded-full w-11 h-11"
          onClick={handleSwapCurrencies}
        >
          <span role="img" aria-label="Swap currencies">
            🔄
          </span>
        </button>
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="secondCurrency" className="text-sm">
          To
        </label>
        <select
          id="secondCurrency"
          value={toCurrency}
          onChange={handleSecondCurrencyChange}
          className="bg-white border rounded px-3 py-2"
        >
          {currencyOptions.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.icon}{" "}
              <span className="text-slate-400">{`${currency.value} - ${currency.label}`}</span>
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencySelector;
