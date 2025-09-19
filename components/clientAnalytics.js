"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Analyticss from "./Analyticss";

export default function ClientAnalytics() {
  const pathname = usePathname();

  // Skip analytics on 404
  if (pathname === "/404") return null;

  return (
    <Suspense fallback={null}>
      <Analyticss />
    </Suspense>
  );
}
