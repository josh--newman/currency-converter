import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NextPageContext } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import App from "../components/App";
import fetchTimeSeries from "../api/fetchTimeSeries";

export const getServerSideProps = async (context: NextPageContext) => {
  const queryClient = new QueryClient();
  const { from, to, start, end } = context.query;

  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    typeof start !== "string" ||
    typeof end !== "string"
  ) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ["exchangeRates", { from, to }],
    queryFn: fetchTimeSeries({ from, to, startDate: start, endDate: end }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home({
  dehydratedState,
}: Awaited<ReturnType<typeof getServerSideProps>>["props"]) {
  const router = useRouter();

  // Redirect to default currencies if there are no query params
  useEffect(() => {
    if (
      !router.query.from ||
      !router.query.to ||
      !router.query.start ||
      !router.query.end
    ) {
      router.replace({
        pathname: "/",
        query: {
          from: "AUD",
          to: "JPY",
          start: "2020-01-01",
          end: "2020-02-01",
        },
      });
    }
  }, [router]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <App />
    </HydrationBoundary>
  );
}
