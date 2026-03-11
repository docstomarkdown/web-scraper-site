"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { ClipboardList, CalendarOff, LineChart } from "lucide-react";
export function SalesVelocityHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Data Entry",
                    description: "Enter specific raw tracked prospect contact amounts, mathematically validated win rates, and averaged specific invoice sizes.",
                    icon: ClipboardList
                },
                {
                    title: "Sale Timing",
                    description: "Input totally mapped holistic quantitative timelines required converting fresh interested inbound leads into full paying clients.",
                    icon: CalendarOff
                },
                {
                    title: "Check Result",
                    description: "Instantly trace absolutely exactly how heavily monetary funds explicitly pump across integrated sales representative pipelines daily.",
                    icon: LineChart
                }
            ]}
        />
    );
}