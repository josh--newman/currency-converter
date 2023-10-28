import useCurrencies from "@/hooks/useCurrencies";
import dynamic from "next/dynamic";

const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((m) => m.ResponsiveLine),
  { ssr: false }
);

interface LineGraphProps {
  data: {
    id: string;
    color: string;
    data: { x: string; y: number }[];
  }[];
}

const LineGraph = ({ data }: LineGraphProps) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 10, bottom: 20, left: 40 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    pointLabelYOffset={-12}
    useMesh={true}
    enablePoints={false}
    enableGridX={false}
  />
);

const TimelineGraph = () => {
  const { query, from, to } = useCurrencies();
  const data = Object.entries(query.data?.quotes || {}).map(
    ([date, quote]) => ({
      x: date,
      y: quote[`${from}${to}`],
    })
  );

  return (
    <section className="mb-4 h-80">
      <LineGraph
        data={[
          {
            id: `${from} to ${to}`,
            color: "hsl(0, 70%, 50%)",
            data,
          },
        ]}
      />
    </section>
  );
};

export default TimelineGraph;
