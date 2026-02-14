"use client";

import { ToolSteps } from "@/app/tools/_shared/components";
import { Target, TrendingUp, Wallet } from "lucide-react";

export function AdBudgetHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Set Revenue Goal",
                    description: "Enter the total sales amount you want to generate for the upcoming month.",
                    icon: Target,
                },
                {
                    title: "Define Target Return on Ad Spend (ROAS)",
                    description: "Input your expected Return on Ad Spend (ROAS). Be realistic based on your historical performance (e.g., 3.0 to 5.0).",
                    icon: TrendingUp,
                },
                {
                    title: "Get Budget Plan",
                    description: "We calculate exactly how much you need to spend monthly and daily to hit your target.",
                    icon: Wallet,
                },
            ]}
        />
    );
}
