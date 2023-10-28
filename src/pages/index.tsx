import { useEffect } from "react";
import { useRouter } from "next/router";
import { format, sub } from "date-fns";

import App from "../components/App";

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

export default function Home() {
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

  return !validateQueryParams(router.query) ? <div>Loading...</div> : <App />;
}
