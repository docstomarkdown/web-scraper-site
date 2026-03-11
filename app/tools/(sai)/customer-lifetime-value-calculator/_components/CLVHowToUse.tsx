"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { ShoppingCart, Repeat, CalendarClock } from "lucide-react";
export function CLVHowToUse() {
  return (
    <ToolSteps
      steps={[
                {
                    title: "Order Average",
                    description: "Enter exactly how much targeted money a customer typically drops per purchase.",
                    icon: ShoppingCart
                },
                {
                    title: "Loyalty Rate",
                    description: "Estimate how many active sales years the average buyer reliably continues.",
                    icon: Repeat
                },
                {
                    title: "Check Value",
                    description: "Instantly see the overall aggregated revenue scale of a typical loyal shopper.",
                    icon: CalendarClock
                }
            ]}
    />
  );
}