import useCurrencies from "@/hooks/useCurrencies";
import { format, intervalToDuration, sub } from "date-fns";
import { useRouter } from "next/router";

const DateFilters = () => {
  const router = useRouter();
  const { start, end } = useCurrencies();

  const duration = intervalToDuration({
    start: new Date(start),
    end: new Date(end),
  });

  const selectedStyle = "bg-gray-300 rounded";

  const handleDateChange =
    (duration: { days?: number; months?: number }) => () => {
      const newStartDate = format(sub(new Date(), duration), "yyyy-MM-dd");
      const newEndDate = format(new Date(), "yyyy-MM-dd");

      router.push(
        {
          pathname: "/",
          query: {
            ...router.query,
            start: newStartDate,
            end: newEndDate,
          },
        },
        undefined,
        { shallow: true }
      );
    };

  return (
    <section className="mb-6 flex flex-row">
      <div className="p-2 border rounded border-gray-400 mr-3">
        <button
          onClick={handleDateChange({ days: 7 })}
          className={`${
            duration.days === 7 ? selectedStyle : ""
          } py-1 px-2 mr-3`}
        >
          1W
        </button>
        <button
          onClick={handleDateChange({ months: 1 })}
          className={`${
            duration.months === 1 ? selectedStyle : ""
          } py-1 px-2 mr-3`}
        >
          1M
        </button>
        <button
          onClick={handleDateChange({ months: 6 })}
          className={`${duration.months === 6 ? selectedStyle : ""} py-1 px-2`}
        >
          6M
        </button>
      </div>
      <button className="p-2 border rounded border-gray-400 w-12 text-xl">
        🗓️
      </button>
    </section>
  );
};

export default DateFilters;
