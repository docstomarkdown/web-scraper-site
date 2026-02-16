"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Package, AlertTriangle, TrendingUp } from "lucide-react";

export function MOQGuide() {
    return (
        <ToolGuide
            title="Understanding Minimum Order Quantity (MOQ)"
            icon={BookOpen}
            items={[
                {
                    title: "What is Minimum Order Quantity (MOQ)?",
                    description: "Minimum Order Quantity (MOQ) is the lowest number of units a supplier is willing to sell to you at once. Suppliers use Minimum Order Quantities (MOQs) to cover their production overheads and ensure profitability.",
                    icon: Package,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Key Term",
                    statColor: "text-blue-600",
                    statLabel: "Definition",
                    tooltip: "The hurdle you must clear to buy."
                },
                {
                    title: "The 'Cash Trap' Risk",
                    description: "A high Minimum Order Quantity (MOQ) can tie up all your capital in inventory that sits in a warehouse. If your sales velocity is low, a large Minimum Order Quantity (MOQ) means you'll be paying storage fees for months (or years) before you see your cash back.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Danger",
                    statColor: "text-amber-600",
                    statLabel: "Financial Risk",
                    tooltip: "Don't buy 2 years of stock!"
                },
                {
                    title: "Negotiating Minimum Order Quantity (MOQ)",
                    description: "Minimum Order Quantities (MOQs) are often negotiable. You can offer to pay a slightly higher price per unit for a smaller test batch, or split the production into two shipments to manage cash flow better.",
                    icon: TrendingUp,
                    iconBg: "bg-green-50",
                    iconColor: "text-green-500",
                    stat: "Strategy",
                    statColor: "text-emerald-600",
                    statLabel: "Actionable Tip",
                    tooltip: "Ask for a lower test quantity."
                }
            ]}
        />
    );
}
