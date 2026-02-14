"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, TrendingDown, Target, LineChart } from "lucide-react";

export function TACoSGuide() {
    return (
        <ToolGuide
            title="Understanding Total Advertising Cost of Sales (TACoS)"
            icon={BookOpen}
            items={[
                {
                    title: "What is Total Advertising Cost of Sales (TACoS)?",
                    description: "Total Advertising Cost of Sales (TACoS) measures ad spend against your TOTAL revenue (organic + paid). Unlike Advertising Cost of Sales (ACoS) (which only looks at ad revenue).",
                    icon: Target,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Formula: (Total Ad Spend / Total Revenue) * 100"
                },
                {
                    title: "Why is it important?",
                    description: "It tells you how much your business relies on advertising. If your Total Advertising Cost of Sales (TACoS) is flat or decreasing while sales grow, your organic brand visibility is improving.",
                    icon: TrendingDown,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                },
                {
                    title: "Total Advertising Cost of Sales (TACoS) vs. Advertising Cost of Sales (ACoS)",
                    description: "Advertising Cost of Sales (ACoS) measures the efficiency of your ad campaigns. Total Advertising Cost of Sales (TACoS) measures the efficiency of your entire business. You can have a high Advertising Cost of Sales (ACoS) but a low Total Advertising Cost of Sales (TACoS) if your organic sales are strong.",
                    icon: LineChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                },
            ]}
        />
    );
}
