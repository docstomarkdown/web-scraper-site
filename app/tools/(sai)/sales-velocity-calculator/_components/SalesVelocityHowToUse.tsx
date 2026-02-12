"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { ClipboardList, CalendarOff, LineChart } from "lucide-react";

export function SalesVelocityHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Select Timeframe",
                    description: "Choose a period to analyze, such as the last 30 or 60 days.",
                    icon: ClipboardList
                },
                {
                    title: "Identify Gaps",
                    description: "Count the total number of days your product was out of stock during that period.",
                    icon: CalendarOff
                },
                {
                    title: "Calculate Speed",
                    description: "Enter the total units sold. The tool will remove the 'dead days' to show your true selling speed.",
                    icon: LineChart
                }
            ]}
        />
    );
}
