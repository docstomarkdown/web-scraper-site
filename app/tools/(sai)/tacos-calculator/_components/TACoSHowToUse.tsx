"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { DollarSign, BarChart3, Percent } from "lucide-react";
export function TACoSHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate TACoS"
            steps={[
                {
                    title: "Add Total Revenue",
                    description: "Enter your total sales for the period. Make sure to include both the sales generated from ads AND your free organic sales.",
                    icon: BarChart3
                },
                {
                    title: "Add Spend & Margins",
                    description: "Enter the total amount of money you spent on advertising, along with your product's base profit margin.",
                    icon: DollarSign
                },
                {
                    title: "Check Your Health",
                    description: "Instantly see your TACoS percentage and use the visual health meter to ensure your ads aren't silently eating all your profits.",
                    icon: Percent
                }
            ]}
        />
    );
}