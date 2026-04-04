"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { ClipboardList, CalendarOff, LineChart } from "lucide-react";

export function SalesVelocityHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Sales Data",
                    description: "Input your total units sold over a specific period of time (e.g., 300 units over 30 days).",
                    icon: ClipboardList
                },
                {
                    title: "Log Stockouts",
                    description: "Record any days your product was out of stock. The calculator will remove these from the average.",
                    icon: CalendarOff
                },
                {
                    title: "Get True Velocity",
                    description: "See exactly how fast your product sells when it's available, so you can reorder with precision.",
                    icon: LineChart
                }
            ]}
        />
    );
}