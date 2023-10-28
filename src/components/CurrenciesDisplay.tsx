import { currencyOptions } from "@/constants";
import useCurrencies from "@/hooks/useCurrencies";

const CurrenciesDisplay = () => {
  const {
    query,
    from: fromCurrency,
    to: toCurrency,
    start,
    end,
  } = useCurrencies();

  // Calculate the percentage change between the first and last values
  const code = `${fromCurrency}${toCurrency}`;
  const values = Object.values(query.data?.quotes || {}).map(
    (quote) => quote[code]
  );
  const latestValue = values[values.length - 1];
  const firstValue = values[0];
  const increase = latestValue - firstValue;
  const percentageChange = (increase / firstValue) * 100;
  const displayNumber =
    Math[percentageChange * 100 < 0 ? "ceil" : "floor"](
      percentageChange * 100
    ) / 100;

  const fromDisplayName = currencyOptions.find(
    (c) => c.value === fromCurrency
  )?.label;
  const toDisplayName = currencyOptions.find(
    (c) => c.value === toCurrency
  )?.label;

  return (
    <section className="mb-6 flex flex-col">
      <h2 className="font-bold text-2xl">
        {fromCurrency} to {toCurrency} Chart
      </h2>
      <div>
        {query.isLoading ? (
          "..."
        ) : (
          <span
            className={`text-lg text-${
              percentageChange < 0 ? "red" : "green"
            }-600`}
          >
            {displayNumber}%
          </span>
        )}

        <span className="text-xs">{"(1w)"}</span>
      </div>
      <span className="text-xs">
        {fromDisplayName} to {toDisplayName}
      </span>
    </section>
  );
};

export default CurrenciesDisplay;
