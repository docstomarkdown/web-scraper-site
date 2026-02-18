"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Wallet, RefreshCcw } from "lucide-react";

export function PayPalGuide() {
    return (
        <ToolGuide
            title="Understanding Merchant Fees"
            icon={BookOpen}
            items={[
                {
                    title: "The Standard Rate",
                    description: "Most domestic transactions calculate fees at 2.9% + $0.30. This means for a $100 sale, you pay $3.20 in fees.",
                    icon: Wallet,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    stat: "2.9% + $0.30",
                    statLabel: "Domestic Rate"
                },
                {
                    title: "Breakeven Pricing",
                    description: "If you need to receive exactly $100, checking the 'You should ask for' value tells you the markup needed to offset the fee.",
                    icon: RefreshCcw,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    stat: "$103.30",
                    statLabel: "To Get $100"
                },
            ]}
        />
    );
}
