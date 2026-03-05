"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, AlertTriangle, Crosshair, TrendingUp } from "lucide-react";
export function SalesVelocityGuide() {
    return (
        <ToolGuide
            title="Why True Velocity Matters"
            icon={BookOpen}
            items={[
                {
                    title: "The Flaw of Averages",
                    description: "If you sell 300 units in 30 days, your average is 10/day. But if you were out of stock for 15 days, your TRUE speed is actually 20/day. Using the average would lead to massive under-ordering.",
                    icon: AlertTriangle,
                    iconBg: "bg-red-50",
                    iconColor: "text-red-500",
                    stat: "Misleading",
                    statColor: "text-red-600",
                    statLabel: "Raw Average",
                    tooltip: "Don't count days with 0 inventory!"
                },
                {
                    title: "Forecasting Precision",
                    description: "Inventory planning requires knowing how fast you sell when you actually HAVE stock. Adjusted velocity is the only safe number to use for reorder points.",
                    icon: Crosshair,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Accuracy",
                    statColor: "text-blue-600",
                    statLabel: "Better Data",
                    tooltip: "Prevents future stockouts."
                },
                {
                    title: "Revenue Run Rate",
                    description: "Multiplying your true daily velocity by 30 gives you your potential annual revenue. This helps justify cash flow for larger inventory orders.",
                    icon: TrendingUp,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Growth",
                    statColor: "text-blue-600",
                    statLabel: "Potential",
                    tooltip: "See your real potential."
                }
            ]}
        />
    );
}