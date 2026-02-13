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
                    title: "What is MOQ?",
                    description: "MOQ stands for Minimum Order Quantity. It's the lowest number of units a supplier is willing to sell to you at once. Suppliers use MOQs to cover their production overheads and ensure profitability.",
                    icon: Package,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Key Term",
                    statLabel: "Definition",
                    tooltip: "The hurdle you must clear to buy."
                },
                {
                    title: "The 'Cash Trap' Risk",
                    description: "A high MOQ can tie up all your capital in inventory that sits in a warehouse. If your sales velocity is low, a large MOQ means you'll be paying storage fees for months (or years) before you see your cash back.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Danger",
                    statLabel: "Financial Risk",
                    tooltip: "Don't buy 2 years of stock!"
                },
                {
                    title: "Negotiating MOQ",
                    description: "MOQs are often negotiable. You can offer to pay a slightly higher price per unit for a smaller test batch, or split the production into two shipments to manage cash flow better.",
                    icon: TrendingUp,
                    iconBg: "bg-green-50",
                    iconColor: "text-green-500",
                    stat: "Strategy",
                    statLabel: "Actionable Tip",
                    tooltip: "Ask for a lower test quantity."
                }
            ]}
        />
    );
}
