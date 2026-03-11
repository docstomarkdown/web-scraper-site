"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { PackageCheck, RotateCcw, Activity } from "lucide-react";
export function ReturnRateHowToUse() {
  return (
    <ToolSteps
      steps={[
                {
                    title: "Sold Total",
                    description: "Enter complete universal exact transaction volume count pushed across chosen distinct time evaluation frames.",
                    icon: PackageCheck
                },
                {
                    title: "Lost Units",
                    description: "Input accurate absolute numeric totals confirming those exact distributed goods were shipped successfully back.",
                    icon: RotateCcw
                },
                {
                    title: "Check Rate",
                    description: "Instantly derive tight final percentage metrics assessing hard physical catalog product durability baseline benchmarks.",
                    icon: Activity
                }
            ]}
    />
  );
}