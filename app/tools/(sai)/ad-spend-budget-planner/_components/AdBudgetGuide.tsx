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
                    description: "Planning is reverse engineering. If you know your revenue goal and ROAS, the math tells you exactly what to spend.",
                    icon: Calculator,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "Formula: Revenue Goal / ROAS",
                    stat: "Goal / ROAS",
                    statColor: "text-blue-500",
                    statLabel: "Ad Spend"
                },
                {
                    title: "Realistic ROAS",
                    description: "Setting an impossibly high target (e.g., 10x) results in a tiny budget that won't buy enough traffic to hit your goals.",
                    icon: AlertTriangle,
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-500",
                    stat: "Avg ROAS",
                    statColor: "text-orange-500",
                    statLabel: "Ideal Base"
                },
                {
                    title: "Budget Allocation",
                    description: "Don't spend it all at once. Spread it daily, but keep a buffer for high-sales days like weekends or paydays.",
                    icon: PieChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Daily",
                    statColor: "text-purple-500",
                    statLabel: "Spending Pace"
                },
            ]}
        />
    );
}