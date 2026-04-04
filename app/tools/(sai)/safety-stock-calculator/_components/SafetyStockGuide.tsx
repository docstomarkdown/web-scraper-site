"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

export function SafetyStockGuide() {
    return (
        <ToolGuide
            title="Understanding Safety Stock"
            icon={BookOpen}
            items={[
                {
                    title: "Averages Leave You Exposed",
                    description: "Planning your inventory based on average sales means you will stock out roughly half the time — whenever demand runs above normal. Safety stock is the permanent buffer that covers you when sales spike unexpectedly or a promotion runs hot.",
                    icon: TrendingUp,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    stat: "50% Risk",
                    statColor: "text-red-600",
                    statLabel: "Without a buffer",
                    tooltip: "Averages fail half the time — add a buffer."
                },
                {
                    title: "The Safety Stock Formula",
                    description: "(Max Daily Sales × Max Lead Time) − (Avg Daily Sales × Avg Lead Time). This subtracts your normal usage from your worst-case usage to find the exact gap you need to cover. The result is the minimum units to always keep in reserve.",
                    icon: AlertTriangle,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Formula",
                    statColor: "text-blue-600",
                    statLabel: "Max minus average gap",
                    tooltip: "Worst-case usage minus normal usage."
                },
                {
                    title: "The True Cost of Stockouts",
                    description: "Running out of stock costs more than the lost sale. On marketplaces like Amazon, stockouts damage your search ranking, suppress your listing, and hand sales directly to competitors. Recovering that position can take weeks.",
                    icon: ShieldCheck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Ranking",
                    statColor: "text-blue-600",
                    statLabel: "At risk when stocked out",
                    tooltip: "Stockouts hurt ranking and trust."
                }
            ]}
        />
    );
}