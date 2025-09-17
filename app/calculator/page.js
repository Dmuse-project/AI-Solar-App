// app/calculator/page.js  (server component)

import CalculatorClient from "./calculatorClient";

export const metadata = {
  title: "Photon AI Solar Calculator",
  description:
    "An intelligent tool that instantly analyzes your energy needs and location to recommend the right solar system size, battery capacity, and savings potential — giving you expert insights in seconds.",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
