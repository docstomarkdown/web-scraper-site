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
                    title: "What is TACoS?",
                    description: "Total Advertising Cost of Sales (TACoS) measures ad spend against your TOTAL revenue (organic + paid).",
                    icon: Target,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Formula: (Total Ad Spend / Total Revenue) * 100",
                    stat: "8-15%",
                    statColor: "text-blue-500",
                    statLabel: "Ideal Target"
                },
                {
                    title: "Brand Vitality",
                    description: "A decreasing TACoS while sales grow indicates your organic brand visibility is improving and you rely less on paid ads.",
                    icon: TrendingDown,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Vitals",
                    statColor: "text-blue-500",
                    statLabel: "Organic Growth"
                },
                {
                    title: "TACoS vs. ACoS",
                    description: "ACoS measures campaign efficiency. TACoS measures total business health. A low TACoS is the ultimate goal for profitability.",
                    icon: LineChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Health",
                    statColor: "text-purple-500",
                    statLabel: "Profit Factor"
                },
            ]}
        />
    );
}
