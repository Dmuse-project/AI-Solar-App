
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

export default function Analyticss() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Convert searchParams to a proper string
    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
}
