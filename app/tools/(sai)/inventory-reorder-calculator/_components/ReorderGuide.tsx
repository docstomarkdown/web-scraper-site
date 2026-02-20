"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, AlertTriangle, ShieldCheck, Box } from "lucide-react";

export function ReorderGuide() {
    return (
        <ToolGuide
            title="Mastering Inventory Reordering"
            icon={BookOpen}
            items={[
                {
                    title: "The Reorder Point Formula",
                    description: "Reorder Point = (Average Daily Usage × Lead Time) + Safety Stock. This ensures you have just enough stock to cover sales while the new shipment is on its way.",
                    icon: Box,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Formula",
                    statColor: "text-blue-600",
                    statLabel: "ROP Logic",
                    tooltip: "Demand during lead time + Buffer"
                },
                {
                    title: "Why Lead Time Matters",
                    description: "Lead time is the gap between ordering and receiving. If your lead time is 30 days, you must order when you still have enough stock to last those 30 days.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Critical",
                    statColor: "text-amber-600",
                    statLabel: "Timing Factor",
                    tooltip: "Don't wait until empty!"
                },
                {
                    title: "Safety Stock: Your Insurance",
                    description: "Safety stock protects you against sudden spikes in demand or shipping delays. It's better to hold a few extra days of stock than to lose sales due to a stockout.",
                    icon: ShieldCheck,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "+Stocks",
                    statColor: "text-blue-600",
                    statLabel: "Buffer Zone",
                    tooltip: "Prevents lost revenue."
                }
            ]}
        />
    );
}
