"use client";
import React from "react";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { DollarSign, Truck, TrendingUp } from "lucide-react";

export function MercariFeeGuide() {
    const guideItems = [
        {
            title: "Mercari's Two-Part Fee Structure",
            description: "Every Mercari sale incurs two automatic fees. First, a flat 10% selling fee on the final sale price. Second, a payment processing fee of 2.9% + $0.50 applied to the total charged to the buyer (item + shipping). Both are deducted before you receive your payout — this calculator shows both, separately.",
            icon: DollarSign,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            stat: "12.9%+",
            statLabel: "True Fee Range"
        },
        {
            title: "Shipping: Who Pays Makes All the Difference",
            description: "Mercari offers two shipping modes. If you offer 'Free Shipping', the shipping label cost comes out of your payout — raise your list price by $5–$12 to compensate. If you select 'Buyer Pays Shipping', the buyer pays the label and you keep your full payout. This single decision can determine whether a low-priced listing is profitable.",
            icon: Truck,
            iconBg: "bg-slate-50",
            iconColor: "text-slate-600",
            stat: "$5–$12",
            statLabel: "Avg. Label Cost"
        },
        {
            title: "Setting a Price That Actually Profits",
            description: "Work backwards from your desired profit. Add your item cost + shipping cost, then estimate Mercari's combined ~13% fee on top of your target sale price. A useful rule of thumb: divide your total expenses by 0.87 to find the minimum list price that covers all fees. Use this calculator's breakdown to verify each scenario before committing.",
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            stat: "÷ 0.87",
            statLabel: "Min. Price Formula"
        },
    ];

    return (
        <ToolGuide
            title="Selling on Mercari: The Complete Profitability Guide"
            items={guideItems}
        />
    );
}