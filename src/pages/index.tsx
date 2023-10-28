import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NextPageContext } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { format, sub } from "date-fns";

import App from "../components/App";
import fetchTimeSeries from "../api/fetchTimeSeries";

const validateQueryParams = (query: any) => {
  const { from, to, start, end } = query;

  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    typeof start !== "string" ||
    typeof end !== "string"
  ) {
    return false;
  }

  return true;
};

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
        dehydratedState: null,
      },
    };
  }

  await queryClient.prefetchQuery({
    queryKey: ["exchangeRates", { from, to, start, end }],
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
    if (!validateQueryParams(router.query)) {
      router.replace({
        pathname: "/",
        query: {
          from: "AUD",
          to: "JPY",
          start: format(sub(new Date(), { weeks: 1 }), "yyyy-MM-dd"),
          end: format(new Date(), "yyyy-MM-dd"),
        },
      });
    }
  }, [router]);

  return (
    <HydrationBoundary state={dehydratedState}>
      {!validateQueryParams(router.query) ? <div>Loading...</div> : <App />}
    </HydrationBoundary>
  );
}
