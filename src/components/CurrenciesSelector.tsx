import { currencyOptions } from "@/constants";
import useCurrencies from "@/hooks/useCurrencies";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";

const CurrencySelector = () => {
  const router = useRouter();
  const { from: fromCurrency, to: toCurrency } = useCurrencies();

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
    <section className="flex flex-col sm:flex-row w-full mb-6 items-center">
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
              {currency.icon} {`${currency.value} - ${currency.label}`}
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
              {currency.icon} {`${currency.value} - ${currency.label}`}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default CurrencySelector;
