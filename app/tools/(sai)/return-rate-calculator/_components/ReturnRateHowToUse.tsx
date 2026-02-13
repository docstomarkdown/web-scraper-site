"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { PackageCheck, RotateCcw, Activity } from "lucide-react";

export function ReturnRateHowToUse() {
  return (
    <ToolSteps
      steps={[
        {
          title: "Count Units Sold",
          description: "Enter the total number of items you shipped to customers during the time period.",
          icon: PackageCheck,
        },
        {
          title: "Count Returns",
          description: "Enter how many of those specific items were returned by customers.",
          icon: RotateCcw,
        },
        {
          title: "Check Impact",
          description: "See your return rate percentage. High rates (>15%) can severely impact profitability through lost shipping and restocking fees.",
          icon: Activity,
        },
      ]}
    />
  );
}
