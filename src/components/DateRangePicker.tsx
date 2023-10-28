import useCurrencies from "@/hooks/useCurrencies";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

const DateRangePicker = () => {
  const router = useRouter();
  const { start, end } = useCurrencies();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  const handleSelectRange = (range: DateRange | undefined) => {
    if (!range || !range.from || !range.to) return;

    const { from, to } = range;
    const startDate = format(from, "yyyy-MM-dd");
    const endDate = format(to, "yyyy-MM-dd");

    router.push(
      {
        pathname: "/",
        query: {
          ...router.query,
          start: startDate,
          end: endDate,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const pastMonth = new Date();

  return (
    <div className="w-12 relative">
      <button
        onClick={handleOpen}
        className={`p-2 border rounded ${
          isOpen ? "border-purple-400" : "border-gray-400"
        } w-full h-full text-xl`}
      >
        🗓️
      </button>
      {isOpen && (
        <div className="absolute top-50 left-0 p-4 border rounded bg-white z-50">
          <DayPicker
            id="date-picker"
            mode="range"
            defaultMonth={pastMonth}
            selected={{ from: new Date(start), to: new Date(end) }}
            onSelect={handleSelectRange}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
