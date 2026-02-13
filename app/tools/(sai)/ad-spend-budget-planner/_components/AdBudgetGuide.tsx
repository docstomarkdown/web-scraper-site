"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, PieChart, Calculator, AlertTriangle } from "lucide-react";

export function AdBudgetGuide() {
    return (
        <ToolGuide
            title="Planning Your Ad Budget"
            icon={BookOpen}
            items={[
                {
                    title: "The Logic",
                    description: "Budget planning is simple reverse engineering. If you know how much you want to make (Goal) and how efficient your ads are (ROAS), the math tells you exactly what to spend.",
                    icon: Calculator,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Formula: Revenue Goal / ROAS"
                },
                {
                    title: "Realistic ROAS",
                    description: "Setting an impossibly high ROAS (e.g., 10x) will give you a tiny recommended budget that likely won't generate meaningful traffic. Use your store's average ROAS.",
                    icon: AlertTriangle,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                },
                {
                    title: "Budget Allocation",
                    description: "Once you have your monthly budget, don't spend it all at once. Spread it out daily, but save some buffer for high-sales days like weekends or paydays.",
                    icon: PieChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                },
            ]}
        />
    );
}
