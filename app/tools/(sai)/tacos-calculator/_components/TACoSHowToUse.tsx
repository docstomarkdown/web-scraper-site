"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { DollarSign, BarChart3, Percent } from "lucide-react";

export function TACoSHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Ad Spend",
                    description: "Input your total advertising spend for a specific period (e.g., last month). Include all ad platforms.",
                    icon: DollarSign,
                },
                {
                    title: "Enter Total Revenue",
                    description: "Input your total gross revenue (sales) for the same period. This includes both organic and paid sales.",
                    icon: BarChart3,
                },
                {
                    title: "Analyze TACoS",
                    description: "The calculator determines your Total Advertising Cost of Sales. Use this to gauge the overall health of your business.",
                    icon: Percent,
                },
            ]}
        />
    );
}
