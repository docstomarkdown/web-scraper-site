"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { Target, TrendingUp, Wallet } from "lucide-react";
export function AdBudgetHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Revenue Goal",
                    description: "Enter your structured target monthly or annual sales revenue objective.",
                    icon: Target
                },
                {
                    title: "Campaign ROI",
                    description: "Input your firm historical or best anticipated Return on Ad Spend (ROAS).",
                    icon: TrendingUp
                },
                {
                    title: "Get Budget",
                    description: "See the exact quantitative advertising spend required to hit your goals.",
                    icon: Wallet
                }
            ]}
        />
    );
}