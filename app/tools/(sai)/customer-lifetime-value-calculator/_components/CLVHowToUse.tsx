"use client";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { ShoppingCart, BarChart3, TrendingUp } from "lucide-react";

export function CLVHowToUse() {
    const steps = [
        {
            title: "Enter Core Inputs",
            description: "Enter your Average Order Value, Frequency, and Lifespan. The tool instantly calculates your CLV — the total revenue a customer generates over their entire relationship.",
            icon: ShoppingCart,
        },
        {
            title: "Add Gross Margin",
            description: "Include your Gross Margin % to reveal Lifetime Profit — what you keep per customer after costs. This is key for setting profitable marketing budgets and strategies.",
            icon: BarChart3,
        },
        {
            title: "View Full Breakdown",
            description: "Add your Acquisition Cost (CAC) to see a full breakdown of revenue, costs, and net profit. Use the visual chart to identify where to optimize for sustainable growth.",
            icon: TrendingUp,
        },
    ];
    return <ToolSteps steps={steps} title="How to Use This Calculator" />;
}