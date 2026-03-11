"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Layers, Users, Zap } from "lucide-react";
export function BundleGuide() {
    return (
        <ToolGuide
            title="Why Bundle Products?"
            icon={BookOpen}
            items={[
                {
                    title: "Increase Average Order Value (AOV)",
                    description: "Bundling encourages customers to spend more in a single transaction by perceiving greater value in a package deal.",
                    icon: Layers,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "+30%",
                    statColor: "text-blue-600",
                    statLabel: "Potential AOV Increase",
                    tooltip: "Based on e-commerce industry averages for successful bundling strategies."
                },
                {
                    title: "Clear Slow-Moving Inventory",
                    description: "Pair high-demand items with slower-moving stock to clear inventory while maintaining profitability.",
                    icon: Zap,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "2x",
                    statColor: "text-amber-600",
                    statLabel: "Faster Stock Turnover",
                },
                {
                    title: "Reduce Customer Acquisition Cost",
                    description: "By selling more items per customer, you effectively lower the marketing cost required to sell each individual unit.",
                    icon: Users,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "-20%",
                    statColor: "text-blue-600",
                    statLabel: "Lower CAC Per Unit",
                },
            ]}
        />
    );
}