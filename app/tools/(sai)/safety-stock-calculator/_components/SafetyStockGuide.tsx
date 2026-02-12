"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

export function SafetyStockGuide() {
    return (
        <ToolGuide
            title="Understanding Safety Stock"
            icon={BookOpen}
            items={[
                {
                    title: "Variability is the Enemy",
                    description: "If you only plan for 'average' sales, you will run out of stock 50% of the time. Safety stock is the buffer that protects you when sales are higher than normal.",
                    icon: TrendingUp,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    stat: "50% Risk",
                    statColor: "text-red-600",
                    statLabel: "Without Buffer",
                    tooltip: "Averages fail half the time."
                },
                {
                    title: "The Standard Formula",
                    description: "(Max Daily Sales × Max Lead Time) - (Avg Daily Sales × Avg Lead Time). This formula calculates the gap between a 'perfect' world and the 'worst case' scenario.",
                    icon: AlertTriangle,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Gap",
                    statColor: "text-blue-600",
                    statLabel: "Risk Calculation",
                    tooltip: "Difference between Max & Avg usage."
                },
                {
                    title: "Cost of Stockouts",
                    description: "Running out of stock costs more than just lost sales. It hurts your search ranking, damages customer trust, and gives competitors an opening.",
                    icon: DollarSign,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Trust",
                    statColor: "text-emerald-600",
                    statLabel: "Long-term Value",
                    tooltip: "Stockouts kill growth."
                }
            ]}
        />
    );
}
