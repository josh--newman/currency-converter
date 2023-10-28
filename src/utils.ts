// Calculates the percentage change between the first and last values
// and returns the number truncated to two decimal places.
export const calculatePercentageChange = (values: number[]) => {
  const latestValue = values[values.length - 1];
  const firstValue = values[0];
  const increase = latestValue - firstValue;
  const percentageChange = (increase / firstValue) * 100;
  return (
    Math[percentageChange * 100 < 0 ? "ceil" : "floor"](
      percentageChange * 100
    ) / 100
  );
};
