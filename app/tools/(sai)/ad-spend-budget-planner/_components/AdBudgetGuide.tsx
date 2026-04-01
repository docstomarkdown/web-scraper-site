"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, PieChart, Calculator, AlertTriangle, Target, MousePointer2 } from "lucide-react";

export function AdBudgetGuide() {
    return (
        <ToolGuide
            title="Understanding Your Ad Budget Math"
            icon={BookOpen}
            items={[
                {
                    title: "The Reverse-Engineering Logic",
                    description: "Planning your budget is effectively reverse engineering. If you know your firm revenue goal and your Target ROAS, the formula calculates the precise capital needed.",
                    icon: Calculator,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    tooltip: "The standard calculation: Revenue Goal / ROAS",
                    stat: "Goal / ROAS",
                    statColor: "text-blue-500",
                    statLabel: "Required Spend"
                },
                {
                    title: "Realistic Expectations",
                    description: "Setting an impossibly high ROAS target (e.g., 10x) results in a falsely low budget, which won't buy nearly enough traffic to hit your objective.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Historical",
                    statColor: "text-amber-500",
                    statLabel: "Ideal Base"
                },
                {
                    title: "Traffic Conversions",
                    description: "Cost-Per-Click (CPC) and Conversion Rate (CR) are the real levers behind ROAS. Cheaper, high-converting clicks reduce the required budget drastically.",
                    icon: MousePointer2,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "CPC & CR",
                    statColor: "text-emerald-500",
                    statLabel: "Volume Drivers"
                },
                {
                    title: "Daily Budget Allocation",
                    description: "Platforms require daily budgets. Splitting your total over 30 days is safe, but be prepared to tweak budgets on high-momentum days like paydays.",
                    icon: PieChart,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "1/30th",
                    statColor: "text-purple-500",
                    statLabel: "Daily Pace"
                },
            ]}
        />
    );
}