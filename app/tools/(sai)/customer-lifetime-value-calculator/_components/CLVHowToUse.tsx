"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { ShoppingCart, Repeat, CalendarClock } from "lucide-react";

export function CLVHowToUse() {
  return (
    <ToolSteps
      steps={[
        {
          title: "Avg. Order Value",
          description: "Enter how much a typical customer spends in one checkout (Total Revenue / Total Orders).",
          icon: ShoppingCart,
        },
        {
          title: "Frequency",
          description: "Estimate how often they return to buy in a year (e.g., once a month = 12).",
          icon: Repeat,
        },
        {
          title: "Lifespan",
          description: "Estimate how many years they stay loyal to your brand before stopping.",
          icon: CalendarClock,
        },
      ]}
    />
  );
}
