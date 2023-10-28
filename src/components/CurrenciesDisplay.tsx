import { currencyOptions } from "@/constants";
import useCurrencies from "@/hooks/useCurrencies";
import { calculatePercentageChange } from "@/utils";
import { formatDistance } from "date-fns";

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
  const percentageChange = calculatePercentageChange(values);

  const fromDisplayName = currencyOptions.find(
    (c) => c.value === fromCurrency
  )?.label;
  const toDisplayName = currencyOptions.find(
    (c) => c.value === toCurrency
  )?.label;

  return (
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row">
        <h2 className="font-bold text-2xl">
          {fromCurrency} to {toCurrency} Chart
        </h2>
        <div>
          {query.isLoading ? (
            <span className="text-lg sm:text-2xl">...</span>
          ) : (
            <span
              className={`text-lg sm:text-2xl sm:mx-2 text-${
                percentageChange < 0 ? "red" : "green"
              }-600`}
            >
              {percentageChange}%
            </span>
          )}

          <span className="text-xs">
            ({formatDistance(new Date(start), new Date(end))})
          </span>
        </div>
      </div>
      <span className="text-xs">
        {fromDisplayName} to {toDisplayName}
      </span>
    </section>
  );
};

export default CurrenciesDisplay;
