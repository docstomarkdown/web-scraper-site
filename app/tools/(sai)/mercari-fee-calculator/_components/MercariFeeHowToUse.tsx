"use client";
import React from "react";
import { ToolSteps } from "@/app/tools/_shared/components/ToolSteps";
import { DollarSign, Tag, Truck, Wallet } from "lucide-react";
export function MercariFeeHowToUse() {
    const steps = [
        {
            title: "Set Your Asking Price",
            description: "Enter the amount you plan to list the item for on Mercari. This is the base for all fee calculations.",
            icon: Tag,
        },
        {
            title: "Input Item & Shipping Costs",
            description: "Include what you paid for the item and any shipping labels you're providing yourself to get an accurate profit number.",
            icon: Truck,
        },
        {
            title: "Review Fee Breakdown",
            description: "Mercari automatically takes 10% plus a processing fee. We break these down so you know exactly where your money goes.",
            icon: DollarSign,
        },
        {
            title: "Analyze Net Payout",
            description: "See your final take-home profit, margin, and ROI to decide if the listing price is sustainable.",
            icon: Wallet,
        },
    ];
    return <ToolSteps steps={steps} title="How to Calculate Your Mercari Profits" />;
}