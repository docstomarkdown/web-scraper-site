"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Target, TrendingUp, MousePointer2, Wallet } from "lucide-react";

export function AdBudgetHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Define Growth Goals",
                    description: "Enter your monthly revenue target and the minimum ROAS required for profitability.",
                    icon: Target
                },
                {
                    title: "Adjust Traffic Assumptions",
                    description: "Input your estimated CPC and Conversion Rate to see how many orders you can expect.",
                    icon: MousePointer2
                },
                {
                    title: "Review Budget & Pace",
                    description: "Get your total monthly spend and the exact daily budget required to hit your objective.",
                    icon: Wallet
                }
            ]}
        />
    );
}