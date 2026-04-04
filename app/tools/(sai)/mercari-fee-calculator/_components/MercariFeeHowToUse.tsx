"use client";
import React from "react";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { Tag, Package, TrendingUp } from "lucide-react";

export function MercariFeeHowToUse() {
    const steps = [
        {
            title: "Enter Your Sale Price",
            description: "Type the price you plan to list your item for. This is the core number that drives all fee and profit calculations.",
            icon: Tag,
        },
        {
            title: "Add Item & Shipping Costs",
            description: "Enter what you paid to acquire the item and any shipping label costs you are covering. Leave shipping blank if the buyer pays.",
            icon: Package,
        },
        {
            title: "Review Your True Net Profit",
            description: "See your exact take-home profit after Mercari's 10% fee and payment processing are automatically deducted from your revenue.",
            icon: TrendingUp,
        },
    ];
    return <ToolSteps steps={steps} title="How to Use This Calculator" />;
}