"use client";
import React from "react";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { DollarSign, Truck, TrendingUp } from "lucide-react";
export function MercariFeeGuide() {
    const guideItems = [
        {
            title: "Understanding Mercari's Fee Structure",
            description: "Mercari charges a 10% selling fee plus a payment processing fee of 2.9% + $0.50. Direct deposit is free for amounts over $10.",
            icon: DollarSign,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            stat: "10%",
            statLabel: "Sales Fee"
        },
        {
            title: "Shipping: Buyer vs. Seller Paid",
            description: "Who pays for shipping significantly impacts your bottom line. If you offer 'Free Shipping', increase your price by $5-$10 to compensate for the cost of the label.",
            icon: Truck,
            iconBg: "bg-slate-50",
            iconColor: "text-slate-600",
            stat: "Costly",
            statLabel: "Shipping Var"
        },
    ];
    return (
        <ToolGuide
            title="Mastering Mercari Selling & Profitability"
            items={guideItems}
        />
    );
}