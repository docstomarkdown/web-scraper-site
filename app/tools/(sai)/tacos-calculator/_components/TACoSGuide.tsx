"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, TrendingDown, Target, LineChart } from "lucide-react";

export function TACoSGuide() {
    return (
        <ToolGuide
            title="Understanding TACoS"
            icon={BookOpen}
            items={[
                {
                    title: "What is TACoS?",
                    description: "TACoS stands for Total Advertising Cost of Sales. Unlike ACoS (which only looks at ad revenue), TACoS measures ad spend against your TOTAL revenue (organic + paid).",
                    icon: Target,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Formula: (Total Ad Spend / Total Revenue) * 100"
                },
                {
                    title: "Why is it important?",
                    description: "It tells you how much your business relies on advertising. If your TACoS is flat or decreasing while sales grow, your organic brand visibility is improving.",
                    icon: TrendingDown,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                },
                {
                    title: "TACoS vs. ACoS",
                    description: "ACoS measures the efficiency of your ad campaigns. TACoS measures the efficiency of your entire business. You can have a high ACoS but a low TACoS if your organic sales are strong.",
                    icon: LineChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                },
            ]}
        />
    );
}
