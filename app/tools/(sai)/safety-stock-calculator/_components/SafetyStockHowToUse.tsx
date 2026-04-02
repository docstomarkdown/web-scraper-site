"use client";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { TrendingUp, BarChart3, ShieldCheck } from "lucide-react";

export function SafetyStockHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Worst-Case Data",
                    description: "Input the highest daily sales you have ever seen and the longest lead time your supplier has taken. Use peak season or holiday data for accuracy.",
                    icon: TrendingUp
                },
                {
                    title: "Add Normal Baseline",
                    description: "Enter your typical daily sales average and the usual number of days it takes for stock to arrive. A 30 to 60-day rolling average works best.",
                    icon: BarChart3
                },
                {
                    title: "Review Safety Buffer",
                    description: "The calculator subtracts normal demand from worst-case demand to give you the exact number of extra units to always keep on hand.",
                    icon: ShieldCheck
                }
            ]}
        />
    );
}