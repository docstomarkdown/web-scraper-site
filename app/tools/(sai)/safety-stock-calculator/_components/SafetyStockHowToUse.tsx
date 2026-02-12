"use client";
import { ToolSteps } from "@/app/tools/_shared/components";
import { BarChart, History, Calculator } from "lucide-react";

export function SafetyStockHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Analyze History",
                    description: "Look at your sales reports to find your highest sales day and longest delivery time.",
                    icon: History
                },
                {
                    title: "Enter Max & Averages",
                    description: "Input both your 'worst case' (Max) and 'typical case' (Avg) numbers for sales and lead times.",
                    icon: BarChart
                },
                {
                    title: "Get Your Buffer",
                    description: "The calculator will determine exactly how many extra units you need to hold to handle the variance.",
                    icon: Calculator
                }
            ]}
        />
    );
}
