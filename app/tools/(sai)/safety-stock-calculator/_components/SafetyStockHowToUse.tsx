"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { BarChart, History, Calculator } from "lucide-react";
export function SafetyStockHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Max Load",
                    description: "Enter highly stressed worst-case scenarios encompassing peak unpredicted consumer demand and longest factory lag.",
                    icon: History
                },
                {
                    title: "Avg Baseline",
                    description: "Input explicitly completely normal unproblematic tested supplier shipping times balanced against average regular daily flow.",
                    icon: BarChart
                },
                {
                    title: "Set Buffer",
                    description: "Instantly guarantee exact minimal numeric inventory overflow bounds structurally required blocking destructive inventory outages.",
                    icon: Calculator
                }
            ]}
        />
    );
}